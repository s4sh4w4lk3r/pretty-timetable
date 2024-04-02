using Repository.Database;
using System.Runtime.Serialization;
using System.Xml;
using System.Xml.Serialization;
using static Services.Asc.Timetable.StaticDeterminers;

namespace Services.Asc.Timetable
{
    internal class Converter(TimetableContext timetableContext)
    {
        public List<PrettyTimetable.Core.Entities.Timetable.Cards.Info.Room> Cabinets { get; private set; } = [];
        public List<PrettyTimetable.Core.Entities.Timetable.Cards.Info.Teacher> Teachers { get; private set; } = [];
        public List<PrettyTimetable.Core.Entities.Timetable.Cards.Info.LessonTime> LessonTimes { get; private set; } = [];
        public List<PrettyTimetable.Core.Entities.Timetable.Cards.Info.Subject> Subjects { get; private set; } = [];
        public List<PrettyTimetable.Core.Entities.Timetable.Cards.StableCard> StableCards { get; private set; } = [];
        public List<PrettyTimetable.Core.Entities.Timetable.StableTimetable> StableTimetables { get; private set; } = [];
        public List<PrettyTimetable.Core.Entities.Timetable.Group> Groups { get; private set; } = [];

        private AscClasses.AscTimetable _ascTimetable = null!;

        public async Task ConvertAndSaveAsync(XmlReader xmlReader, CancellationToken cancellationToken = default)
        {
            var serializer = new XmlSerializer(typeof(AscClasses.AscTimetable));
            _ascTimetable = serializer.Deserialize(xmlReader) as AscClasses.AscTimetable ?? throw new SerializationException();

            xmlReader.Dispose();

            await StartConvertingAsync(cancellationToken);
        }

        public async Task ConvertAndSaveAsync(string path, CancellationToken cancellationToken = default)
        {
            var serializer = new XmlSerializer(typeof(AscClasses.AscTimetable));
            var xmlReader = XmlReader.Create(path);
            _ascTimetable = serializer.Deserialize(xmlReader) as AscClasses.AscTimetable ?? throw new SerializationException();

            xmlReader.Dispose();

            await StartConvertingAsync(cancellationToken);
        }

        private async Task StartConvertingAsync(CancellationToken cancellationToken = default)
        {
            FillDataForCards();
            await SaveDataForCardsAsync(cancellationToken);
            await CreateCardsAndSaveLocallyAsync(cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
        }

        private void FillDataForCards()
        {
            ArgumentNullException.ThrowIfNull(_ascTimetable);

            Groups = _ascTimetable.Classes.Class.Select(e => new PrettyTimetable.Core.Entities.Timetable.Group()
            { Id = default, AscId = e.Id, Name = e.Name, ModifiedAt = DateTime.UtcNow }).ToList();

            Teachers = _ascTimetable.Teachers.Teacher.Select(e => new PrettyTimetable.Core.Entities.Timetable.Cards.Info.Teacher()
            {
                Id = default,
                AscId = e.Id,
                Lastname = e.Lastname,
                Firstname = e.Firstname,
                Middlename = string.Empty,
                ModifiedAt = DateTime.UtcNow
            }).ToList();

            Subjects = _ascTimetable.Subjects.Subject.Select(e => new PrettyTimetable.Core.Entities.Timetable.Cards.Info.Subject()
            { Id = default, AscId = e.Id, Name = e.Name, ModifiedAt = DateTime.UtcNow }).ToList();

            LessonTimes = _ascTimetable.Periods.Period.Select(e => new PrettyTimetable.Core.Entities.Timetable.Cards.Info.LessonTime()
            { Id = default, StartsAt = TimeOnly.Parse(e.Starttime), EndsAt = TimeOnly.Parse(e.Endtime), Number = int.Parse(e._period), ModifiedAt = DateTime.UtcNow }).ToList();

            Cabinets = _ascTimetable.Classrooms.Classroom.Select(e => new PrettyTimetable.Core.Entities.Timetable.Cards.Info.Room()
            {
                Id = default,
                AscId = e.Id,
                Number = e.Short,
                ModifiedAt = DateTime.UtcNow,
                Address = _ascTimetable.Buildings.Building.Single(b => b.Id == e.Buildingid).Name,
                FullName = e.Name
            }).ToList();
        }
        private async Task SaveDataForCardsAsync(CancellationToken cancellationToken = default)
        {
            //await timetableContext.AddRangeAsync([Groups, Teachers, Subjects, LessonTimes, Cabinets], cancellationToken);
            await timetableContext.Groups.AddRangeAsync(Groups, cancellationToken);
            await timetableContext.Teachers.AddRangeAsync(Teachers, cancellationToken);
            await timetableContext.Subjects.AddRangeAsync(Subjects, cancellationToken);
            await timetableContext.LessonTimes.AddRangeAsync(LessonTimes, cancellationToken);
            await timetableContext.Cabinets.AddRangeAsync(Cabinets, cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);

        }
        private async Task CreateCardsAndSaveLocallyAsync(CancellationToken cancellationToken = default)
        {
            List<PrettyTimetable.Core.Entities.Timetable.StableTimetable> stableTimetables = [];

            foreach (var group in Groups)
            {
                var stableCardsOfCurrentGroup = new List<PrettyTimetable.Core.Entities.Timetable.Cards.StableCard>();
                var lessonsOfCurrentGroup = _ascTimetable.Lessons.Lesson.Where(e => e.Classids == group.AscId).ToList();
                var ascCardsOfCurrentGroup = new List<AscClasses.Card>();
                foreach (var lesson in lessonsOfCurrentGroup)
                {
                    foreach (var card in _ascTimetable.Cards.Card)
                    {
                        if (card.Lessonid == lesson.Id)
                        {
                            ascCardsOfCurrentGroup.Add(card);
                        }
                    }
                }

                foreach (var card in ascCardsOfCurrentGroup)
                {
                    var lesson = _ascTimetable.Lessons.Lesson.Single(e => e.Id == card.Lessonid);

                    DayOfWeek dayOfWeek = DetermineDayOfWeek(card.Days);

                    PrettyTimetable.Core.Entities.Timetable.Cards.Info.Teacher teacher = Teachers.Single(e => e.AscId == lesson.Teacherids);
                    PrettyTimetable.Core.Entities.Timetable.Cards.Info.Subject subject = Subjects.Single(e => e.AscId == lesson.Subjectid);
                    PrettyTimetable.Core.Entities.Timetable.Cards.Info.LessonTime lessonTime = LessonTimes.Single(e => e.Number == int.Parse(card.Period));
                    PrettyTimetable.Core.Entities.Timetable.Cards.Info.Room cabinet = DetermineCabinets(Cabinets, lesson.Classroomids);

                    PrettyTimetable.Core.Entities.Timetable.Cards.Info.SubGroup subGroup = DetermineSubgroup(_ascTimetable.Groups.Group.Single(e => e.Id == lesson.Groupids).Name);
                    switch (DetermineWeekEvenness(card.Weeks))
                    {
                        case WeekEvenness.Both:
                            stableCardsOfCurrentGroup.Add(new PrettyTimetable.Core.Entities.Timetable.Cards.StableCard()
                            {
                                Id = default,
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                RoomId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = true,
                                ModifiedAt = DateTime.UtcNow,
                                RelatedTimetableId = default
                            });

                            stableCardsOfCurrentGroup.Add(new PrettyTimetable.Core.Entities.Timetable.Cards.StableCard()
                            {
                                Id = default,
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                RoomId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = false,
                                ModifiedAt = DateTime.UtcNow,
                                RelatedTimetableId = default
                            });
                            break;

                        case WeekEvenness.Even:
                            stableCardsOfCurrentGroup.Add(new PrettyTimetable.Core.Entities.Timetable.Cards.StableCard()
                            {
                                Id = default,
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                RoomId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = true,
                                ModifiedAt = DateTime.UtcNow,
                                RelatedTimetableId = default
                            });
                            break;

                        case WeekEvenness.Odd:
                            stableCardsOfCurrentGroup.Add(new PrettyTimetable.Core.Entities.Timetable.Cards.StableCard()
                            {
                                Id = default,
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                RoomId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = false,
                                ModifiedAt = DateTime.UtcNow,
                                RelatedTimetableId = default
                            });
                            break;

                        default:
                            throw new ArgumentException("Четностb недели не определена.");
                    }

                }
                var currentStableTimetable = new PrettyTimetable.Core.Entities.Timetable.StableTimetable() { Id = default, Cards = stableCardsOfCurrentGroup, GroupId = group.Id, ModifiedAt = DateTime.UtcNow };
                await timetableContext.AddAsync(currentStableTimetable, cancellationToken);
            }
        }
    }
}

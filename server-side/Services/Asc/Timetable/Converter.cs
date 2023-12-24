using Microsoft.EntityFrameworkCore;
using Repository.Database;
using System.Xml;
using System.Xml.Serialization;

namespace Services.Asc.Timetable
{
    public class Converter(TimetableContext timetableContext)
    {
        public List<Repository.Entities.Timetable.Cards.Parts.Cabinet> Cabinets { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.Parts.Teacher> Teachers { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.Parts.LessonTime> LessonTimes { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.Parts.Subject> Subjects { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.StableCard> StableCards { get; private set; } = [];
        public List<Repository.Entities.Timetable.StableTimetable> StableTimetables { get; private set; } = [];
        public List<Repository.Entities.Timetable.Group> Groups { get; private set; } = [];

        private AscClasses.AscTimetable? _ascTimetable;

        public async Task ConvertAndSaveAsync(XmlReader xmlReader)
        {
            var serializer = new XmlSerializer(typeof(AscClasses.AscTimetable));
            _ascTimetable = serializer.Deserialize(xmlReader) as AscClasses.AscTimetable;

            xmlReader.Dispose();

            FillDataForCards();
            await SaveDataForCardsAsync();
            await CreateCardsAndSaveAsync();
        }

        public async Task ConvertAndSaveAsync(string path, CancellationToken cancellationToken = default)
        {
            var serializer = new XmlSerializer(typeof(AscClasses.AscTimetable));
            var xmlReader = XmlReader.Create(path);
            _ascTimetable = serializer.Deserialize(xmlReader) as AscClasses.AscTimetable;

            xmlReader.Dispose();

            FillDataForCards();
            await SaveDataForCardsAsync(cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
            await CreateCardsAndSaveAsync(cancellationToken);
            await timetableContext.SaveChangesAsync(cancellationToken);
        }



        private void FillDataForCards()
        {
            ArgumentNullException.ThrowIfNull(_ascTimetable);

            Groups = _ascTimetable.Classes.Class.Select(e => new Repository.Entities.Timetable.Group()
            { AscId = e.Id, Name = e.Name, CreatedAt = DateTime.UtcNow }).ToList();

            Teachers = _ascTimetable.Teachers.Teacher.Select(e => new Repository.Entities.Timetable.Cards.Parts.Teacher()
            {
                AscId = e.Id,
                Lastname = e.Lastname,
                Firstname = e.Firstname,
                Middlename = string.Empty,
                CreatedAt = DateTime.UtcNow
            }).ToList();

            Subjects = _ascTimetable.Subjects.Subject.Select(e => new Repository.Entities.Timetable.Cards.Parts.Subject()
            { AscId = e.Id, Name = e.Name, CreatedAt = DateTime.UtcNow }).ToList();

            LessonTimes = _ascTimetable.Periods.Period.Select(e => new Repository.Entities.Timetable.Cards.Parts.LessonTime()
            { StartsAt = TimeOnly.Parse(e.Starttime), EndsAt = TimeOnly.Parse(e.Endtime), Number = int.Parse(e._period), CreatedAt = DateTime.UtcNow }).ToList();

            Cabinets = _ascTimetable.Classrooms.Classroom.Select(e => new Repository.Entities.Timetable.Cards.Parts.Cabinet()
            {
                AscId = e.Id,
                Number = e.Short,
                CreatedAt = DateTime.UtcNow,
                Address = _ascTimetable.Buildings.Building.Single(b => b.Id == e.Buildingid).Name
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
            
        }
        private async Task CreateCardsAndSaveAsync(CancellationToken cancellationToken = default)
        {
            var ascCards = _ascTimetable.Cards.Card;
            List<Repository.Entities.Timetable.StableTimetable> stableTimetables = [];
            var groupListFromRepo = await timetableContext.Set<Repository.Entities.Timetable.Group>().ToListAsync(cancellationToken);

            foreach (var group in groupListFromRepo)
            {
                var stableCardsOfCurrentGroup = new List<Repository.Entities.Timetable.Cards.StableCard>();
                var lessonsOfCurrentGroup = _ascTimetable.Lessons.Lesson.Where(e=>e.Classids == group.AscId).ToList();
                var ascCardsOfCurrentGroup = new List<AscClasses.Card>();
                foreach (var lesson in lessonsOfCurrentGroup)
                {
                    foreach (var card in ascCards)
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

                    Repository.Entities.Timetable.Cards.Parts.Teacher teacher = await timetableContext.Teachers.SingleAsync(e => e.AscId == lesson.Teacherids, cancellationToken: cancellationToken);
                    Repository.Entities.Timetable.Cards.Parts.Subject subject = await timetableContext.Subjects.SingleAsync(e => e.AscId == lesson.Subjectid, cancellationToken: cancellationToken);
                    Repository.Entities.Timetable.Cards.Parts.LessonTime lessonTime = await timetableContext.LessonTimes.SingleAsync(e => e.Number == int.Parse(card.Period), cancellationToken: cancellationToken);

                    //опять проблемные кабинеты здесь
                    Repository.Entities.Timetable.Cards.Parts.Cabinet? cabinet = null;
                    var ascCabinetsIds = lesson.Classroomids.Split(',');
                    foreach (var ascCabinet in ascCabinetsIds)
                    {
                        cabinet = await timetableContext.Cabinets.FirstOrDefaultAsync(e => e.AscId == ascCabinet, cancellationToken: cancellationToken);
                        if (cabinet is not null)
                        {
                            break;
                        }
                    }
                    ArgumentNullException.ThrowIfNull(cabinet, nameof(cabinet));

                    Repository.Entities.Timetable.Cards.Parts.SubGroup subGroup = DetermineSubgroup(_ascTimetable.Groups.Group.Single(e => e.Id == lesson.Groupids).Name);
                    switch (DetermineWeekEvenness(card.Weeks))
                    {
                        case WeekEvenness.Both:
                            stableCardsOfCurrentGroup.Add(new Repository.Entities.Timetable.Cards.StableCard()
                            {
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                CabinetId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = true,
                                CreatedAt = DateTime.UtcNow
                            });

                            stableCardsOfCurrentGroup.Add(new Repository.Entities.Timetable.Cards.StableCard()
                            {
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                CabinetId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = false,
                                CreatedAt = DateTime.UtcNow
                            });
                            break;

                        case WeekEvenness.Even:
                            stableCardsOfCurrentGroup.Add(new Repository.Entities.Timetable.Cards.StableCard()
                            {
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                CabinetId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = true,
                                CreatedAt = DateTime.UtcNow
                            });
                            break;

                        case WeekEvenness.Odd:
                            stableCardsOfCurrentGroup.Add(new Repository.Entities.Timetable.Cards.StableCard()
                            {
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                CabinetId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = false,
                                CreatedAt = DateTime.UtcNow
                            });
                            break;

                        default:
                            throw new ArgumentException("Четностb недели не определена.");
                    }

                }
                var currentStableTimetable = new Repository.Entities.Timetable.StableTimetable() { Cards = stableCardsOfCurrentGroup, GroupId = group.Id, CreatedAt = DateTime.UtcNow };
                await timetableContext.AddAsync(currentStableTimetable, cancellationToken);
            }
        }
        private static DayOfWeek DetermineDayOfWeek(string dayOfWeekCode)
        {
            const string MONDAY_CODE = "10000";
            const string TUESDAY_CODE = "01000";
            const string WEDNESDAY_CODE = "00100";
            const string THURSDAY_CODE = "00010";
            const string FRIDAY_CODE = "00001";

            return dayOfWeekCode switch
            {
                MONDAY_CODE => DayOfWeek.Monday,
                TUESDAY_CODE => DayOfWeek.Tuesday,
                WEDNESDAY_CODE => DayOfWeek.Wednesday,
                THURSDAY_CODE => DayOfWeek.Thursday,
                FRIDAY_CODE => DayOfWeek.Friday,
                _ => throw new ArgumentException("День недели не определен.")
            };
        }
        private static WeekEvenness DetermineWeekEvenness(string weekCode)
        {
            const string ANY_WEEK_CODE = "11";
            const string EVEN_WEEK_CODE = "10";
            const string ODD_WEEK_CODE = "01";

            return weekCode switch
            {
                ANY_WEEK_CODE => WeekEvenness.Both,
                EVEN_WEEK_CODE => WeekEvenness.Even,
                ODD_WEEK_CODE => WeekEvenness.Odd,
                _ => throw new ArgumentException("Тип недели не определен.")
            };
        }
        private static Repository.Entities.Timetable.Cards.Parts.SubGroup DetermineSubgroup(string subgroupCode)
        {
            return subgroupCode switch
            {
                "Весь класс" => Repository.Entities.Timetable.Cards.Parts.SubGroup.All,
                "1 группа" => Repository.Entities.Timetable.Cards.Parts.SubGroup.FirstGroup,
                "2 группа" => Repository.Entities.Timetable.Cards.Parts.SubGroup.SecondGroup,
                "Мальчики" => Repository.Entities.Timetable.Cards.Parts.SubGroup.Males,
                "Девочки" => Repository.Entities.Timetable.Cards.Parts.SubGroup.Females,
                _ => throw new ArgumentException("Подгруппа не определена.")
            };
        }
        private enum WeekEvenness { Both = 0, Even = 1, Odd = 2 }
    }
}

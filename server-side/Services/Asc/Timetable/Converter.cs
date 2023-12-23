using Microsoft.EntityFrameworkCore;
using Repository.Database;
using System.Xml;
using System.Xml.Serialization;

namespace Services.Asc.Timetable
{
    public class Converter
    {
        public List<Repository.Entities.Timetable.Cards.Parts.Cabinet> Cabinets { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.Parts.Teacher> Teachers { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.Parts.LessonTime> LessonTimes { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.Parts.Subject> Subjects { get; private set; } = [];
        public List<Repository.Entities.Timetable.Cards.StableCard> StableCards { get; private set; } = [];
        public List<Repository.Entities.Timetable.StableTimetable> StableTimetables { get; private set; } = [];
        public List<Repository.Entities.Timetable.Group> Groups { get; private set; } = [];

        private readonly AscClasses.AscTimetable? _ascTimetable;
        private readonly TimetableContext _timetableContext;


        public Converter(string path, TimetableContext timetableContext)
        {
            _timetableContext = timetableContext;
            var serializer = new XmlSerializer(typeof(AscClasses.AscTimetable));
            var xmlReader = XmlReader.Create(path);
            _ascTimetable = serializer.Deserialize(xmlReader) as AscClasses.AscTimetable;

            xmlReader.Dispose();

            FillDataForCards();
        }
        public Converter(XmlReader xmlReader, TimetableContext timetableContext)
        {
            _timetableContext = timetableContext;
            var serializer = new XmlSerializer(typeof(AscClasses.AscTimetable));
            _ascTimetable = serializer.Deserialize(xmlReader) as AscClasses.AscTimetable;

            xmlReader.Dispose();

            FillDataForCards();
            //SavePartsToDb().Wait();
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

        private async Task SavePartsToDb()
        {
            await _timetableContext.AddRangeAsync(Groups, Teachers, Subjects, LessonTimes, Cabinets);
            await _timetableContext.SaveChangesAsync();
        }


        public async Task CreateCardsAndSave(CancellationToken cancellationToken)
        {
            var ascCards = _ascTimetable.Cards.Card;
            List<Repository.Entities.Timetable.StableTimetable> stableTimetables = [];
            var groupListFromRepo = await _timetableContext.Set<Repository.Entities.Timetable.Group>().ToListAsync(cancellationToken);

            foreach (var group in groupListFromRepo)
            {
                var stableCardsOfCurrentGroup = new List<Repository.Entities.Timetable.Cards.StableCard>();
                var ascCardsOfCurrentGroup = ascCards.Where(e => e.Classroomids == group.AscId).ToList();

                foreach (var card in ascCards)
                {
                    var lesson = _ascTimetable.Lessons.Lesson.Single(e => e.Id == card.Lessonid);

                    DayOfWeek dayOfWeek = DetermineDayOfWeek(card.Days);

                    Repository.Entities.Timetable.Cards.Parts.Teacher teacher = await _timetableContext.Teachers.SingleAsync(e => e.AscId == lesson.Teacherids, cancellationToken: cancellationToken);
                    Repository.Entities.Timetable.Cards.Parts.Subject subject = await _timetableContext.Subjects.SingleAsync(e => e.AscId == lesson.Subjectid, cancellationToken: cancellationToken);
                    Repository.Entities.Timetable.Cards.Parts.LessonTime lessonTime = await _timetableContext.LessonTimes.SingleAsync(e => e.Number == int.Parse(card.Period), cancellationToken: cancellationToken);
                    Repository.Entities.Timetable.Cards.Parts.Cabinet cabinet = await _timetableContext.Cabinets.SingleAsync(e => e.AscId == lesson.Classroomids, cancellationToken: cancellationToken);
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
                                IsWeekEven = true
                            });

                            stableCardsOfCurrentGroup.Add(new Repository.Entities.Timetable.Cards.StableCard()
                            {
                                SubjectId = subject.Id,
                                LessonTimeId = lessonTime.Id,
                                TeacherId = teacher.Id,
                                CabinetId = cabinet.Id,
                                SubGroup = subGroup,
                                DayOfWeek = dayOfWeek,
                                IsWeekEven = false
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
                                IsWeekEven = true
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
                                IsWeekEven = false
                            });
                            break;

                        default:
                            throw new ArgumentException("Четностb недели не определена.");
                    }

                }
                var currentStableTimetable = new Repository.Entities.Timetable.StableTimetable() { Cards = stableCardsOfCurrentGroup };
                await _timetableContext.AddAsync(currentStableTimetable, cancellationToken);
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

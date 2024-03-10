using Repository.Database;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable.Cards.Info;
using System.Globalization;

namespace GraphQL
{
    public class Query
    {
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Subject> GetSubjects([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Subjects;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Teacher> GetTeachers([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Teachers;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Group> GetGroups([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Groups;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<Room> GetRooms([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Cabinets;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<LessonTime> GetLessonTimes([Service(ServiceKind.Synchronized)] TimetableContext context) => context.LessonTimes;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<ActualCard> GetActualCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualCards;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<ActualTimetable> GetActualTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualTimetables;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<StableCard> GetStableCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableCards;
        [UseProjection][UseFiltering][UseSorting] public IQueryable<StableTimetable> GetStableTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableTimetables;
        public IEnumerable<WeekPeriod> GetWeekNumbers([Service(ServiceKind.Synchronized)] TimetableContext context, int groupId)
        {
            var weekNumbers = context.ActualTimetables.Where(at=>at.GroupId == groupId).Select(at => at.WeekNumber).Distinct().ToList();
            var year = DateTime.Now.Year;
            var culture = new CultureInfo("ru");

            var weekPeriods = weekNumbers.Select(wn =>
                new WeekPeriod(WeekNumber: wn,
                StartWeek: DateOnly.FromDateTime(ISOWeek.ToDateTime(year, wn, DayOfWeek.Monday)).ToString(culture),
                EndWeek: DateOnly.FromDateTime(ISOWeek.ToDateTime(year, wn, DayOfWeek.Sunday)).ToString(culture)))
                .OrderBy(e => e.WeekNumber).ToList();

            return weekPeriods;
        }

        public record WeekPeriod(int WeekNumber, string StartWeek, string EndWeek);
    }
}

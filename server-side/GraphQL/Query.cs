using Repository.Database;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable.Cards.Info;

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
    }
}

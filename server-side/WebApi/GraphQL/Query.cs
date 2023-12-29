using Repository.Database;
using Repository.Entities.Timetable.Cards.Parts;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;

namespace WebApi.GraphQL
{
    public class Query
    {
        public IQueryable<Subject> GetSubjects([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Subjects;
        public IQueryable<Teacher> GetTeachers([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Teachers;
        public IQueryable<Group> GetGroups([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Groups;
        public IQueryable<Cabinet> GetCabinets([Service(ServiceKind.Synchronized)] TimetableContext context) => context.Cabinets;
        public IQueryable<LessonTime> GetLessonTimes([Service(ServiceKind.Synchronized)] TimetableContext context) => context.LessonTimes;
        public IQueryable<ActualCard> GetActualCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualCards;
        public IQueryable<ActualTimetable> GetActualTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.ActualTimetables;
        public IQueryable<StableCard> GetStableCards([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableCards;
        public IQueryable<StableTimetable> GetStableTimetables([Service(ServiceKind.Synchronized)] TimetableContext context) => context.StableTimetables;
    }
}

using PrettyTimetable.Core;

namespace PrettyTimetable.Core.Entities.Timetable
{
    public interface ITimetable : IEntity
    {
        public Group? Group { get; }
        public int GroupId { get; }
    }
}

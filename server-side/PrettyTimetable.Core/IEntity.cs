namespace PrettyTimetable.Core
{
    public interface IEntity
    {
        int Id { get; }
        DateTime ModifiedAt { get; }
    }
}

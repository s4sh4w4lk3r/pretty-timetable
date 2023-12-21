namespace Repository.Entities.Timetable
{
    public interface ITimetable : IEntity
    {
        public Group? Group { get; }
        public int GroupId { get; }
    }
}

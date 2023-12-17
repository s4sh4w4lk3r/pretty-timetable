namespace Repository.Entities.Timetable
{
    public class Group : IEntity
    {
        public int Id { get; init; }
        public required string Name { get; init; }
        public string? AscId { get; init; }
        public DateTime CreatedAt { get; init; }
        public DateTime UpdatedAt { get; init; }
    }
}

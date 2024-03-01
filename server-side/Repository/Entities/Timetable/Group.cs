namespace Repository.Entities.Timetable
{
    public class Group : IEntity
    {
        public required int Id { get; init; }
        public required string Name { get; init; }
        public string? AscId { get; init; }
        public required DateTime ModifiedAt { get; init; }
    }
}

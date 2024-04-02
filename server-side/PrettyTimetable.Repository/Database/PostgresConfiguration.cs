namespace PrettyTimetable.Repository.Database
{
    public class PostgresConfiguration
    {
        public required string ConnectionString { get; init; }
        public string? Collation { get; init; }
    }
}

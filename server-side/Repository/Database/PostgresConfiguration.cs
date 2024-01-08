namespace Repository.Database
{
    public class PostgresConfiguration
    {
        public required string ConnectionString { get; init; }
        public string? Collation { get; init; }
        public string AdminDbName { get; init; } = "postgres";
#warning возможно убрать эту опцию.
    }
}

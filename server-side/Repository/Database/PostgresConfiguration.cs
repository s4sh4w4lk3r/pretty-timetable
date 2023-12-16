namespace Repository.Database
{
    internal class PostgresConfiguration : IDbConfiguration
    {
        public required string ConnectionString { get; init; }
        public string? DefaultSchema { get; init; } 
        public string? Collation { get; init; }
        public string AdminDbName { get; init; } = "postgres";
    }
}

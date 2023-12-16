namespace Repository.Database
{
    internal interface IDbConfiguration
    {
        string ConnectionString { get; }
        string? DefaultSchema { get; }
        string? Collation { get; }
    }
}

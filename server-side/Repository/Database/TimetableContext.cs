using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Exceptions;
using Throw;

namespace Repository.Database
{
    internal class TimetableContext(IOptions<PostgresConfiguration> options, ILoggerFactory loggerFactory) : DbContext
    {
        private readonly PostgresConfiguration _configuration = options.Value ?? throw new ArgumentNullException($"{nameof(PostgresConfiguration)} является null.");
        private readonly ILoggerFactory _loggerFactory = loggerFactory ?? throw new ArgumentNullException($"{nameof(ILoggerFactory)} является null.");
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            _configuration.ConnectionString.ThrowIfNull(() => new StringNullOrEmptyException()).IfWhiteSpace();
#warning проверить.
            optionsBuilder.UseNpgsql(_configuration.ConnectionString, options => options.UseAdminDatabase(_configuration.AdminDbName));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (string.IsNullOrWhiteSpace(_configuration.DefaultSchema) is false)
            {
                modelBuilder.HasDefaultSchema(_configuration.DefaultSchema);
            }

            if (string.IsNullOrWhiteSpace(_configuration.Collation) is false)
            {
                modelBuilder.UseCollation(_configuration.Collation);
            }
        }
    }
}

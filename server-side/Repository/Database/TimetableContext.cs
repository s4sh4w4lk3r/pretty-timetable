using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Exceptions;
using Throw;
using Repository.Entities.Timetable.Cards.Parts;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable;
using static Repository.Database.TimetableSchemaMethods;

namespace Repository.Database
{
    public class TimetableContext(IOptions<PostgresConfiguration> options, ILoggerFactory loggerFactory) : DbContext
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

        public DbSet<Cabinet> Cabinets => Set<Cabinet>();
        public DbSet<LessonTime> LessonTimes => Set<LessonTime>();
        public DbSet<Teacher> Teachers => Set<Teacher>();
        public DbSet<Subject> Subjects => Set<Subject>();
        public DbSet<ActualCard> ActualCards => Set<ActualCard>();
        public DbSet<ActualTimetable> ActualTimetables => Set<ActualTimetable>();
        public DbSet<StableCard> StableCards => Set<StableCard>();
        public DbSet<StableTimetable> StableTimetables => Set<StableTimetable>();


    }
}

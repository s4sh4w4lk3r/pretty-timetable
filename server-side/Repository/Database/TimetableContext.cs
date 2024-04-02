using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using PrettyTimetable.Core.Entities.Timetable;
using PrettyTimetable.Core.Entities.Timetable.Cards;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;
using static Repository.Database.TimetableSchemaMethods;

namespace Repository.Database
{
    public class TimetableContext(IOptions<PostgresConfiguration> options, ILoggerFactory loggerFactory) : DbContext
    {
        private readonly PostgresConfiguration _configuration = options.Value ?? throw new ArgumentNullException($"{nameof(PostgresConfiguration)} является null.");
        private readonly ILoggerFactory _loggerFactory = loggerFactory ?? throw new ArgumentNullException($"{nameof(ILoggerFactory)} является null.");
        private static readonly bool _isDevelopment = Environment.GetEnvironmentVariable("ASPNETCORE_ENVIRONMENT") == "Development";


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            ArgumentException.ThrowIfNullOrWhiteSpace(_configuration.ConnectionString);
            ArgumentNullException.ThrowIfNull(loggerFactory);

            optionsBuilder.UseLoggerFactory(_loggerFactory);
            optionsBuilder.EnableSensitiveDataLogging(sensitiveDataLoggingEnabled: _isDevelopment);
            optionsBuilder.UseNpgsql(_configuration.ConnectionString, options => 
            { options.MigrationsAssembly("WebApi"); });
        }

        public DbSet<Room> Cabinets => Set<Room>();
        public DbSet<LessonTime> LessonTimes => Set<LessonTime>();
        public DbSet<Teacher> Teachers => Set<Teacher>();
        public DbSet<Subject> Subjects => Set<Subject>();
        public DbSet<ActualCard> ActualCards => Set<ActualCard>();
        public DbSet<ActualTimetable> ActualTimetables => Set<ActualTimetable>();
        public DbSet<StableCard> StableCards => Set<StableCard>();
        public DbSet<StableTimetable> StableTimetables => Set<StableTimetable>();
        public DbSet<Group> Groups => Set<Group>();


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            if (string.IsNullOrWhiteSpace(_configuration.Collation) is false)
            {
                modelBuilder.UseCollation(_configuration.Collation);
            }

            modelBuilder.Entity<Room>(ConfigureRoom);
            modelBuilder.Entity<LessonTime>(ConfigureLessonTime);
            modelBuilder.Entity<Teacher>(ConfigureTeacher);
            modelBuilder.Entity<Subject>(ConfigureSubject);
            modelBuilder.Entity<ActualCard>(ConfigureActualCard);
            modelBuilder.Entity<StableCard>(ConfigureStableCard);
            modelBuilder.Entity<ActualTimetable>(ConfigureActualTimetable);
            modelBuilder.Entity<StableTimetable>(ConfigureStableTimetable);
            modelBuilder.Entity<Group>(ConfigureGroup);
        }
    }
}

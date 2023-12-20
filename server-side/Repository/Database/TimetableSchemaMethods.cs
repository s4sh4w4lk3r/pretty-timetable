using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Repository.Entities.Timetable;
using Repository.Entities.Timetable.Cards;
using Repository.Entities.Timetable.Cards.Parts;

namespace Repository.Database
{
    internal static class TimetableSchemaMethods
    {
        private const string SchemaName = "timetable";

        public static void ConfigureCabinet(EntityTypeBuilder<Cabinet> entity)
        {
            entity.ToTable("Cabinet", SchemaName);
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Address);
            entity.Property(c => c.Number);
            entity.HasIndex(e => e.AscId).IsUnique().AreNullsDistinct();
        }

        public static void ConfigureLessonTime(EntityTypeBuilder<LessonTime> entity)
        {
            entity.ToTable("LessonTime", SchemaName);
        }

        public static void ConfigureSubject(EntityTypeBuilder<Subject> entity)
        {
            entity.ToTable("Subject", SchemaName);
        }

        public static void ConfigureTeacher(EntityTypeBuilder<Teacher> entity)
        {
            entity.ToTable("Teacher", SchemaName);
        }

        public static void ConfigureActualCard(EntityTypeBuilder<ActualCard> entity)
        {
            entity.ToTable("ActualCard", SchemaName);
        }

        public static void ConfigureStableCard(EntityTypeBuilder<StableCard> entity)
        {
            entity.ToTable("StableCard", SchemaName);
        }

        public static void ConfigureActualTimetable(EntityTypeBuilder<ActualTimetable> entity)
        {
            entity.ToTable("ActualTimetable", SchemaName);
        }

        public static void ConfigureStableTimetable(EntityTypeBuilder<StableTimetable> entity)
        {
            entity.ToTable("StableTimetable", SchemaName);
        }

        public static void ConfigureGroup(EntityTypeBuilder<Group> entity)
        {
            entity.ToTable("Group", SchemaName);
        }

    }
}

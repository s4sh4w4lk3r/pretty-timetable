using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using PrettyTimetable.Core.Entities.Substs;
using PrettyTimetable.Core.Entities.Timetable;
using PrettyTimetable.Core.Entities.Timetable.Cards;
using PrettyTimetable.Core.Entities.Timetable.Cards.Info;

namespace PrettyTimetable.Repository.Database
{
    internal static class TimetableSchemaMethods
    {
        private const string SchemaName = "timetable";

        public static void ConfigureRoom(EntityTypeBuilder<Room> entity)
        {
            entity.ToTable("Room", SchemaName);
            entity.HasKey(c => c.Id);
            entity.Property(c => c.Address);
            entity.Property(c => c.Number);
            entity.Property(c => c.FullName);
            entity.HasIndex(e => e.AscId).IsUnique().AreNullsDistinct();
        }

        public static void ConfigureLessonTime(EntityTypeBuilder<LessonTime> entity)
        {
            entity.ToTable("LessonTime", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.Number, e.StartsAt, e.EndsAt }).IsUnique();
        }

        public static void ConfigureSubject(EntityTypeBuilder<Subject> entity)
        {
            entity.ToTable("Subject", SchemaName);
            entity.HasKey(e => e.Id);
            entity.Property(s => s.Name);
            entity.HasIndex(e => e.AscId).IsUnique().AreNullsDistinct();
        }

        public static void ConfigureTeacher(EntityTypeBuilder<Teacher> entity)
        {
            entity.ToTable("Teacher", SchemaName);
            entity.HasKey(e => e.Id);
            /*            entity.Property(t => t.Firstname);
                        entity.Property(t => t.Middlename);
                        entity.Property(t => t.Lastname);*/
            entity.HasIndex(e => e.AscId).IsUnique().AreNullsDistinct();
        }

        public static void ConfigureActualCard(EntityTypeBuilder<ActualCard> entity)
        {
            entity.ToTable("ActualCard", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Cabinet).WithMany(e => e.ActualCards).HasForeignKey(e => e.RoomId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasOne(e => e.Subject).WithMany(e => e.ActualCards).HasForeignKey(e => e.SubjectId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasOne(e => e.Teacher).WithMany(e => e.ActualCards).HasForeignKey(e => e.TeacherId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasOne(e => e.LessonTime).WithMany(e => e.ActualCards).HasForeignKey(e => e.LessonTimeId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasIndex(e => new { e.Date, e.LessonTimeId, e.SubGroup, e.RelatedTimetableId }).IsUnique();
        }

        public static void ConfigureStableCard(EntityTypeBuilder<StableCard> entity)
        {
            entity.ToTable("StableCard", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Cabinet).WithMany(e => e.StableCards).HasForeignKey(e => e.RoomId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasOne(e => e.Subject).WithMany(e => e.StableCards).HasForeignKey(e => e.SubjectId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasOne(e => e.Teacher).WithMany(e => e.StableCards).HasForeignKey(e => e.TeacherId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasOne(e => e.LessonTime).WithMany(e => e.StableCards).HasForeignKey(e => e.LessonTimeId).OnDelete(DeleteBehavior.NoAction).IsRequired();
            entity.HasIndex(e => new { e.DayOfWeek, e.IsWeekEven, e.SubGroup, e.LessonTimeId, e.RelatedTimetableId }).IsUnique();
        }
        public static void ConfigureActualTimetable(EntityTypeBuilder<ActualTimetable> entity)
        {
            entity.ToTable("ActualTimetable", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasMany(e => e.Cards).WithOne(e => e.RelatedTimetable).HasForeignKey(e => e.RelatedTimetableId).IsRequired();
            entity.HasIndex(e => new { e.GroupId, e.WeekNumber }).IsUnique();
        }

        public static void ConfigureStableTimetable(EntityTypeBuilder<StableTimetable> entity)
        {
            entity.ToTable("StableTimetable", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasMany(e => e.Cards).WithOne(e => e.RelatedTimetable).HasForeignKey(e => e.RelatedTimetableId).IsRequired();
            entity.HasIndex(e => new { e.GroupId }).IsUnique();
        }

        public static void ConfigureGroup(EntityTypeBuilder<Group> entity)
        {
            entity.ToTable("Group", SchemaName);
            entity.HasKey(e => e.Id);
            entity.Property(g => g.Name);
            entity.HasIndex(e => e.AscId).IsUnique().AreNullsDistinct();
        }


        public static void ConfigureSubstitution(EntityTypeBuilder<Substitution> entity)
        {
            entity.ToTable("Substitution", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasIndex(e => new { e.Date, e.LessonTimeId, e.SubGroup }).IsUnique();
        }
    }
}

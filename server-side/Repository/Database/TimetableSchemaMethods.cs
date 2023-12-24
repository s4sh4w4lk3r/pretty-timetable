﻿using Microsoft.EntityFrameworkCore;
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
            entity.Property(c => c.FullName);
            entity.HasIndex(e => e.AscId).IsUnique().AreNullsDistinct();
        }

        public static void ConfigureLessonTime(EntityTypeBuilder<LessonTime> entity)
        {
            entity.ToTable("LessonTime", SchemaName);
            entity.HasKey(e => e.Id);
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
            entity.HasOne(e => e.Cabinet).WithMany(e => e.ActualCards).HasForeignKey(e=>e.CabinetId).IsRequired();
            entity.HasOne(e => e.Subject).WithMany(e => e.ActualCards).HasForeignKey(e => e.SubjectId).IsRequired();
            entity.HasOne(e => e.Teacher).WithMany(e => e.ActualCards).HasForeignKey(e => e.TeacherId).IsRequired();
            entity.HasOne(e => e.LessonTime).WithMany(e => e.ActualCards).HasForeignKey(e => e.LessonTimeId).IsRequired();
        }

        public static void ConfigureStableCard(EntityTypeBuilder<StableCard> entity)
        {
            entity.ToTable("StableCard", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasOne(e => e.Cabinet).WithMany(e => e.StableCards).HasForeignKey(e => e.CabinetId).IsRequired();
            entity.HasOne(e => e.Subject).WithMany(e => e.StableCards).HasForeignKey(e => e.SubjectId).IsRequired();
            entity.HasOne(e => e.Teacher).WithMany(e => e.StableCards).HasForeignKey(e => e.TeacherId).IsRequired();
            entity.HasOne(e => e.LessonTime).WithMany(e => e.StableCards).HasForeignKey(e => e.LessonTimeId).IsRequired();
        }
        public static void ConfigureActualTimetable(EntityTypeBuilder<ActualTimetable> entity)
        {
            entity.ToTable("ActualTimetable", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasMany(e => e.Cards).WithOne(e=>e.RelatedTimetable).HasForeignKey(e => e.RelatedTimetableId).IsRequired(); ;
        }

        public static void ConfigureStableTimetable(EntityTypeBuilder<StableTimetable> entity)
        {
            entity.ToTable("StableTimetable", SchemaName);
            entity.HasKey(e => e.Id);
            entity.HasMany(e => e.Cards).WithOne(e=>e.RelatedTimetable).HasForeignKey(e=>e.RelatedTimetableId).IsRequired();
        }

        public static void ConfigureGroup(EntityTypeBuilder<Group> entity)
        {
            entity.ToTable("Group", SchemaName);
            entity.HasKey(e => e.Id);
            entity.Property(g => g.Name);
            entity.HasIndex(e => e.AscId).IsUnique().AreNullsDistinct();
        }

    }
}
﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using Repository.Database;

#nullable disable

namespace WebApi.Migrations
{
    [DbContext(typeof(TimetableContext))]
    partial class TimetableContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.0")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("Repository.Entities.Timetable.ActualTimetable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("GroupId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("WeekNumber")
                        .HasColumnType("integer");

                    b.HasKey("Id");

                    b.HasIndex("GroupId", "WeekNumber")
                        .IsUnique();

                    b.ToTable("ActualTimetable", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.ActualCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CabinetId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<DateOnly>("Date")
                        .HasColumnType("date");

                    b.Property<bool>("IsCanceled")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsModified")
                        .HasColumnType("boolean");

                    b.Property<bool>("IsMoved")
                        .HasColumnType("boolean");

                    b.Property<int>("LessonTimeId")
                        .HasColumnType("integer");

                    b.Property<int>("RelatedTimetableId")
                        .HasColumnType("integer");

                    b.Property<int>("SubGroup")
                        .HasColumnType("integer");

                    b.Property<int>("SubjectId")
                        .HasColumnType("integer");

                    b.Property<int>("TeacherId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CabinetId");

                    b.HasIndex("LessonTimeId");

                    b.HasIndex("RelatedTimetableId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TeacherId");

                    b.HasIndex("Date", "LessonTimeId", "SubGroup", "RelatedTimetableId")
                        .IsUnique();

                    b.ToTable("ActualCard", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.Cabinet", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("Address")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("AscId")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Number")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AscId")
                        .IsUnique();

                    NpgsqlIndexBuilderExtensions.AreNullsDistinct(b.HasIndex("AscId"), true);

                    b.ToTable("Cabinet", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.LessonTime", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<TimeOnly>("EndsAt")
                        .HasColumnType("time without time zone");

                    b.Property<int>("Number")
                        .HasColumnType("integer");

                    b.Property<TimeOnly>("StartsAt")
                        .HasColumnType("time without time zone");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.ToTable("LessonTime", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.Subject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AscId")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AscId")
                        .IsUnique();

                    NpgsqlIndexBuilderExtensions.AreNullsDistinct(b.HasIndex("AscId"), true);

                    b.ToTable("Subject", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.Teacher", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AscId")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Firstname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Lastname")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Middlename")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AscId")
                        .IsUnique();

                    NpgsqlIndexBuilderExtensions.AreNullsDistinct(b.HasIndex("AscId"), true);

                    b.ToTable("Teacher", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.StableCard", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int>("CabinetId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("DayOfWeek")
                        .HasColumnType("integer");

                    b.Property<bool>("IsWeekEven")
                        .HasColumnType("boolean");

                    b.Property<int>("LessonTimeId")
                        .HasColumnType("integer");

                    b.Property<int>("RelatedTimetableId")
                        .HasColumnType("integer");

                    b.Property<int>("SubGroup")
                        .HasColumnType("integer");

                    b.Property<int>("SubjectId")
                        .HasColumnType("integer");

                    b.Property<int>("TeacherId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("CabinetId");

                    b.HasIndex("LessonTimeId");

                    b.HasIndex("RelatedTimetableId");

                    b.HasIndex("SubjectId");

                    b.HasIndex("TeacherId");

                    b.HasIndex("DayOfWeek", "IsWeekEven", "SubGroup", "LessonTimeId", "RelatedTimetableId")
                        .IsUnique();

                    b.ToTable("StableCard", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Group", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AscId")
                        .HasColumnType("text");

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("AscId")
                        .IsUnique();

                    NpgsqlIndexBuilderExtensions.AreNullsDistinct(b.HasIndex("AscId"), true);

                    b.ToTable("Group", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.StableTimetable", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<DateTime>("CreatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.Property<int>("GroupId")
                        .HasColumnType("integer");

                    b.Property<DateTime>("UpdatedAt")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("Id");

                    b.HasIndex("GroupId")
                        .IsUnique();

                    b.ToTable("StableTimetable", "timetable");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.ActualTimetable", b =>
                {
                    b.HasOne("Repository.Entities.Timetable.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.ActualCard", b =>
                {
                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.Cabinet", "Cabinet")
                        .WithMany("ActualCards")
                        .HasForeignKey("CabinetId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.LessonTime", "LessonTime")
                        .WithMany("ActualCards")
                        .HasForeignKey("LessonTimeId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.ActualTimetable", "RelatedTimetable")
                        .WithMany("Cards")
                        .HasForeignKey("RelatedTimetableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.Subject", "Subject")
                        .WithMany("ActualCards")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.Teacher", "Teacher")
                        .WithMany("ActualCards")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Cabinet");

                    b.Navigation("LessonTime");

                    b.Navigation("RelatedTimetable");

                    b.Navigation("Subject");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.StableCard", b =>
                {
                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.Cabinet", "Cabinet")
                        .WithMany("StableCards")
                        .HasForeignKey("CabinetId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.LessonTime", "LessonTime")
                        .WithMany("StableCards")
                        .HasForeignKey("LessonTimeId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.StableTimetable", "RelatedTimetable")
                        .WithMany("Cards")
                        .HasForeignKey("RelatedTimetableId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.Subject", "Subject")
                        .WithMany("StableCards")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("Repository.Entities.Timetable.Cards.Parts.Teacher", "Teacher")
                        .WithMany("StableCards")
                        .HasForeignKey("TeacherId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("Cabinet");

                    b.Navigation("LessonTime");

                    b.Navigation("RelatedTimetable");

                    b.Navigation("Subject");

                    b.Navigation("Teacher");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.StableTimetable", b =>
                {
                    b.HasOne("Repository.Entities.Timetable.Group", "Group")
                        .WithMany()
                        .HasForeignKey("GroupId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Group");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.ActualTimetable", b =>
                {
                    b.Navigation("Cards");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.Cabinet", b =>
                {
                    b.Navigation("ActualCards");

                    b.Navigation("StableCards");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.LessonTime", b =>
                {
                    b.Navigation("ActualCards");

                    b.Navigation("StableCards");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.Subject", b =>
                {
                    b.Navigation("ActualCards");

                    b.Navigation("StableCards");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.Cards.Parts.Teacher", b =>
                {
                    b.Navigation("ActualCards");

                    b.Navigation("StableCards");
                });

            modelBuilder.Entity("Repository.Entities.Timetable.StableTimetable", b =>
                {
                    b.Navigation("Cards");
                });
#pragma warning restore 612, 618
        }
    }
}

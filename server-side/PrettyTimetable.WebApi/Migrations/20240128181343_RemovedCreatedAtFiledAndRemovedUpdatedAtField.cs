using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class RemovedCreatedAtFiledAndRemovedUpdatedAtField : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "Teacher");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "Subject");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "StableTimetable");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "LessonTime");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "Group");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "Cabinet");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "ActualTimetable");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "Teacher",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "Subject",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "StableTimetable",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "StableCard",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "LessonTime",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "Group",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "Cabinet",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "ActualTimetable",
                newName: "ModifiedAt");

            migrationBuilder.RenameColumn(
                name: "UpdatedAt",
                schema: "timetable",
                table: "ActualCard",
                newName: "ModifiedAt");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "Teacher",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "Subject",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "StableTimetable",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "StableCard",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "LessonTime",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "Group",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "Cabinet",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "ActualTimetable",
                newName: "UpdatedAt");

            migrationBuilder.RenameColumn(
                name: "ModifiedAt",
                schema: "timetable",
                table: "ActualCard",
                newName: "UpdatedAt");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "Teacher",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "Subject",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "StableTimetable",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "StableCard",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "LessonTime",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "Group",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "Cabinet",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "ActualTimetable",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                schema: "timetable",
                table: "ActualCard",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}

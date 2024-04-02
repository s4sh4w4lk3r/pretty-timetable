using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.EnsureSchema(
                name: "timetable");

            migrationBuilder.CreateTable(
                name: "Cabinet",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Number = table.Column<string>(type: "text", nullable: false),
                    AscId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cabinet", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Group",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    AscId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Group", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LessonTime",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Number = table.Column<int>(type: "integer", nullable: false),
                    StartsAt = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    EndsAt = table.Column<TimeOnly>(type: "time without time zone", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonTime", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Subject",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false),
                    AscId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Subject", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Teacher",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Lastname = table.Column<string>(type: "text", nullable: false),
                    Firstname = table.Column<string>(type: "text", nullable: false),
                    Middlename = table.Column<string>(type: "text", nullable: false),
                    AscId = table.Column<string>(type: "text", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Teacher", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ActualTimetable",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    WeekNumber = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActualTimetable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActualTimetable_Group_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "timetable",
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StableTimetable",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    GroupId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StableTimetable", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StableTimetable_Group_GroupId",
                        column: x => x.GroupId,
                        principalSchema: "timetable",
                        principalTable: "Group",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ActualCard",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TeacherId = table.Column<int>(type: "integer", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: false),
                    CabinetId = table.Column<int>(type: "integer", nullable: false),
                    LessonTimeId = table.Column<int>(type: "integer", nullable: false),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    IsModified = table.Column<bool>(type: "boolean", nullable: false),
                    IsCanceled = table.Column<bool>(type: "boolean", nullable: false),
                    IsMoved = table.Column<bool>(type: "boolean", nullable: false),
                    SubGroup = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    RelatedTimetableId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ActualCard", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ActualCard_ActualTimetable_RelatedTimetableId",
                        column: x => x.RelatedTimetableId,
                        principalSchema: "timetable",
                        principalTable: "ActualTimetable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActualCard_Cabinet_CabinetId",
                        column: x => x.CabinetId,
                        principalSchema: "timetable",
                        principalTable: "Cabinet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActualCard_LessonTime_LessonTimeId",
                        column: x => x.LessonTimeId,
                        principalSchema: "timetable",
                        principalTable: "LessonTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActualCard_Subject_SubjectId",
                        column: x => x.SubjectId,
                        principalSchema: "timetable",
                        principalTable: "Subject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ActualCard_Teacher_TeacherId",
                        column: x => x.TeacherId,
                        principalSchema: "timetable",
                        principalTable: "Teacher",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StableCard",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    TeacherId = table.Column<int>(type: "integer", nullable: false),
                    SubjectId = table.Column<int>(type: "integer", nullable: false),
                    CabinetId = table.Column<int>(type: "integer", nullable: false),
                    LessonTimeId = table.Column<int>(type: "integer", nullable: false),
                    IsWeekEven = table.Column<bool>(type: "boolean", nullable: false),
                    DayOfWeek = table.Column<int>(type: "integer", nullable: false),
                    SubGroup = table.Column<int>(type: "integer", nullable: false),
                    RelatedTimetableId = table.Column<int>(type: "integer", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StableCard", x => x.Id);
                    table.ForeignKey(
                        name: "FK_StableCard_Cabinet_CabinetId",
                        column: x => x.CabinetId,
                        principalSchema: "timetable",
                        principalTable: "Cabinet",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StableCard_LessonTime_LessonTimeId",
                        column: x => x.LessonTimeId,
                        principalSchema: "timetable",
                        principalTable: "LessonTime",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StableCard_StableTimetable_RelatedTimetableId",
                        column: x => x.RelatedTimetableId,
                        principalSchema: "timetable",
                        principalTable: "StableTimetable",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StableCard_Subject_SubjectId",
                        column: x => x.SubjectId,
                        principalSchema: "timetable",
                        principalTable: "Subject",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_StableCard_Teacher_TeacherId",
                        column: x => x.TeacherId,
                        principalSchema: "timetable",
                        principalTable: "Teacher",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ActualCard_CabinetId",
                schema: "timetable",
                table: "ActualCard",
                column: "CabinetId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualCard_LessonTimeId",
                schema: "timetable",
                table: "ActualCard",
                column: "LessonTimeId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualCard_RelatedTimetableId",
                schema: "timetable",
                table: "ActualCard",
                column: "RelatedTimetableId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualCard_SubjectId",
                schema: "timetable",
                table: "ActualCard",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualCard_TeacherId",
                schema: "timetable",
                table: "ActualCard",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualTimetable_GroupId",
                schema: "timetable",
                table: "ActualTimetable",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Cabinet_AscId",
                schema: "timetable",
                table: "Cabinet",
                column: "AscId",
                unique: true)
                .Annotation("Npgsql:NullsDistinct", true);

            migrationBuilder.CreateIndex(
                name: "IX_Group_AscId",
                schema: "timetable",
                table: "Group",
                column: "AscId",
                unique: true)
                .Annotation("Npgsql:NullsDistinct", true);

            migrationBuilder.CreateIndex(
                name: "IX_StableCard_CabinetId",
                schema: "timetable",
                table: "StableCard",
                column: "CabinetId");

            migrationBuilder.CreateIndex(
                name: "IX_StableCard_LessonTimeId",
                schema: "timetable",
                table: "StableCard",
                column: "LessonTimeId");

            migrationBuilder.CreateIndex(
                name: "IX_StableCard_RelatedTimetableId",
                schema: "timetable",
                table: "StableCard",
                column: "RelatedTimetableId");

            migrationBuilder.CreateIndex(
                name: "IX_StableCard_SubjectId",
                schema: "timetable",
                table: "StableCard",
                column: "SubjectId");

            migrationBuilder.CreateIndex(
                name: "IX_StableCard_TeacherId",
                schema: "timetable",
                table: "StableCard",
                column: "TeacherId");

            migrationBuilder.CreateIndex(
                name: "IX_StableTimetable_GroupId",
                schema: "timetable",
                table: "StableTimetable",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_Subject_AscId",
                schema: "timetable",
                table: "Subject",
                column: "AscId",
                unique: true)
                .Annotation("Npgsql:NullsDistinct", true);

            migrationBuilder.CreateIndex(
                name: "IX_Teacher_AscId",
                schema: "timetable",
                table: "Teacher",
                column: "AscId",
                unique: true)
                .Annotation("Npgsql:NullsDistinct", true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "ActualCard",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "StableCard",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "ActualTimetable",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "Cabinet",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "LessonTime",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "StableTimetable",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "Subject",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "Teacher",
                schema: "timetable");

            migrationBuilder.DropTable(
                name: "Group",
                schema: "timetable");
        }
    }
}

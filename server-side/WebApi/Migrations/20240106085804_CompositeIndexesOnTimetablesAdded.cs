using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class CompositeIndexesOnTimetablesAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StableTimetable_GroupId",
                schema: "timetable",
                table: "StableTimetable");

            migrationBuilder.DropIndex(
                name: "IX_ActualTimetable_GroupId",
                schema: "timetable",
                table: "ActualTimetable");

            migrationBuilder.CreateIndex(
                name: "IX_StableTimetable_GroupId",
                schema: "timetable",
                table: "StableTimetable",
                column: "GroupId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActualTimetable_GroupId_WeekNumber",
                schema: "timetable",
                table: "ActualTimetable",
                columns: new[] { "GroupId", "WeekNumber" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StableTimetable_GroupId",
                schema: "timetable",
                table: "StableTimetable");

            migrationBuilder.DropIndex(
                name: "IX_ActualTimetable_GroupId_WeekNumber",
                schema: "timetable",
                table: "ActualTimetable");

            migrationBuilder.CreateIndex(
                name: "IX_StableTimetable_GroupId",
                schema: "timetable",
                table: "StableTimetable",
                column: "GroupId");

            migrationBuilder.CreateIndex(
                name: "IX_ActualTimetable_GroupId",
                schema: "timetable",
                table: "ActualTimetable",
                column: "GroupId");
        }
    }
}

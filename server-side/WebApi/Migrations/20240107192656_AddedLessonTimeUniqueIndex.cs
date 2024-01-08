using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class AddedLessonTimeUniqueIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_LessonTime_Number_StartsAt_EndsAt",
                schema: "timetable",
                table: "LessonTime",
                columns: new[] { "Number", "StartsAt", "EndsAt" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_LessonTime_Number_StartsAt_EndsAt",
                schema: "timetable",
                table: "LessonTime");
        }
    }
}

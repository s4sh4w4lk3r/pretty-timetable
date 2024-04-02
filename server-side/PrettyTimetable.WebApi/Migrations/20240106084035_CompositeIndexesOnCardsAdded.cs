using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class CompositeIndexesOnCardsAdded : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_StableCard_DayOfWeek_IsWeekEven_SubGroup_LessonTimeId_Relat~",
                schema: "timetable",
                table: "StableCard",
                columns: new[] { "DayOfWeek", "IsWeekEven", "SubGroup", "LessonTimeId", "RelatedTimetableId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_ActualCard_Date_LessonTimeId_SubGroup_RelatedTimetableId",
                schema: "timetable",
                table: "ActualCard",
                columns: new[] { "Date", "LessonTimeId", "SubGroup", "RelatedTimetableId" },
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_StableCard_DayOfWeek_IsWeekEven_SubGroup_LessonTimeId_Relat~",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropIndex(
                name: "IX_ActualCard_Date_LessonTimeId_SubGroup_RelatedTimetableId",
                schema: "timetable",
                table: "ActualCard");
        }
    }
}

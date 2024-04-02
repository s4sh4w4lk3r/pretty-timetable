using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class EditedOnUpdateConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Subject_SubjectId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Teacher_TeacherId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Subject_SubjectId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Teacher_TeacherId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "ActualCard",
                column: "CabinetId",
                principalSchema: "timetable",
                principalTable: "Cabinet",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "ActualCard",
                column: "LessonTimeId",
                principalSchema: "timetable",
                principalTable: "LessonTime",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Subject_SubjectId",
                schema: "timetable",
                table: "ActualCard",
                column: "SubjectId",
                principalSchema: "timetable",
                principalTable: "Subject",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Teacher_TeacherId",
                schema: "timetable",
                table: "ActualCard",
                column: "TeacherId",
                principalSchema: "timetable",
                principalTable: "Teacher",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "StableCard",
                column: "CabinetId",
                principalSchema: "timetable",
                principalTable: "Cabinet",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "StableCard",
                column: "LessonTimeId",
                principalSchema: "timetable",
                principalTable: "LessonTime",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Subject_SubjectId",
                schema: "timetable",
                table: "StableCard",
                column: "SubjectId",
                principalSchema: "timetable",
                principalTable: "Subject",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Teacher_TeacherId",
                schema: "timetable",
                table: "StableCard",
                column: "TeacherId",
                principalSchema: "timetable",
                principalTable: "Teacher",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Subject_SubjectId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Teacher_TeacherId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Subject_SubjectId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Teacher_TeacherId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "ActualCard",
                column: "CabinetId",
                principalSchema: "timetable",
                principalTable: "Cabinet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "ActualCard",
                column: "LessonTimeId",
                principalSchema: "timetable",
                principalTable: "LessonTime",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Subject_SubjectId",
                schema: "timetable",
                table: "ActualCard",
                column: "SubjectId",
                principalSchema: "timetable",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Teacher_TeacherId",
                schema: "timetable",
                table: "ActualCard",
                column: "TeacherId",
                principalSchema: "timetable",
                principalTable: "Teacher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "StableCard",
                column: "CabinetId",
                principalSchema: "timetable",
                principalTable: "Cabinet",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_LessonTime_LessonTimeId",
                schema: "timetable",
                table: "StableCard",
                column: "LessonTimeId",
                principalSchema: "timetable",
                principalTable: "LessonTime",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Subject_SubjectId",
                schema: "timetable",
                table: "StableCard",
                column: "SubjectId",
                principalSchema: "timetable",
                principalTable: "Subject",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Teacher_TeacherId",
                schema: "timetable",
                table: "StableCard",
                column: "TeacherId",
                principalSchema: "timetable",
                principalTable: "Teacher",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}

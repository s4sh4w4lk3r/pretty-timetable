using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace WebApi.Migrations
{
    /// <inheritdoc />
    public partial class RenameCabinetToRoom : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropTable(
                name: "Cabinet",
                schema: "timetable");

            migrationBuilder.RenameColumn(
                name: "CabinetId",
                schema: "timetable",
                table: "StableCard",
                newName: "RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_StableCard_CabinetId",
                schema: "timetable",
                table: "StableCard",
                newName: "IX_StableCard_RoomId");

            migrationBuilder.RenameColumn(
                name: "CabinetId",
                schema: "timetable",
                table: "ActualCard",
                newName: "RoomId");

            migrationBuilder.RenameIndex(
                name: "IX_ActualCard_CabinetId",
                schema: "timetable",
                table: "ActualCard",
                newName: "IX_ActualCard_RoomId");

            migrationBuilder.CreateTable(
                name: "Room",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(type: "text", nullable: false),
                    Number = table.Column<string>(type: "text", nullable: false),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    AscId = table.Column<string>(type: "text", nullable: true),
                    ModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Room", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Room_AscId",
                schema: "timetable",
                table: "Room",
                column: "AscId",
                unique: true)
                .Annotation("Npgsql:NullsDistinct", true);

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Room_RoomId",
                schema: "timetable",
                table: "ActualCard",
                column: "RoomId",
                principalSchema: "timetable",
                principalTable: "Room",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Room_RoomId",
                schema: "timetable",
                table: "StableCard",
                column: "RoomId",
                principalSchema: "timetable",
                principalTable: "Room",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ActualCard_Room_RoomId",
                schema: "timetable",
                table: "ActualCard");

            migrationBuilder.DropForeignKey(
                name: "FK_StableCard_Room_RoomId",
                schema: "timetable",
                table: "StableCard");

            migrationBuilder.DropTable(
                name: "Room",
                schema: "timetable");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                schema: "timetable",
                table: "StableCard",
                newName: "CabinetId");

            migrationBuilder.RenameIndex(
                name: "IX_StableCard_RoomId",
                schema: "timetable",
                table: "StableCard",
                newName: "IX_StableCard_CabinetId");

            migrationBuilder.RenameColumn(
                name: "RoomId",
                schema: "timetable",
                table: "ActualCard",
                newName: "CabinetId");

            migrationBuilder.RenameIndex(
                name: "IX_ActualCard_RoomId",
                schema: "timetable",
                table: "ActualCard",
                newName: "IX_ActualCard_CabinetId");

            migrationBuilder.CreateTable(
                name: "Cabinet",
                schema: "timetable",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Address = table.Column<string>(type: "text", nullable: false),
                    AscId = table.Column<string>(type: "text", nullable: true),
                    FullName = table.Column<string>(type: "text", nullable: false),
                    ModifiedAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Number = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Cabinet", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Cabinet_AscId",
                schema: "timetable",
                table: "Cabinet",
                column: "AscId",
                unique: true)
                .Annotation("Npgsql:NullsDistinct", true);

            migrationBuilder.AddForeignKey(
                name: "FK_ActualCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "ActualCard",
                column: "CabinetId",
                principalSchema: "timetable",
                principalTable: "Cabinet",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_StableCard_Cabinet_CabinetId",
                schema: "timetable",
                table: "StableCard",
                column: "CabinetId",
                principalSchema: "timetable",
                principalTable: "Cabinet",
                principalColumn: "Id");
        }
    }
}

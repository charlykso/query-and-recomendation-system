using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QandR_API.Migrations
{
    public partial class correct_property_name : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecturer_Courses_Courses_CourseId",
                table: "Lecturer_Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Lecturer_Courses_Lecturers_LecturerId",
                table: "Lecturer_Courses");

            migrationBuilder.RenameColumn(
                name: "Update_at",
                table: "Courses",
                newName: "Updated_at");

            migrationBuilder.AlterColumn<string>(
                name: "LecturerId",
                table: "Lecturer_Courses",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "CourseId",
                table: "Lecturer_Courses",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Lecturer_Courses_Courses_CourseId",
                table: "Lecturer_Courses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Lecturer_Courses_Lecturers_LecturerId",
                table: "Lecturer_Courses",
                column: "LecturerId",
                principalTable: "Lecturers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Lecturer_Courses_Courses_CourseId",
                table: "Lecturer_Courses");

            migrationBuilder.DropForeignKey(
                name: "FK_Lecturer_Courses_Lecturers_LecturerId",
                table: "Lecturer_Courses");

            migrationBuilder.RenameColumn(
                name: "Updated_at",
                table: "Courses",
                newName: "Update_at");

            migrationBuilder.AlterColumn<string>(
                name: "LecturerId",
                table: "Lecturer_Courses",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "CourseId",
                table: "Lecturer_Courses",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecturer_Courses_Courses_CourseId",
                table: "Lecturer_Courses",
                column: "CourseId",
                principalTable: "Courses",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Lecturer_Courses_Lecturers_LecturerId",
                table: "Lecturer_Courses",
                column: "LecturerId",
                principalTable: "Lecturers",
                principalColumn: "Id");
        }
    }
}

using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace QandR_API.Migrations
{
    public partial class added_unit_to_course : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Unit",
                table: "Courses",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Unit",
                table: "Courses");
        }
    }
}

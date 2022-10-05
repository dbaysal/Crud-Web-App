using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NLayer.Repository.Migrations
{
    public partial class test17 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProductFeatures",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.RenameColumn(
                name: "UserId",
                table: "UserRoleRelations",
                newName: "UsersId");

            migrationBuilder.RenameColumn(
                name: "RoleId",
                table: "UserRoleRelations",
                newName: "RolesId");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 10, 53, 945, DateTimeKind.Local).AddTicks(5135));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 10, 53, 945, DateTimeKind.Local).AddTicks(5172));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 10, 53, 945, DateTimeKind.Local).AddTicks(5175));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 10, 53, 945, DateTimeKind.Local).AddTicks(5176));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 10, 53, 945, DateTimeKind.Local).AddTicks(5178));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "ProductFeatures",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.RenameColumn(
                name: "UsersId",
                table: "UserRoleRelations",
                newName: "UserId");

            migrationBuilder.RenameColumn(
                name: "RolesId",
                table: "UserRoleRelations",
                newName: "RoleId");

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 1,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 4, 20, 963, DateTimeKind.Local).AddTicks(3908));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 2,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 4, 20, 963, DateTimeKind.Local).AddTicks(3944));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 3,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 4, 20, 963, DateTimeKind.Local).AddTicks(3945));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 4,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 4, 20, 963, DateTimeKind.Local).AddTicks(3947));

            migrationBuilder.UpdateData(
                table: "Products",
                keyColumn: "Id",
                keyValue: 5,
                column: "CreatedDate",
                value: new DateTime(2022, 9, 6, 17, 4, 20, 963, DateTimeKind.Local).AddTicks(3948));
        }
    }
}

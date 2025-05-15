using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ProjetoBenchMarkCarros.Migrations
{
    /// <inheritdoc />
    public partial class AddUsuarioIdToCarro : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carros_Usuarios_NomeUsuarioIdUsuario",
                table: "Carros");

            migrationBuilder.DropIndex(
                name: "IX_Carros_NomeUsuarioIdUsuario",
                table: "Carros");

            migrationBuilder.DropColumn(
                name: "NomeUsuarioIdUsuario",
                table: "Carros");

            migrationBuilder.AddColumn<int>(
                name: "UsuarioId",
                table: "Carros",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Carros_UsuarioId",
                table: "Carros",
                column: "UsuarioId");

            migrationBuilder.AddForeignKey(
                name: "FK_Carros_Usuarios_UsuarioId",
                table: "Carros",
                column: "UsuarioId",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Carros_Usuarios_UsuarioId",
                table: "Carros");

            migrationBuilder.DropIndex(
                name: "IX_Carros_UsuarioId",
                table: "Carros");

            migrationBuilder.DropColumn(
                name: "UsuarioId",
                table: "Carros");

            migrationBuilder.AddColumn<int>(
                name: "NomeUsuarioIdUsuario",
                table: "Carros",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Carros_NomeUsuarioIdUsuario",
                table: "Carros",
                column: "NomeUsuarioIdUsuario");

            migrationBuilder.AddForeignKey(
                name: "FK_Carros_Usuarios_NomeUsuarioIdUsuario",
                table: "Carros",
                column: "NomeUsuarioIdUsuario",
                principalTable: "Usuarios",
                principalColumn: "IdUsuario");
        }
    }
}

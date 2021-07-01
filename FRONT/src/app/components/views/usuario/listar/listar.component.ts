import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Usuario } from "src/app/models/Usuario";
import { UsuarioService } from "src/app/services/usuario.service";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"],
})
export class ListarComponent implements OnInit {
  Usuarios!: MatTableDataSource<Usuario>;
  displayedColumns: string[] = ['nome','cpf' ,'criadoEm', 'alterar', 'excluir'];

  constructor(private service: UsuarioService, private Usuario: UsuarioService, 
    private router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.service.listar().subscribe((Usuarios) => {
      this.Usuarios = new MatTableDataSource<Usuario>(Usuarios);
    });
  }

  excluir(id : string): void {
    let usuario = new Usuario();
    this.Usuario.excluir(id).subscribe(Usuario => {
      this.snack.open("Usuário excluído!", "", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.router.navigate([""])
      .then(nav => {
      window.location.reload();
});
    });
  }
}
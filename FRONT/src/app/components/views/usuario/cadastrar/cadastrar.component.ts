import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { UsuarioService } from "src/app/services/usuario.service";
import { Usuario } from "src/app/models/Usuario";

@Component({
  selector: "app-cadastrar",
  templateUrl: "./cadastrar.component.html",
  styleUrls: ["./cadastrar.component.css"],
})
export class CadastrarComponent implements OnInit {

  id!: string;
  nomeUsuario!: string;
  cpfUsuario!: string;
  sexoUsuario!: string;
  hashUsuario!: string;
  emprestimos = [];

  constructor(private usuario: UsuarioService, private router: Router, private snack: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) =>{
     this.id = queryParams['id']; 
    });
    this.route.queryParams.subscribe((queryParams: any) =>{
      this.nomeUsuario = queryParams['nome']; 
     });
     this.route.queryParams.subscribe((queryParams: any) =>{
      this.cpfUsuario = queryParams['cpf']; 
     });
     this.route.queryParams.subscribe((queryParams: any) =>{
      this.sexoUsuario = queryParams['sexo']; 
     });
    //this.nomeDebito = "asdasdasdasd";
    // Caso de edição de registro
    // Verificar se existe um id na url
    // Buscar o registro no backend
    // Atribuir para a variável global os valores do objeto que retornou do backend
  }

  cadastrar(): void {
    let usuario = new Usuario();
    usuario.nome = this.nomeUsuario;
    usuario.cpf = this.cpfUsuario;
    usuario.sexo = this.sexoUsuario;
    usuario.senha = this.hashUsuario;
    usuario.emprestimos = this.emprestimos;
    if(this.id != undefined){
      usuario._id = this.id;
      this.usuario.alterar(usuario).subscribe(usuario => {
        this.snack.open("Usuário alterado", "", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["/usuario/listar"]);
      });
    }else{
      this.usuario.cadastrar(usuario).subscribe(usuario => {
        this.snack.open("Usuário cadastrado", "", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["/usuario/listar"]);
      });
    }   
  }

}

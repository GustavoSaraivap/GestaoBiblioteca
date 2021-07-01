import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { FuncionarioService } from "src/app/services/funcionario.service";
import { Funcionario } from "src/app/models/Funcionario";

@Component({
  selector: "app-cadastrar-funcionario",
  templateUrl: "./cadastrar-funcionario.component.html",
  styleUrls: ["./cadastrar-funcionario.component.css"],
})
export class CadastrarFuncionarioComponent implements OnInit {

  id!: string;
  nomeFuncionario!: string;
  cpfFuncionario!: string;
  sexoFuncionario!: string;
  hashFuncionario!: string;
  emprestimos = [];

  constructor(private Funcionario: FuncionarioService, private router: Router, private snack: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) =>{
     this.id = queryParams['id']; 
    });
    this.route.queryParams.subscribe((queryParams: any) =>{
      this.nomeFuncionario = queryParams['nome']; 
     });
     this.route.queryParams.subscribe((queryParams: any) =>{
      this.cpfFuncionario = queryParams['cpf']; 
     });
     this.route.queryParams.subscribe((queryParams: any) =>{
      this.sexoFuncionario = queryParams['sexo']; 
     });
    //this.nomeDebito = "asdasdasdasd";
    // Caso de edição de registro
    // Verificar se existe um id na url
    // Buscar o registro no backend
    // Atribuir para a variável global os valores do objeto que retornou do backend
  }

  cadastrar(): void {
    let funcionario = new Funcionario();
    funcionario.nome = this.nomeFuncionario;
    funcionario.cpf = this.cpfFuncionario;
    funcionario.sexo = this.sexoFuncionario;
    funcionario.senha = this.hashFuncionario;
    if(this.id != undefined){
      funcionario._id = this.id;
      this.Funcionario.alterar(funcionario).subscribe(Funcionario => {
        this.snack.open("Funcionário alterado", "", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["/funcionario/listar"]);
      });
    }else{
      this.Funcionario.cadastrar(funcionario).subscribe(Funcionario => {
        this.snack.open("Funcionário cadastrado", "", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate(["/funcionario/listar"]);
      });
    }   
  }

}

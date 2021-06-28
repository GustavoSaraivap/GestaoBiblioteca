import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Livro } from "src/app/models/Livro";
import { LivroService } from "src/app/services/livro.service";

@Component({
  selector: "app-cadastrar",
  templateUrl: "./cadastrar.component.html",
  styleUrls: ["./cadastrar.component.css"],
})

export class CadastrarComponentLivro implements OnInit {

  id!: string;
  tituloLivro!: string;
  editoraLivro!: string;
  autorLivro!: string;
  emprestadoLivro!: string;

  constructor(private livro: LivroService, private router: Router, private snack: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((queryParams: any) =>{
     this.id = queryParams['id']; 
    });
    this.route.queryParams.subscribe((queryParams: any) =>{
      this.tituloLivro = queryParams['titulo']; 
     });
     this.route.queryParams.subscribe((queryParams: any) =>{
      this.editoraLivro = queryParams['editora']; 
     });
     this.route.queryParams.subscribe((queryParams: any) =>{
      this.autorLivro = queryParams['autor']; 
     });
     this.route.queryParams.subscribe((queryParams: any) =>{
      this.emprestadoLivro = queryParams['emprestado']; 
     });
  }

  cadastrar(): void {
    let livro = new Livro();
    livro.autor = this.autorLivro;
    livro.editora = this.editoraLivro;
    livro.titulo = this.tituloLivro;    
    if(this.id != undefined){
      if(this.emprestadoLivro == "false" || this.emprestadoLivro == undefined){
        livro.emprestado = false;
      }
      livro._id = this.id;
      this.livro.alterar(livro).subscribe(livro => {
        this.snack.open("Livro alterado", "", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate([""]);
      });
    }else{
      livro.emprestado = false;
      this.livro.cadastrar(livro).subscribe(livro => {
        this.snack.open("Livro cadastrado", "", {
          duration: 3000,
          horizontalPosition: "right",
          verticalPosition: "top",
        });
        this.router.navigate([""]);
      });
    }   
  }

}

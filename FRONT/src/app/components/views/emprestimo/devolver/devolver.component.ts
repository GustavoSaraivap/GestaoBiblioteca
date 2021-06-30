import { HttpResponse } from "@angular/common/http";
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { EmprestimoAux } from "src/app/models/EmprestimoAux";
import { Livro } from "src/app/models/Livro";
import { EmprestimoService } from "src/app/services/emprestimo.service";
import { LivroService } from "src/app/services/livro.service";

@Component({
  selector: "app-devolver",
  templateUrl: "./devolver.component.html",
  styleUrls: ["./devolver.component.css"],
})
export class DevolverComponent implements OnInit {
  emprestimos!: MatTableDataSource<any>;
  displayedColumns: string[] = ['titulo','dataE' ,'dataD'];
  colunasLivro = ["tituloData"];
  titulos = new MatTableDataSource<EmprestimoAux>();
  tituloLivro!: string;
  multaLivro!: string;

  constructor(private service: EmprestimoService, private livro: LivroService, 
    private router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.service.listar().subscribe((emprestimos) => {
      this.emprestimos = new MatTableDataSource<any>(emprestimos);
      console.log(emprestimos);
    });
  }

  devolver(){
    let emprestimosFinal = this.titulos.data;
    emprestimosFinal[0].valorMulta = parseInt(this.multaLivro);
    this.service.devolver(emprestimosFinal).subscribe(emprestimo => {
      this.snack.open("Devolução concluída", "", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.router.navigate([""]);
    });   
    
  }

  adicionarLivro(): void {
    
    let emprestimoAux = new EmprestimoAux();
    emprestimoAux.titulo = this.tituloLivro
    this.titulos.data.push(emprestimoAux);
    this.titulos._updateChangeSubscription();
    this.tituloLivro = "";
  }
  
}
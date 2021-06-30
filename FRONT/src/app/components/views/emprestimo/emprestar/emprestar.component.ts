import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { EmprestimoAux } from "src/app/models/EmprestimoAux";
import { Livro } from "src/app/models/Livro";
import { EmprestimoService } from "src/app/services/emprestimo.service";
import { LivroService } from "src/app/services/livro.service";

@Component({
  selector: "app-emprestar",
  templateUrl: "./emprestar.component.html",
  styleUrls: ["./emprestar.component.css"],
})
export class EmprestarComponent implements OnInit {
  livros!: MatTableDataSource<Livro>;
  displayedColumns: string[] = ['titulo','editora' ,'autor', 'emprestado'];
  colunasLivro = ["tituloData"];
  titulos = new MatTableDataSource<EmprestimoAux>();
  tituloLivro!: string;
  constructor(private serviceLivro: LivroService, private livro: LivroService, 
    private router: Router, private snack: MatSnackBar, private serviceEmprestimo :EmprestimoService) {}

  ngOnInit(): void {
    this.serviceLivro.listar().subscribe((livros) => {
      this.livros = new MatTableDataSource<Livro>(livros);
    });
  }

  emprestar(): void {

    this.serviceEmprestimo.emprestar(this.titulos.data).subscribe(emprestimo => {
      this.snack.open("Empréstimo concluído", "", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.router.navigate(["/emprestimo/listar"]);
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
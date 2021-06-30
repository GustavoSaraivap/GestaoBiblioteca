import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Livro } from "src/app/models/Livro";
import { LivroService } from "src/app/services/livro.service";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"],
})
export class ListarComponentLivro implements OnInit {
  livros!: MatTableDataSource<Livro>;
  displayedColumns: string[] = ['titulo','editora' ,'autor', 'emprestado', 'alterar', 'excluir'];

  constructor(private service: LivroService, private livro: LivroService, 
    private router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.service.listar().subscribe((livros) => {
      this.livros = new MatTableDataSource<Livro>(livros);
    });
  }

  excluir(id : string): void {
    let livro = new Livro();
    this.livro.excluir(id).subscribe(livro => {
      this.snack.open("Livro excluído!", "", {
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
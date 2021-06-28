import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Livro } from "src/app/models/Livro";
import { EmprestimoService } from "src/app/services/emprestimo.service";
import { LivroService } from "src/app/services/livro.service";

@Component({
  selector: "app-listar",
  templateUrl: "./listar.component.html",
  styleUrls: ["./listar.component.css"],
})
export class ListarComponentEmprestimo implements OnInit {
  emprestimos!: MatTableDataSource<any>;
  displayedColumns: string[] = ['titulo','dataE' ,'dataD'];

  constructor(private service: EmprestimoService, private livro: LivroService, 
    private router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.service.listar().subscribe((emprestimos) => {
      this.emprestimos = new MatTableDataSource<any>(emprestimos);
      console.log(emprestimos);
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
import { Component, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { Funcionario } from "src/app/models/Funcionario";
import { FuncionarioService } from "src/app/services/funcionario.service";

@Component({
  selector: "app-listar-funcionario",
  templateUrl: "./listar-funcionario.component.html",
  styleUrls: ["./listar-funcionario.component.css"],
})
export class ListarFuncionarioComponent implements OnInit {
  Funcionarios!: MatTableDataSource<Funcionario>;
  displayedColumns: string[] = ['nome','cpf' ,'criadoEm', 'alterar', 'excluir'];

  constructor(private service: FuncionarioService, private Funcionario: FuncionarioService, 
    private router: Router, private snack: MatSnackBar) {}

  ngOnInit(): void {
    this.service.listar().subscribe((Funcionarios) => {
      this.Funcionarios = new MatTableDataSource<Funcionario>(Funcionarios);
    });
  }

  excluir(id : string): void {
    let funcionario = new Funcionario();
    this.Funcionario.excluir(id).subscribe(Funcionario => {
      this.snack.open("Funcionário excluído!", "", {
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
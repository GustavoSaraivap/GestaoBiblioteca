import { MatTableDataSource } from "@angular/material/table";
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from '@angular/router';
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Login } from "src/app/models/Login";
import { LoginService } from "src/app/services/login.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"],
})
export class LoginComponent implements OnInit {

  cpfLogin!: string;
  senhaLogin!: string;
  metodo!: string;

  constructor(private loginService: LoginService, private router: Router, private snack: MatSnackBar, private route: ActivatedRoute) {}

  ngOnInit(): void {
  }

  logar(): void {
    const user = new Login();
    user.cpf = this.cpfLogin;
    user.senha = this.senhaLogin;
    this.loginService.login(user, this.metodo).subscribe(user => {
      this.snack.open("Login efetuado", "", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.router.navigate([""]);
    });
       
  }

  deslogar(): void{  
    this.loginService.logout(this.metodo).subscribe(user => {
      this.snack.open("Logout efetuado", "", {
        duration: 3000,
        horizontalPosition: "right",
        verticalPosition: "top",
      });
      this.router.navigate([""]);
    });
  }

}
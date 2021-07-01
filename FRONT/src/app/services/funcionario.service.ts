import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Funcionario } from "../models/Funcionario";

@Injectable({
  providedIn: "root",
})
export class FuncionarioService {

  baseURL = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  listar(): Observable<Funcionario[]> {
    return this.http.get<Funcionario[]>(`${this.baseURL}funcionario/listar`);
  }

  cadastrar(funcionario: Funcionario): Observable<Funcionario> {
    console.log(Funcionario);
    return this.http.post<Funcionario>(`${this.baseURL}funcionario/cadastrar`, funcionario);
  }

  excluir(id: string): Observable<Funcionario> {
    console.log(id);
    return this.http.delete<Funcionario>(`${this.baseURL}funcionario/remover/${id}`);
  }

  alterar(funcionario: Funcionario): Observable<Funcionario> {
    console.log(funcionario);
    return this.http.put<Funcionario>(`${this.baseURL}funcionario/alterar`, funcionario);
  }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { EmprestimoAux } from "../models/EmprestimoAux";
import { Livro } from "../models/Livro";

@Injectable({
  providedIn: "root",
})
export class EmprestimoService {

  baseURL = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  listar(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseURL}emprestimo/listar`);
  }

  emprestar(emprestimos : EmprestimoAux[]): Observable<any> {
    console.log(emprestimos);
    return this.http.post<any>(`${this.baseURL}emprestimo`, emprestimos);
  }

  devolver(emprestimos : EmprestimoAux[]): Observable<any> {
    console.log(emprestimos);
    return this.http.post<any>(`${this.baseURL}devolucao`, emprestimos);
  }

}
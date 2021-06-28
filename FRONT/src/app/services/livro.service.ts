import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Livro } from "../models/Livro";

@Injectable({
  providedIn: "root",
})
export class LivroService {

  baseURL = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  listar(): Observable<Livro[]> {
    return this.http.get<Livro[]>(`${this.baseURL}livro/listar`);
  }

  cadastrar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.baseURL}livro/cadastrar`, livro);
  }

  excluir(id: string): Observable<Livro> {
    console.log(id);
    return this.http.get<Livro>(`${this.baseURL}livro/remover/${id}`);
  }

  alterar(livro: Livro): Observable<Livro> {
    return this.http.post<Livro>(`${this.baseURL}livro/alterar`, livro);
  }
}
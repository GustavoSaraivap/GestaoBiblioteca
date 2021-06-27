import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Usuario } from "../models/Usuario";

@Injectable({
  providedIn: "root",
})
export class UsuarioService {

  baseURL = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  listar(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(`${this.baseURL}usuario/listar`);
  }

  cadastrar(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    return this.http.post<Usuario>(`${this.baseURL}usuario/cadastrar`, usuario);
  }

  excluir(id: string): Observable<Usuario> {
    console.log(id);
    return this.http.get<Usuario>(`${this.baseURL}usuario/remover/${id}`);
  }

  alterar(usuario: Usuario): Observable<Usuario> {
    console.log(usuario);
    return this.http.post<Usuario>(`${this.baseURL}usuario/alterar`, usuario);
  }
}
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Login } from "../models/Login";

@Injectable({
  providedIn: "root",
})
export class LoginService {

  baseURL = "http://localhost:3000/";

  constructor(private http: HttpClient) {}

  login(usuario: Login): Observable<any> {
    return this.http.post<Login>(`${this.baseURL}usuario/login`, usuario);
  }
  logout(): Observable<any> {
    return this.http.get<void>(`${this.baseURL}usuario/logout`);
  }
}
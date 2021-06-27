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

  login(usuario: Login, login: string): Observable<any> {
    console.log(usuario);
    return this.http.post<Login>(`${this.baseURL}${login}/login`, usuario);
  }
  logout(login: string): Observable<any> {
    return this.http.get<void>(`${this.baseURL}${login}/logout`);
  }
}
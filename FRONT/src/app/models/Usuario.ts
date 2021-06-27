import { Emprestimo } from "./Emprestimo";

export class Usuario {
  _id?: string;
  nome!: string;
  cpf!: string;
  sexo!: string;
  senha!: string;
  emprestimos!: Emprestimo[];
  createdAt?: Date;
  updatedAt?: Date;
}
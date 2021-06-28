import { Livro } from "./Livro";

export class Emprestimo {
    _id?: string;
    dataDevolucao?: Date;
    dataEmprestimo?: Date;
    livro!: Livro[];
    createdAt?: Date;
    updatedAt?: Date;
  }
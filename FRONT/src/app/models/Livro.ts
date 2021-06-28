export class Livro {
    _id?: string;
    titulo!: string;
    editora!: string;
    autor!: string;
    emprestado!: boolean;
    createdAt?: Date;
    updatedAt?: Date;
  }
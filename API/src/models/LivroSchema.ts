import {model, Schema} from "mongoose";

const livrosSchema = new Schema(
{
    titulo:{
        type:String,
        required:[true, "O campo TÍTULO do livro e obrigatório!"]
    },
    editora:{
        type:String,
        required:[true, "O campo EDITORA do livro e obrigatório!"]
    },
    autor: {
        type:String,
        required:[true, "O campo AUTOR do livro e obrigatório!"]
    },
    emprestado: {
        type:Boolean,
        required:[true, "O campo Emprestado do livro e obrigatório!"]
    }
},{
    timestamps: true
});

export default model("livros", livrosSchema);

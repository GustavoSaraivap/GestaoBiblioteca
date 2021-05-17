import {model, Schema} from "mongoose";
import { mongoose } from "../config/database";

const EmprestimoSchema = new Schema(
{
    dataEmprestimo:{
        type:Date
    },
    dataDevolucao:{
        type:Date
    },
    livro:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'livros',
        require:true
    }
},{
    timestamps: true
});

export default model("emprestimos", EmprestimoSchema);
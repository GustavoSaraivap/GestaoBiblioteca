import {model, Schema} from "mongoose";

const emprestimoSchema = new Schema(

    {
        codigo:{
            type:Number,
            required:[true, "O campo CODIGO de emprestimo é obrigatório!"]
        },
        codigoLivro:{
            type:Number,
            required:[true, "O campo CODIGOLIVRO de emprestimo é obrigatório!"]
        },
        cpfCliente:{
            type:String,
            required:[true, "O campo CPFCLIENTE de emprestimo é obrigatório!"]
        },
        mesEmprestimo:{
            type:Number,
            required:[true, "O campo MESEMPRESTIMO de emprestimo é obrigatório!"]
        },
        mesDevolucao:{
            type:Number,
            required:[true, "O campo MESDEVOLUCAO de emprestio é obrigatório!"]
        },
        pagar:{
            type:"String"
        },
        livroS:[
            {
                codigo:{
                    type:Number,
                    required:[true, "O campo CODIGO do livro é obrigatório!"]
                },
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
                }
            }
        ]
    },
    {
        timestamps: true
    }

);

export default model("emprestimo", emprestimoSchema);
import {model, Schema} from "mongoose";

const livrosSchema = new Schema(
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
},{
    timestamps: true
});

export default model("livros", livrosSchema);

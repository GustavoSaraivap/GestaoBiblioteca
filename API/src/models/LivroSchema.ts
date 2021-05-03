import {model, Schema} from "mongoose";

const usuarioSchema = new Schema(
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
    }
},{
    timestamps: true
});

export default model("usuarios", usuarioSchema);
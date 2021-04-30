import {model, Schema} from "mongoose";

const usuarioSchema = new Schema(
{
    nome:{
        type:String,
        required:[true, "O campo NOME do usuário e obrigatório!"]
    },
    cpf:{
        type:String,
        required:[true, "O campo CPF do usuário e obrigatório!"]
    },
    sexo: {
        type: String,
        enum: ["MASCULINO", "FEMININO", "OUTROS"],
        uppercase: true
    },
    hash:{
        type:String,
        required:[true, "O campo Senha do usuário e obrigatório!"]
    }
},{
    timestamps: true
});

export default model("usuarios", usuarioSchema);
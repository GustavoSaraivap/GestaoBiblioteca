import {model, Schema} from "mongoose";

const funcionarioSchema = new Schema(
{
    nome:{
        type:String,
        required:[true, "O campo NOME do funcionário e obrigatório!"]
    },
    cpf:{
        type:String,
        required:[true, "O campo CPF do funcionário e obrigatório!"]
    },
    sexo: {
        type: String,
        enum: ["MASCULINO", "FEMININO", "OUTROS"],
        uppercase: true
    },
    hash:{
        type:String,
        required:[true, "O campo Senha do funcionário e obrigatório!"]
    }
},{
    timestamps: true
});

export default model("funcionarios", funcionarioSchema);
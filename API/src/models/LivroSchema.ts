import {model, Schema} from "mongoose";

<<<<<<< HEAD
const livrosSchema = new Schema(
=======
const LivroSchema = new Schema(
>>>>>>> e35952971054caa0299a8a826e6d833140c7c285
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

<<<<<<< HEAD
export default model("livros", livrosSchema);
=======
export default model("livros", LivroSchema);
>>>>>>> e35952971054caa0299a8a826e6d833140c7c285

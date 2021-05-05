import {Request, Response } from "express";
import {Auth} from "./Auth"
import LivroSchema from "../models/LivroSchema";

const auth = new Auth();

class LivroController{
    async listar(request: Request, response: Response){
        const livros = await LivroSchema.find();
        response.status(200).json(livros);
    }

    async buscarPorTitulo(request: Request, response: Response){
        const{title} = request.params;
        try {
            const livro = await LivroSchema.findOne({titulo : title});
            if(livro == null){
                response.status(404).json({ msg:"O livro não existe!"});
            }
            response.status(200).json(livro);
        } catch (error) {
            response.status(400).json(error);
        }
       
    }

    async cadastrar(request: Request, response: Response){
        try{
            const obj = await auth.autenticacaoFuncionario();
            if(obj != null){
                const newLivro = await LivroSchema.create(request.body);
                response.status(201).json(newLivro);
            }else{
                response.status(400).json({message:"Você não tem permissão!"});
            }
        } catch(error){
            response.status(400).json(error);
        }
    }

    async remover(request: Request, response: Response){
        try{
            const obj = await auth.autenticacaoFuncionario();
            if(obj != null){
                const{id} = request.params;
                const livro:any = await LivroSchema.findOne({_id : id});
                await LivroSchema.deleteOne(livro);
                response.status(200).json({ msg:"O livro foi excluido!"});
            }else{
                response.status(400).json({message:"Você não tem permissão!"});
            }
            
        } catch(error){
            response.status(400).json(error);
        }
    }

    async alterar(request: Request, response: Response){
        try{
            const obj = await auth.autenticacaoFuncionario();
            if(obj != null){
                const livro = request.body;
                const livroid = livro._id;
                const alterarLivro:any = await  LivroSchema.findOne({_id : livroid});
                const newLivro = await LivroSchema.updateOne(alterarLivro, livro);
                response.status(200).json(newLivro);
            }else{
                response.status(400).json({message:"Você não tem permissão!"});
            }
        } catch(error){
            response.status(400).json(error);
        }
    }

}

export {LivroController};
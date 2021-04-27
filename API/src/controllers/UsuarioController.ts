import {Request, Response } from "express";
import UsuarioSchema from "../models/UsuarioSchema";
import Validacao from "../utils/Validacao";

class UsuarioController{
    async listar(request: Request, response: Response){
        const usuarios = await UsuarioSchema.find();
        response.status(200).json(usuarios);
    }

    async buscarPorId(request: Request, response: Response){
        const{id} = request.params;
        //const ciclo = await CicloSchema.findById(id);
        //const ciclo = await CicloSchema.find({_id : id});
        try {
            const usuario = await UsuarioSchema.findOne({_id : id});
            if(usuario == null){
                response.status(404).json({ msg:"O usuário não existe!"});
            }
            response.status(200).json(usuario);
        } catch (error) {
            response.status(400).json(error);
        }
       
    }

    async cadastrar(request: Request, response: Response){
        try{
            const user = request.body;
            const cpf = user.cpf;
            if(Validacao.validarCPF(cpf) == true){
                const newUser = await UsuarioSchema.create(user);
                response.status(201).json(newUser);
            }
            else{
                response.status(400).json({ msg:"O campo CPF é inválido!"});
            }
        } catch(error){
            response.status(400).json(error);
        }
    }
}

export {UsuarioController};
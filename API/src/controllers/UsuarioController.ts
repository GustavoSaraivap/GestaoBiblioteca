import {Request, Response } from "express";
import UsuarioSchema from "../models/UsuarioSchema";
import Validacao from "../utils/Validacao";
import bcrypt from "bcrypt";
import {Auth} from "./Auth"

const auth = new Auth();

class UsuarioController{
    async listar(request: Request, response: Response){
        const usuarios = await UsuarioSchema.find();
        response.status(200).json(usuarios);
    }

    async buscarPorId(request: Request, response: Response){
        const{id} = request.params;
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
            const json = request.body;
            const cpf = json.cpf;
            const senha = json.senha;
            if(Validacao.validarCPF(cpf) == true){
                const userAux = await UsuarioSchema.findOne({cpf : cpf});
                if(userAux == null){
                    json.hash = await bcrypt.hash(senha, 10);
                    const newUser = await UsuarioSchema.create(json);
                    response.status(201).json(newUser);
                }else{
                    response.status(400).json({ msg:"Esse CPF já foi cadastrado!"});
                }
            }
            else{
                response.status(400).json({ msg:"O campo CPF é inválido!"});
            }
        } catch(error){
            response.status(400).json(error);
        }
    }

    async remover(request: Request, response: Response){
        try{
            const{id} = request.params;
            const user:any = await UsuarioSchema.findOne({_id : id});
            await UsuarioSchema.deleteOne(user);
            response.status(200).json({ msg:"O usuário foi excluido!"});
        } catch(error){
            response.status(400).json(error);
        }
    }

    async alterar(request: Request, response: Response){
        try{
            const user = request.body;
            const userid = user._id;
            const cpf = user.cpf;
            const senha = user.senha;
            if(Validacao.validarCPF(cpf) == true){
                user.hash = await bcrypt.hash(senha, 10);
                const alterarUser:any = await  UsuarioSchema.findOne({_id : userid});
                const newUser = await UsuarioSchema.updateOne(alterarUser, user);
                response.status(200).json(newUser);
            }else{
                response.status(400).json({ msg:"O campo CPF é inválido!"});
            }
        } catch(error){
            response.status(400).json(error);
        }
    }

    async loginUsuario(request: Request, response: Response){
        try{
            auth.login(request, response);
        } catch(error){
            response.status(400).json(error);
        }
    }
    async logoutUsuario(request: Request, response: Response){
        try{
            auth.logout(request, response);
        } catch(error){
            response.status(400).json(error);
        }
    }

    
}

export {UsuarioController};
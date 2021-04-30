import {Request, Response } from "express";
import UsuarioSchema from "../models/UsuarioSchema";
import Validacao from "../utils/Validacao";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
            const userid = user._id
            const alterarUser:any = await  UsuarioSchema.findOne({_id : userid});
            const newUser = await UsuarioSchema.updateOne(alterarUser, user);
            response.status(200).json(newUser);

        } catch(error){
            response.status(400).json(error);
        }
    }

    async login(request: Request, response: Response){
        const {cpf, senha} = request.body;
        const user: any = await UsuarioSchema.findOne({cpf : cpf});
        if(user != null){
           const validPass = await bcrypt.compare(senha, user.hash);
           console.log(validPass);
           if(validPass){
               globalThis.ENVIRONMENT = jwt.sign({cpf: cpf}, 'token');
                response.status(200).json("Logado com sucesso!");
           }  else{
            response.status(400).json({message:"Cpf ou Senha Inválidos!"});
           }
        }else{
            response.status(400).json({message:"Cpf ou Senha Inválidos!"});
        }
       
    }

    logout(request: Request, response: Response){
        if(globalThis.ENVIRONMENT != ""){
            globalThis.ENVIRONMENT = "";
            response.status(200).json("Login encerrado!");
        }else{
            response.status(400).json({message:"Nenhuma conta logada no momento!"});
        }
        
    }
}

export {UsuarioController};
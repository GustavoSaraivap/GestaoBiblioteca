import {Request, Response } from "express";
import UsuarioSchema from "../models/UsuarioSchema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import FuncionarioSchema from "../models/FuncionarioSchema";

class Auth{
    async login(request: Request, response: Response){
        try {
            const {cpf, senha} = request.body;
            const user: any = await UsuarioSchema.findOne({cpf : cpf});
            if(user != null){
            const validPass = await bcrypt.compare(senha, user.hash);
                if(validPass){
                    globalThis.ENVIRONMENT = jwt.sign({cpf: cpf}, 'token');
                    response.status(200).json("Logado com sucesso!");
                }else{
                    response.status(400).json({message:"Cpf ou Senha Inválidos!"});
                }
            }else{
                const funcionario: any = await FuncionarioSchema.findOne({cpf : cpf});
                if(funcionario != null){
                    const validPass = await bcrypt.compare(senha, funcionario.hash);
                    if(validPass){
                        globalThis.ENVIRONMENT = jwt.sign({cpf: cpf}, 'token');
                        response.status(200).json("Logado com sucesso!");
                    }else{
                        response.status(400).json({message:"Cpf ou Senha Inválidos!"});
                    }
                }else{
                    response.status(400).json({message:"Cpf ou Senha Inválidos!"});
                }
            }
        } catch (error) {
            response.status(400).json(error);
        }
        
       
    }
    
    logout(request: Request, response: Response){
        try {
            if(globalThis.ENVIRONMENT != ""){
                globalThis.ENVIRONMENT = "";
                response.status(200).json("Login encerrado!");
            }else{
                response.status(400).json({message:"Nenhuma conta logada no momento!"});
            }
        } catch (error) {
            response.status(400).json(error);
        }
    }
}

export{Auth};
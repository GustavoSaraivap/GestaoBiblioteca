import {Request, Response } from "express";
import FuncionarioSchema from "../models/FuncionarioSchema";
import Validacao from "../utils/Validacao";
import bcrypt from "bcrypt";
import {Auth} from "./Auth";


const auth = new Auth();

class FuncionarioController{
    async listar(request: Request, response: Response){
        const funcionarios = await FuncionarioSchema.find();
        response.status(200).json(funcionarios);
    }

    async buscarPorId(request: Request, response: Response){
        const{id} = request.params;
        try {
            const funcionario = await FuncionarioSchema.findOne({_id : id});
            if(funcionario == null){
                response.status(404).json({ msg:"O funcionário não existe!"});
            }
            response.status(200).json(funcionario);
        } catch (error) {
            response.status(400).json(error);
        }
       
    }

    async buscarPorCpf(cpf: String){
        const funcionario = await FuncionarioSchema.findOne({cpf : cpf});
        return funcionario;
    }

    async cadastrar(request: Request, response: Response){
        try{
            const json = request.body;
            const cpf = json.cpf;
            const senha = json.senha;
            if(Validacao.validarCPF(cpf) == true){
                const funcionarioAux = await FuncionarioSchema.findOne({cpf : cpf});
                if(funcionarioAux == null){
                    json.hash = await bcrypt.hash(senha, 10);
                    const newFuncionario = await FuncionarioSchema.create(json);
                    response.status(201).json(newFuncionario);
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
            const funcionario:any = await FuncionarioSchema.findOne({_id : id});
            await FuncionarioSchema.deleteOne(funcionario);
            response.status(200).json({ msg:"O funcionário foi excluido!"});
        } catch(error){
            response.status(400).json(error);
        }
    }

    async alterar(request: Request, response: Response){
        try{
            const funcionario = request.body;
            const funcionarioid = funcionario._id;
            const hash = funcionario.hash;
            const cpf = funcionario.cpf;
            if(Validacao.validarCPF(cpf) == true){
                funcionario.hash = await bcrypt.hash(hash, 10);
                const alterarFuncionario:any = await  FuncionarioSchema.findOne({_id : funcionarioid});
                const newFuncionario = await FuncionarioSchema.updateOne(alterarFuncionario, funcionario);
                response.status(200).json(newFuncionario);
    
            }else{
                response.status(400).json({ msg:"O campo CPF é inválido!"});
            }
        } catch(error){
            response.status(400).json(error);
        }
    }

    async loginFuncionario(request: Request, response: Response){
        try{
            auth.login(request, response);
        } catch(error){
            response.status(400).json(error);
        }
    }

    async logoutFuncionario(request: Request, response: Response){
        try{
            auth.logout(request, response);
        } catch(error){
            response.status(400).json(error);
        }
    }

}

export {FuncionarioController};
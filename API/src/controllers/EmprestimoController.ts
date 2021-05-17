import {Request, response, Response } from "express";
import {Auth} from "./Auth"
import LivroSchema from "../models/LivroSchema";
import EmprestimoSchema from "../models/EmprestimoSchema";
import UsuarioSchema from "../models/UsuarioSchema";

const auth = new Auth();

class EmprestimoController{
    async listar(request: Request, response: Response){
        try {
            const obj : any= await auth.autenticacaoUsuario();
            if(obj != null){
                const emprestimos:[any] = [""];
                const livro:[any] = [""];
                for(let i = 0; i < obj.emprestimos.length; i++){
                    emprestimos [i]= await EmprestimoSchema.findOne({_id : obj.emprestimos[i]});
                    livro [i]= await LivroSchema.findOne({_id : emprestimos[i].livro._id});
                }
                const print:[any] = [""];
                for(let i = 0; i < obj.emprestimos.length; i++){
                    print[i] = 
                    {
                        "Título Livro": livro[i].titulo,
                        "Data do empréstimo": new Date(emprestimos[i].dataEmprestimo).toLocaleString(),
                        "Data da devolução": new Date(emprestimos[i].dataDevolucao).toLocaleString()
                    }
                }
                response.status(200).json(print);
            }else{
                response.status(400).json({message:"Você não tem permissão!"}); 
            }
        } catch (error) {
            response.status(400).json({message:"Erro ao listar!"})
        }
        
    }

    async devolucao(request: Request, response: Response){
        try{
            const obj : any = await auth.autenticacaoUsuario();
            const string:[any] = request.body;
            if(obj != null){
                const devolucao:[any] = obj.emprestimos;
                let livroid:[any] = [""];
                if(devolucao.length>0){
                    if(string.length > 0){
                        const titulo:[any] = [""];
                        for(let i = 0; i < string.length; i++){
                            titulo[i] = string[i];
                        }
                        for(let i = 0; i < string.length; i++){
                            let livro:any = await LivroSchema.findOne({titulo : titulo[i].titulo});
                            livroid[i] = livro._id;
                            await LivroSchema.updateMany({emprestado:true, _id:livro._id}, {$set:{emprestado:false}});
                        }
                        const emprestimoId : [any] = [""];
                        let emprestimoIdAtt : [any] = [""];
                        let validacao = false;
                        let emprestimoIdExclui : [any] = [""];
                        for(let i = 0; i < devolucao.length; i++){
                            emprestimoId[i]= devolucao[i]._id;
                        }
                        const userAux : any= await UsuarioSchema.findById(obj._id);
                        
                            for(let i = 0; i < emprestimoId.length; i++){
                                const emprestimoPago : any = await EmprestimoSchema.findById(emprestimoId[i]);
                                let x = 0
                                let validaexclui = 0;
                                if(emprestimoPago != null){
                                    let idemp : String = emprestimoPago.livro._id;
                                    for(let j = 0; j < livroid.length; j++){
                                        let livroidif : String = livroid[j];
                                        if(`${idemp}` == `${livroidif}`){
                                            x = x-1;
                                        }else{
                                            x = x+1;
                                        }
                                        if(x == livroid.length){
                                            if(emprestimoIdAtt[0] == [""]){
                                                emprestimoIdAtt[0] = emprestimoPago._id;
                                            }else{
                                                emprestimoIdAtt.push(emprestimoPago._id);
                                            }
                                        }else{
                                            if(emprestimoIdExclui[0] == [""]){
                                                emprestimoIdExclui[0] = emprestimoPago._id;
                                            }else{
                                                for(let r = 0; r < emprestimoIdExclui.length; r++){
                                                    if(emprestimoIdExclui[r] == emprestimoPago._id){
                                                        validaexclui = 1;
                                                    }
                                                }
                                                if(validaexclui == 0){
                                                    emprestimoIdExclui.push(emprestimoPago._id);
                                                }
                                            }
                                        }
                                    }
                                   
                                }else{
                                    validacao = true;
                                }
                            
                            }
                            let emprestimoIdExcluiFinal:[any] = [""];
                            let o=0;
                            for(let i = 0; i < emprestimoIdExclui.length; i++){
                                for(let r = 0; r < emprestimoIdAtt.length; r++){
                                    if(emprestimoIdExclui[i] == emprestimoIdAtt[r]){
                                        o=1;
                                        
                                    }
                                } 
                                if(o==0){
                                    if(emprestimoIdExcluiFinal[0] == ''){
                                        emprestimoIdExcluiFinal[0] = emprestimoIdExclui[i];
                                    }else{
                                        emprestimoIdExcluiFinal.push(emprestimoIdExclui[i]);
                                    }
                                    
                                }
                                o=0; 
                            }
                            userAux.emprestimos = [];
                            const emprestimosAtt:[any] = [""];
                            let y = 0;
                            if(obj.emprestimos.length == livroid.length){
                                y = 1;
                            }
                            if(y == 0){
                                for(let i = 0; i < emprestimoIdAtt.length; i++){
                                    emprestimosAtt[i] = await EmprestimoSchema.findById(emprestimoIdAtt[i]);
                                }
                                if(emprestimoIdAtt.length > 0){
                                    for(let i = 0; i < emprestimosAtt.length; i++){
                                        userAux.emprestimos.push(emprestimosAtt[i]);
                                    }
                                }else{
                                    userAux.emprestimos = emprestimosAtt;
                                }
                            }
                            const emprestimosExclui:[any] = [""];
                            if(emprestimoIdExcluiFinal.length > 0){
                                for(let i = 0; i < emprestimoIdExcluiFinal.length; i++){
                                    emprestimosExclui[i] = await EmprestimoSchema.findById(emprestimoIdExcluiFinal[i]);
                                }
                            }
                            if(emprestimosExclui.length > 0){
                                for(let i = 0; i < emprestimosExclui.length; i++){
                                   await EmprestimoSchema.deleteOne(emprestimosExclui[i]);
                                }
                            }
                            
                            await UsuarioSchema.updateOne(obj, userAux);
                            
                            
                        response.status(200).json({message:"Devolução completa!"});
                    }else{ 
                        response.status(400).json({message:"Nenhum titulo inserido!"});
                    }
                
                }else{
                    response.status(400).json({message:"Nenhum empréstimo pendente!"});
                }
            }else{
                response.status(400).json({message:"Você não tem permissão!"});
            }
            
        } catch(error){
            response.status(400).json(error);
        }
    }

    async emprestimo(request: Request, response: Response){
        try{
            const obj : any= await auth.autenticacaoUsuario();
            if(obj != null){
                let control = true;
                const devolucao:[any] = obj.emprestimos;
                let data = new Date(Date.now());
                for(let i = 0; i < devolucao.length; i++){
                    let devolucaoAuth:any = await EmprestimoSchema.findById(devolucao[i]);
                    if(devolucaoAuth != null){
                        if(devolucaoAuth.dataDevolucao < data){
                            control = false;
                        }
                    }
                    
                }
                if(control == true){

                    const titulo:[any] = request.body;
                    const tituloString:[String] = [""];
                    for(let i = 0; i < titulo.length; i++){
                        tituloString[i] = titulo[i].titulo;
                    }
                    const livros:[any] = [""];
                    for(let i = 0; i < tituloString.length; i++){
                        livros [i]= await LivroSchema.findOne({titulo : tituloString[i]});
                    }
                    for(let i = 0; i < livros.length; i++){
                        if(livros[i] == null){
                            control = false;
                        }
                    }
                    if(control == true){
                        for(let i = 0; i < livros.length; i++){
                            if(livros[i].emprestado == true){
                                control = false;
                            }
                        }
                        if(control == true){
                            const emprestimo : [any] = [""];
                            for(let i = 0; i < livros.length; i++){
                                emprestimo[i] = await EmprestimoSchema.create({
                                    "dataEmprestimo": new Date(Date.now()),
                                    "dataDevolucao": new Date(Date.now()+88888888),
                                    "livro":livros[i]
                                });
                            }
                            if(emprestimo != null){
                                const livro1 : [any] = [""];
                                const num = tituloString.length;
                                for(let i = 0; i < num; i++){
                                    livro1[i] = await LivroSchema.find({_id : livros[i]._id});
                                }   
                                for(let i = 0; i < num; i++){
                                    await LivroSchema.updateMany({emprestado:false, _id:livro1[i]}, {$set:{emprestado:true}});
                                }
                                const userid = obj._id;
                                const userEmprestimo:any = await UsuarioSchema.findOne({_id : userid});
                                if(userEmprestimo.emprestimos.length > 0){
                                    for(let i = 0; i < livros.length; i++){
                                        userEmprestimo.emprestimos.push(emprestimo[i]);
                                    }
                                }else{
                                    userEmprestimo.emprestimos = emprestimo;
                                }
                                await UsuarioSchema.updateOne(obj, userEmprestimo);
                                
                                response.status(200).json({message:"Empréstimo feito com sucesso!"});
                            }else{
                                response.status(400).json({message:"Ocorreu um erro!"});
                            }
                            
                        }else{
                            response.status(400).json({message:"Esse livro não está disponível!"});
                        }
                        
                    }else{
                        response.status(400).json({message:"Esse livro não existe!"});
                    }
                }else{
                    response.status(400).json({message:"Você tem uma devolução pendente!"});
                }
            }else{
                response.status(400).json({message:"Você não tem permissão!"});
            }
        }catch(error: any){
            response.status(400).json(error);
        }
    }

}

export {EmprestimoController};
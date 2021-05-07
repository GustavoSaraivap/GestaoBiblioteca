import { Router, Request, Response } from "express";
import { FuncionarioController } from "../controllers/FuncionarioController";
import {UsuarioController} from "../controllers/UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();
const funcionarioController = new FuncionarioController();

//Usuario
router.get("/usuario/listar", usuarioController.listar);
router.get("/usuario/buscar/:id", usuarioController.buscarPorId);
router.post("/usuario/cadastrar", usuarioController.cadastrar);
router.get("/usuario/remover/:id", usuarioController.remover);
router.post("/usuario/alterar", usuarioController.alterar);
router.post("/usuario/login", usuarioController.loginUsuario);
router.get("/usuario/logout", usuarioController.logoutUsuario);
router.post("/usuario/emprestar", usuarioController.emprestarLivro);
router.post("/usuario/devolver", usuarioController.devolverLivro);

//Funcionario
router.get("/funcionario/listar", funcionarioController.listar);
router.get("/funcionario/buscar/:id", funcionarioController.buscarPorId);
router.post("/funcionario/cadastrar", funcionarioController.cadastrar);
router.get("/funcionario/remover/:id", funcionarioController.remover);
router.post("/funcionario/alterar", funcionarioController.alterar);
router.post("/funcionario/login", funcionarioController.loginFuncionario);
router.get("/funcionario/logout", funcionarioController.logoutFuncionario);


export {router};
import { Router, Request, Response, response } from "express";
import { FuncionarioController } from "../controllers/FuncionarioController";
import { LivroController } from "../controllers/LivroController";
import {UsuarioController} from "../controllers/UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();
const funcionarioController = new FuncionarioController();
const livroController = new LivroController();

//Usuario
router.get("/usuario/listar", usuarioController.listar);
router.get("/usuario/buscar/:id", usuarioController.buscarPorId);
router.post("/usuario/cadastrar", usuarioController.cadastrar);
router.get("/usuario/remover/:id", usuarioController.remover);
router.post("/usuario/alterar", usuarioController.alterar);
router.post("/usuario/login", usuarioController.loginUsuario);
router.get("/usuario/logout", usuarioController.logoutUsuario);

//Funcionario
router.get("/funcionario/listar", funcionarioController.listar);
router.get("/funcionario/buscar/:id", funcionarioController.buscarPorId);
router.post("/funcionario/cadastrar", funcionarioController.cadastrar);
router.get("/funcionario/remover/:id", funcionarioController.remover);
router.post("/funcionario/alterar", funcionarioController.alterar);
router.post("/funcionario/login", funcionarioController.loginFuncionario);
router.get("/funcionario/logout", funcionarioController.logoutFuncionario);

//Livro
router.get("/livro/listar", livroController.listar);
router.get("/livro/buscar/:title", livroController.buscarPorTitulo);
router.post("/livro/cadastrar", livroController.cadastrar);
router.get("/livro/remover/:id", livroController.remover);
router.post("/livro/alterar", livroController.alterar);

export {router};
import { Router, Request, Response } from "express";
import {UsuarioController} from "../controllers/UsuarioController";

const router = Router();
const usuarioController = new UsuarioController();

router.get("/usuario/listar", usuarioController.listar);
router.get("/usuario/buscar/:id", usuarioController.buscarPorId);
router.post("/usuario/cadastrar", usuarioController.cadastrar);
router.get("/usuario/remover/:id", usuarioController.remover);
router.post("/usuario/alterar", usuarioController.alterar);
router.post("/usuario/login", usuarioController.login);
router.get("/usuario/logout", usuarioController.logout);
export {router};
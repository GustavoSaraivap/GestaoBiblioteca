import { Router, Request, Response } from "express";
import {UsuarioController} from "../controllers/UsuarioController"

const router = Router();
const usuarioController = new UsuarioController();

router.get("/usuario/listar", usuarioController.listar);
router.get("/usuario/listar/:id", usuarioController.buscarPorId);
router.post("/usuario/cadastrar", usuarioController.cadastrar);



export {router};
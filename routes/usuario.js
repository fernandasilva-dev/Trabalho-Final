import express from "express"
import UsuarioController from "../controllers/UsuarioController.js";
import Usuario from "../models/Usuario.js";

const router = express.Router()

router.get('/', UsuarioController.index)

router.get('/cadastro', UsuarioController.cadastrar)

router.post('/salvar', UsuarioController.salvar)

export default router
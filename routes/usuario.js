import express from "express"
import UsuarioController from "../controllers/UsuarioController.js";
import logado from '../config/regras.js'

const router = express.Router()

router.get('/perfil', logado, UsuarioController.perfil)

router.get('/cadastro', UsuarioController.cadastrar)

router.post('/salvar', UsuarioController.salvar)

router.get('/login', UsuarioController.login)

router.post('/logar', UsuarioController.logar)

router.get('/logout', UsuarioController.logout)

router.post('/editar', UsuarioController.editar)

router.post('/alterar_senha', UsuarioController.alterar_senha)

router.get('/relatorio', UsuarioController.relatorio)

export default router
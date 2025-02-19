import express from 'express'
const router = express.Router()
import CategoriaController from '../controllers/CategoriaController.js'
import logado from '../config/regras.js'

router.get('/', CategoriaController.index)
router.get('/cadastro', logado,  CategoriaController.cadastrar)
router.post('/salvar', CategoriaController.salvar)
router.get('/editar/:id', logado, CategoriaController.editar)
router.post('/atualizar/:id', logado, CategoriaController.atualizar)
router.get('/excluir/:id', logado, CategoriaController.excluir)  

export default router
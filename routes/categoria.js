import express from 'express'
const router = express.Router()
import CategoriaController from '../controllers/CategoriaController.js'

router.get('/', CategoriaController.index)
router.get('/cadastro', CategoriaController.cadastrar)
router.post('/salvar', CategoriaController.salvar)
router.get('/editar/:id', CategoriaController.editar)
router.post('/atualizar/:id', CategoriaController.atualizar)
router.get('/excluir/:id', CategoriaController.excluir)  

export default router
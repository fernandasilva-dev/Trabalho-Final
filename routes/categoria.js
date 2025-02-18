import express from 'express'
const router = express.Router()
import CategoriaController from '../controllers/CategoriaController.js'

router.get('/', CategoriaController.index)
router.get('/cadastro', CategoriaController.cadastrar)
router.post('/salvar', CategoriaController.salvar)

export default router
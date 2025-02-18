import express from 'express'
const router = express.Router()
import ReceitaController from '../controllers/ReceitaController.js'

router.get('/', ReceitaController.index)
router.get('/cadastro', ReceitaController.cadastrar)
router.post('/salvar', ReceitaController.salvar)

export default router
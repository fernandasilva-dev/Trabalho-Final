import express from 'express'
const router = express.Router()
import DespesaController from '../controllers/DespesaController.js'

router.get('/', DespesaController.index)
router.get('/cadastro', DespesaController.cadastrar)
router.post('/salvar', DespesaController.salvar)

export default router
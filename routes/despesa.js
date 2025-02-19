import express from 'express'
const router = express.Router()
import DespesaController from '../controllers/DespesaController.js'

router.get('/', DespesaController.index)
router.get('/cadastro', DespesaController.cadastrar)
router.post('/salvar', DespesaController.salvar)
router.get('/editar/:id', DespesaController.editar)
router.post('/atualizar/:id', DespesaController.atualizar)
router.get('/excluir/:id', DespesaController.excluir)   

export default router
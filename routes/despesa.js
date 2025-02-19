import express from 'express'
const router = express.Router()
import DespesaController from '../controllers/DespesaController.js'
import logado from '../config/regras.js'

router.get('/', DespesaController.index)
router.get('/cadastro', logado, DespesaController.cadastrar)
router.post('/salvar', DespesaController.salvar)
router.get('/editar/:id', logado, DespesaController.editar)
router.post('/atualizar/:id', DespesaController.atualizar)
router.get('/excluir/:id', logado, DespesaController.excluir)   

export default router
import express from 'express'
const router = express.Router()
import ReceitaController from '../controllers/ReceitaController.js'
import logado from '../config/regras.js'

router.get('/', ReceitaController.index)
router.get('/cadastro', logado, ReceitaController.cadastrar)
router.post('/salvar', ReceitaController.salvar)
router.get('/editar/:id', logado, ReceitaController.editar)
router.post('/atualizar/:id', ReceitaController.atualizar)
router.get('/excluir/:id', logado, ReceitaController.excluir);


export default router
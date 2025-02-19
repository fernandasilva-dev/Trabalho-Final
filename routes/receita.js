import express from 'express'
const router = express.Router()
import ReceitaController from '../controllers/ReceitaController.js'

router.get('/', ReceitaController.index)
router.get('/cadastro', ReceitaController.cadastrar)
router.post('/salvar', ReceitaController.salvar)
router.get('/editar/:id', ReceitaController.editar)
router.post('/atualizar/:id', ReceitaController.atualizar)
router.get('/excluir/:id', ReceitaController.excluir);


export default router
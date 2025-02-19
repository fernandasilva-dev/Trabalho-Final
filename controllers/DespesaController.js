import Despesa from '../models/Despesa.js'
import Categoria from '../models/Categoria.js'

class DespesaController {
    index = async (req, res) => {
        let despesas = await Despesa.findAll({ include: 'categoria' })
        res.render('despesas/index', { despesas })
    }

    cadastrar = async (req, res) => {
        let categorias = await Categoria.findAll() // Busca todas as categorias do banco
        res.render('despesas/cadastro', { categorias }) // Passa as categorias para a view
    }

    salvar = async (req, res) => {
        try {
            console.log("Dados recebidos:", req.body) 
    
            let despesa = {
                descricao: req.body.descricao,
                valor: req.body.valor,
                categoria_id: parseInt(req.body.categoria_id),
            }
    
            await Despesa.create(despesa)
            console.log("Despesa cadastrada com sucesso!")
            res.redirect("/despesa")
        } catch (error) {
            console.error("Erro ao cadastrar despesa:", error)
            res.status(500).send("Erro ao salvar despesa")
        }
    }
}

export default new DespesaController()

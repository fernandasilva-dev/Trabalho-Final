import Despesa from '../models/Despesa.js'
import Categoria from '../models/Categoria.js'

class DespesaController {
    index = async (req, res) => {
        //let despesas = await Despesa.findAll({ include: 'categoria' })

        if (!req.user) {
            return res.status(401).send("Usuário não autenticado!")
        }
        let despesas = await Despesa.findAll({
            where: { usuario_id: req.user.id },
            include: [{ model: Categoria, as: 'categoria' }]
        })

        let totalDespesas = await Despesa.sum('valor', {
            where: { usuario_id: req.user.id }
        });
        res.render('despesas/index', { despesas: despesas, totalDespesas: totalDespesas })
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
                usuario_id: req.user.id
            }

            await Despesa.create(despesa)
            console.log("Despesa cadastrada com sucesso!")
            res.redirect("/despesa")
        } catch (error) {
            console.error("Erro ao cadastrar despesa:", error)
            res.status(500).send("Erro ao salvar despesa")
        }
    }

    editar = async (req, res) => {
        let id = req.params.id
        let despesa = await Despesa.findOne({
            where: { id, usuario_id: req.user.id }
        })
        if (!despesa) {
            return res.status(404).send("Despesa não encontrada!")
        }
        let categorias = await Categoria.findAll()
        res.render('despesas/editar', { despesa, categorias })
    }

    atualizar = async (req, res) => {
        let id = req.params.id

        let despesa = await Despesa.findByPk(id)
        if (!despesa) {
            return res.status(404).send("Despesa não encontrada!")
        }

        await Despesa.update(
            {
                descricao: req.body.descricao,
                valor: req.body.valor,
                categoria_id: parseInt(req.body.categoria_id)
            },
            { where: { id, usuario_id: req.user.id } }
        )

        console.log(`Despesa atualizada com successo!`)
        res.redirect("/despesa")
    }

    excluir = async (req, res) => {
        let id = req.params.id

        let despesa = await Despesa.findOne({ where: { id, usuario_id: req.user.id } })
        if (!despesa) {
            return res.status(404).send("Despesa não encontrada!")
        }

        await Despesa.destroy({ where: { id, usuario_id: req.user.id } })

        console.log(`Despesa excluída com sucesso!`)
        res.redirect("/despesa")
    }
}

export default new DespesaController()

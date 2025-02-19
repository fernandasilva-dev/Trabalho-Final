import Categoria from '../models/Categoria.js';
import Receita from '../models/Receita.js'

class ReceitaController {
    index = async (req, res) => {
        if (!req.user) {
            return res.status(401).send("Usuário não autenticado!")
        }
        let receita = await Receita.findAll({
            where: { usuario_id: req.user.id },
            include: [{ model: Categoria, as: 'categoria' }]
        })
        let totalReceitas = await Receita.sum('valor', {
            where: { usuario_id: req.user.id }
        });
        res.render('receitas/index', { receitas: receita,totalReceitas: totalReceitas })
    }

    cadastrar = async (req, res) => {
        let categorias = await Categoria.findAll() // Busca todas as categorias do banco
        res.render('receitas/cadastro', { categorias })
    }

    salvar = function (req, res) {
        if (!req.user) {
            return res.status(401).send("Usuário não autenticado!");
        }

        let receita = {
            descricao: req.body.descricao,
            valor: req.body.valor,
            categoria_id: parseInt(req.body.categoria_id),
            usuario_id: req.user.id
        }

        Receita.create(receita).then(() => {
            console.log("Receita cadastrado com sucesso!!")
            res.redirect("/receita")
        })
    }

    editar = async (req, res) => {
        let id = req.params.id
        let receita = await Receita.findByPk(id)

        if (!receita) {
            return res.status(404).send("Receita não encontrada!")
        }
        let categorias = await Categoria.findAll()
        res.render('receitas/editar', { receita, categorias })
    }

    atualizar = async (req, res) => {
        let id = req.params.id

        let receita = await Receita.findByPk(id)
        if (!receita) {
            return res.status(404).send("Receita não encontrada!")
        }

        await Receita.update(
            {
                descricao: req.body.descricao,
                valor: req.body.valor,
                categoria_id: parseInt(req.body.categoria_id)

            },
            { where: { id } }
        )

        console.log(`Receita atualizada com successo!`)
        res.redirect("/receita")
    }

    excluir = async (req, res) => {
        let id = req.params.id

        let receita = await Receita.findByPk(id)
        if (!receita) {
            return res.status(404).send("Receita não encontrada!")
        }

        await Receita.destroy({ where: { id } })

        console.log(`Receita excluída com sucesso!`)
        res.redirect("/receita")
    }
}

export default new ReceitaController()
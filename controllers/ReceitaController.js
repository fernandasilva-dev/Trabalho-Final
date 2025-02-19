import Receita from '../models/Receita.js'

class ReceitaController {
    index = async (req, res) => {
        if (!req.user) {
            return res.status(401).send("Usuário não autenticado!")
        }
        let receita = await Receita.findAll({
            where: { usuario_id: req.user.id }
        })
        let totalReceitas = await Receita.sum('valor', {
            where: { usuario_id: req.user.id }
        });
        res.render('receitas/index', { receitas: receita,totalReceitas: totalReceitas })
    }

    cadastrar = (req, res) => {
        res.render('receitas/cadastro')
    }

    salvar = function (req, res) {
        if (!req.user) {
            return res.status(401).send("Usuário não autenticado!");
        }

        let receita = {
            descricao: req.body.descricao,
            valor: req.body.valor,
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

        res.render('receitas/editar', { receita })
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
                valor: req.body.valor
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
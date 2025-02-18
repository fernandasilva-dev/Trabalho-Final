import Receita from '../models/Receita.js'

class ReceitaController {
    index = async (req, res) => {
        let receita = await Receita.findAll()
        res.render('receitas/index', {receita: receita})
    }

    cadastrar = (req, res) => {
        res.render('receitas/cadastro')
    }

    salvar = function (req, res) {
        let receita = {
            descricao: req.body.descricao,
            valor: req.body.valor
        }

        Receita.create(receita).then(() => {
            console.log("Receita cadastrado com sucesso!!")
            res.redirect("/receita")
        })
    }
}

export default new ReceitaController()
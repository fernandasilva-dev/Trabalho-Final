import Despesa from '../models/Despesa.js'

class ReceitaController {
    index = async (req, res) => {
        let despesa = await Despesa.findAll()
        res.render('despesas/index', {despesa: despesa})
    }

    cadastrar = (req, res) => {
        res.render('despesas/cadastro')
    }

    salvar = function (req, res) {
        let despesa = {
            descricao: req.body.descricao,
            valor: req.body.valor
        }

        Despesa.create(despesa).then(() => {
            console.log("Despesa cadastrado com sucesso!!")
            res.redirect("/despesa")
        })
    }
}

export default new ReceitaController()
import Categoria from '../models/Categoria.js'

class CategoriaController {
    index = async (req, res) => {
        let categoria = await Categoria.findAll()
        res.render('categorias/index', {categoria: categoria})
    }

    cadastrar = (req, res) => {
        res.render('categorias/cadastro')
    }

    salvar = function (req, res) {
        let categoria = {
            nome: req.body.nome,
        }

        Categoria.create(categoria).then(() => {
            console.log("Categoria cadastrado com sucesso!!")
            res.redirect("/categoria")
        })
    }
}

export default new CategoriaController()
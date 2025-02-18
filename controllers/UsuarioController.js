import Usuario from '../models/Usuario.js'

class UsuarioController{
    index = async (req, res)=>{
        //let id = req.params.id
        //let user = await Usuario.findByPK(id)
        //let user = await Usuario.findAll({
        //    where:{
        //        id: id
        //    }
        //})
        //to do: buscar dados do usuario logado
        res.render('usuario/')
    }

    cadastrar = (req, res)=>{
        res.render('usuario/cadastro', {layout: false})
    }

    salvar = function(req,res){
        let usuario = {
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha,
            tipo: 1,
            status: 1
        }

        Usuario.create(usuario).then(()=>{
            console.log("Usuario cadastrado com sucesso!!")
            res.redirect("/")
        })
    }
}

export default new UsuarioController()
import Usuario from '../models/Usuario.js'
import Despesa from '../models/Despesa.js'
import Receita from '../models/Receita.js'
import passaport from 'passport'
import bcrypt from 'bcryptjs'

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

    salvar = async function(req,res){
        let email = req.body.email
        let password = req.body.senha
        const user = await Usuario.findOne({
            where:{
                email: email
            }
        })

        if(!user){
            const saltRounds = 10
            const senhaCriptografada = await bcrypt.hash(password, saltRounds)

            let usuario = {
                nome: req.body.nome,
                email: email,
                senha: senhaCriptografada,
                tipo: 1,
                status: 1
            }
    
            
            const novoUsuario = await Usuario.create(usuario)

            console.log("Usuario cadastrado com sucesso!!")
            req.flash('success_msg','Cadastrado realizado com sucesso! Faça login!')
            return res.redirect("login")
        }
        req.flash('error','Usuario já cadastrado!')
        return res.redirect("cadastro")
    }

    login = (req, res) => {
        res.render('usuario/login', {layout: false})
    }

    logar = (req, res, next) => {
        passaport.authenticate('local',{
            successRedirect: '/',
            failureRedirect: '/usuario/login',
            failureFlash: true
        })(req,res,next)
    }

    logout = (req, res, next) => {
        req.logout((erro) => {
            res.redirect('/usuario/login')
        })
    }

    async relatorio(req, res) {
        if (!req.user) {
            return res.status(401).send("Usuário não autenticado!")
        }

        let totalReceitas = await Receita.sum('valor', {
            where: { usuario_id: req.user.id }
        })

        let totalDespesas = await Despesa.sum('valor', {
            where: { usuario_id: req.user.id }
        })

        let saldoFinal = (totalReceitas || 0) - (totalDespesas || 0)

        res.render('usuario/relatorio', { 
            totalReceitas: totalReceitas || 0, 
            totalDespesas: totalDespesas || 0, 
            saldoFinal 
        })
    }
}

export default new UsuarioController()
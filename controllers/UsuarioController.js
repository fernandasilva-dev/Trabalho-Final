import Usuario from '../models/Usuario.js'
import Despesa from '../models/Despesa.js'
import Receita from '../models/Receita.js'
import passaport from 'passport'
import bcrypt from 'bcryptjs'

class UsuarioController{
    perfil = (req, res)=>{
        let nome = req.user.nome.split(" ")
        let primeiro_nome = nome[0]
        let usuario = {
            primeiro_nome: primeiro_nome,
            nome: req.user.nome,
            email: req.user.email
        }
        res.render('usuario/perfil', {usuario: usuario})
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

    editar = async (req, res) => {
        let nome = req.body.nome
        let email = req.body.email
        let id = req.user.id

        if(nome){
            await Usuario.update(
                {nome: nome},{
                where:{
                    id: id
                }
            })
        }
        if(email) {
            await Usuario.update(
                {email: email},{
                where:{
                    id: id
                }
            })
        }
        
        res.redirect('/usuario/perfil')
    }

    alterar_senha = async (req, res) => {
        let senha = req.body.senha
        let id = req.user.id
        
        const saltRounds = 10
        const senhaCriptografada = await bcrypt.hash(senha, saltRounds)
        await Usuario.update(
            {senha: senhaCriptografada},{
            where:{
                id: id
            }
        })
        
        res.redirect('/usuario/perfil')
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
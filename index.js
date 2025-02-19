import express from 'express';
const app = express();

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport';
import auth from './config/autenticacao.js'
import logado from './config/regras.js';
import dayjs from 'dayjs';
import Receita from './models/Receita.js';
import Despesa from './models/Despesa.js';
import Usuario from './models/Usuario.js';
auth(passport)

//Cofig. sessão e connect-flash
app.use(session({
    secret: '1n5t1tut0F3d3r4l',
    resave: true,
    saveUninitialized: false
}))
app.use(flash())

app.use((req, res, next)=>{
    res.locals.success_msg = req.flash('success_msg')
    res.locals.error_msg = req.flash('error_msg')
    res.locals.error = req.flash('error') || null
    next()
})

app.use(passport.initialize())
app.use(passport.session())

//CONFIGURAR O TEMPLATE PADRÃO
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'index',
    handlebars: allowInsecurePrototypeAccess(Handlebars),
    helpers: {
        formatDate: (date) => dayjs(date).format('DD/MM/YYYY') // Formato brasileiro
    }
}));
app.set('view engine', 'handlebars');

//CONFIGURAR O BODY PARSER PARA ENVIAR DADOS
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Pasta de Arquivos Estásticos
const __dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.static(path.join(__dirname, 'public')));


//ROTAS DO SISTEMA
app.get('/', logado, async (req, res) => {
    if(req.user.tipo == 0){
        let usuarios = await Usuario.findAll()
        return res.render('admin/principal', {usuarios: usuarios})
    }
    let receitas = await Receita.findAll({
        raw: true,
        where:{
            usuario_id: req.user.id
        }
    })
    let despesas = await Despesa.findAll({
        raw: true,
        where:{
            usuario_id: req.user.id
        }
    })

    let somaDes = 0
    despesas.forEach(despesa => {
        somaDes += despesa.valor
    });

    let somaRec = 0
    receitas.forEach(receita => {
        somaRec += receita.valor
    });

    let pl = somaRec - somaDes

    return res.render('usuario/principal',{
        receitas: receitas,
        despesas: despesas,
        somaDes: somaDes,
        somaRec: somaRec,
        pl: pl
    })
})

import usuario from './routes/usuario.js'
app.use('/usuario', usuario)

import receita from './routes/receita.js'
app.use('/receita', receita)

import despesa from './routes/despesa.js'
app.use('/despesa', despesa)

app.listen(3200, () => console.log('Servidor Rodando em http://localhost:3200'))

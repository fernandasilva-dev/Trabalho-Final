import express from 'express';
const app = express();

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import dayjs from 'dayjs';
/*import session from 'express-session'
import flash from 'connect-flash'
import passport from 'passport';
import auth from './config/autenticacao.js'*/

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
app.get('/', (req, res) => {
    res.render('admin/principal')
})

import usuario from './routes/usuario.js'
app.use('/usuario', usuario)

import receita from './routes/receita.js'
app.use('/receita', receita)



app.listen(3200, () => console.log('Servidor Rodando em http://localhost:3200'))

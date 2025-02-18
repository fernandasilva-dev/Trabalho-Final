import express from 'express';
const app = express();

import handlebars from "express-handlebars";
import Handlebars from "handlebars";
import bodyParser from "body-parser";
import path from "path";
import { fileURLToPath } from 'url';
<<<<<<< HEAD
import { allowInsecurePrototypeAccess} from "@handlebars/allow-prototype-access";
import session from 'express-session'
=======
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
/*import session from 'express-session'
>>>>>>> 1f70d1eb8f3ee6cb6a7251a885e0856954c1c231
import flash from 'connect-flash'
import passport from 'passport';
import auth from './config/autenticacao.js'

//CONFIGURAR O TEMPLATE PADRÃO
app.engine('handlebars', handlebars.engine({
    defaultLayout: 'index',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
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

app.listen(3200, () => console.log('Servidor Rodando em http://localhost:3200'))

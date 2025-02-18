import banco from '../config/banco.js'

const Categoria = banco.sequelize.define('categorias', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: banco.Sequelize.STRING(400),
    }
       
})

Categoria.sync()

export default Categoria
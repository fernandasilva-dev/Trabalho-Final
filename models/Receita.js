import banco from '../config/banco.js'
import Usuario from './Usuario.js'

const Receita = banco.sequelize.define('receitas', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao:{
        type: banco.Sequelize.STRING(400),
    },
    valor:{
        type: banco.Sequelize.FLOAT,
    }
    
})

Receita.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    constraint: true,
    as: 'usuario'
})

Receita.sync()

export default Receita
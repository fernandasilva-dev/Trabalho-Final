import banco from '../config/banco.js'
import Usuario from './Usuario.js'
import Categoria from './Categoria.js'

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
    },
    categoria_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Categoria,
            key: 'id'
        }
    }
})

Receita.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    constraint: true,
    as: 'usuario'
})

Receita.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
    constraint: true,
    as: 'categoria'
})


Receita.sync()

export default Receita
import banco from '../config/banco.js'
import Usuario from './Usuario.js'

const Categoria = banco.sequelize.define('categorias', {
    id:{
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: banco.Sequelize.STRING(400),
    },
    usuario_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
    }
       
})

Categoria.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    constraint: true,
    as: 'usuario'
})

Categoria.sync()

export default Categoria
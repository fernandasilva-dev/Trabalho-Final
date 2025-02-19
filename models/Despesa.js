import banco from '../config/banco.js'
import Usuario from './Usuario.js'
import Categoria from './Categoria.js'

const Despesa = banco.sequelize.define('despesas', {
    id: {
        type: banco.Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    descricao: {
        type: banco.Sequelize.STRING(400),
    },
    valor: {
        type: banco.Sequelize.FLOAT,
    },
    usuario_id: {
        type: banco.Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'id'
        }
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

Despesa.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    constraint: true,
    as: 'usuario'
})

Despesa.belongsTo(Categoria, {
    foreignKey: 'categoria_id',
    constraint: true,
    as: 'categoria'
})

Despesa.sync()

export default Despesa
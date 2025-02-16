import banco from '../config/banco.js'

const Despesa = banco.sequelize.define('despesas', {
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

Despesa.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    constraint: true,
    as: 'usuario'
})

Despesa.sync()

export default Despesa
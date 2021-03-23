const {Schema, model} = require('mongoose')

const Rol = Schema({
    rol: {
        type: String,
        required: [true, 'El rol es obligatirio']
    }
})

module.exports = model('Role', Rol);
const Role = require('../models/Rol');
const Usuario = require('../models/usuario')

const RolValidator = async rol => {
    const existRol = await Role.findOne({rol});
    if (!existRol) {
        throw new Error("El Rol no esta definido en la base de datos");
    }
}

const EmailValidator = async correo => {
    const existEmail = await Usuario.findOne({correo});
    if (existEmail) {
        throw new Error('El Email ya existe')
    }
}
module.exports = {
    RolValidator,
    EmailValidator
}
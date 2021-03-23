const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const {generateJWT} = require('../helpers/JWT')
const loginUser = async (req, res   = Response) => {
    try {
        const { correo, password } = req.body;
        //veriificar si existe el usuario
        const usuario = await Usuario.findOne({ correo })
        console.log(usuario)
        if (!usuario) {
            returnBadRequest(res, 'Usuario no Encontrado')
        }
        //verificar el estado del usuario
        if (!usuario.estado) {
            returnBadRequest(res, 'Usuario no Autorizado')

        }
        //commparar las contrasenhas
        let comparer = bcryptjs.compareSync(password, usuario.password)
        if (comparer) {
            returnBadRequest(res, 'Contrasenhas no coinciden')

        }
        //generar JWT
        const token = await generateJWT(usuario._id);

        res.json({
            usuario, token
        })

    } catch (e) {
        console.log(e);
        res.apply.status(500).json({
            msg: 'Ocurrio un error en el servidor'
        })
    }
}

const returnBadRequest = (res = Response, msg) => {
   return res.status(400).json({
        msg
    })
}

module.exports = { loginUser }
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const {response, request} = require('express')
const {generateJWT} = require('../helpers/JWT')
const { googleVerify } = require('../helpers/GoogleVerify')

const loginUser = async (req, res   = response) => {
    try {
        const { correo, password } = req.body;
        //veriificar si existe el usuario
        const usuario = await Usuario.findOne({ correo })
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

const loginGoogle = async (req = request, res = response) => {


    try {
        const {id_token} = req.body;
        const {nombre, correo, img} = await googleVerify(id_token)

        let user = await Usuario.findOne({correo})
        if (!user) {
            const data = {
                nombre,
                correo,
                password: ':p',
                rol: 'USER',
                estado: true,
                google: true
            }

            user = new Usuario(data);
            await user.save();
        }

        if (!user.estado) {
            res.status(401).json({
                msg: 'no autorizado, hable con el administrador'
            })
        }
        const token = await generateJWT(user._id);

        res.status(200).json({
            msg: 'Usuario autenticado con exito', token
        })
    } catch (e) {
        res.status(500).json({
            msg:  'Token de google no valido'
        })
    }
}

const returnBadRequest = (res = response, msg) => {
   return res.status(400).json({
        msg
    })
}

module.exports = { loginUser, loginGoogle }
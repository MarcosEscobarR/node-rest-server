const Jwt = require('jsonwebtoken')
const Usuario = require('../models/usuario')

const validarJwt = async (req=Request, res = Response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            msg: 'No Autorizado'
        })
    }

    try{
        const {uid} =  Jwt.verify(token, process.env.secretPrivateKey)
        req.usuario = await Usuario.findById(uid);
        next();
    } catch (e) {
        console.log(e)
        res.status(401).json({
            msg: 'Error de token'
        })
    }
}

module.exports = {validarJwt}
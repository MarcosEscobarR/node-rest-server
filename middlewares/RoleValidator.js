const {response} = require('express')
const roleValidator = ( req, res=response, next) => {
    if (!req.usuario) {
        return  res.status(500).toJSON({
            msg: 'usuario aun no existe al hacer la verificacion'
        })
    }

    console.log(req.usuario)
    const {rol} = req.usuario;
    if (rol !== 'ADMIN') {
       return  res.status(401).toJSON({
            msg: 'NO AUTORIZADO'
        })
    }
    next()
}

module.exports = {roleValidator}
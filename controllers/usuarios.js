const {Response} = require('express')
const Usuario = require('../models/usuario')
const {validationResult} = require("express-validator");
const bcrypt = require('bcryptjs')

const usuariosGet = async (req = Request, res = Response) => {
    const {pageIndex = 0, pageSize = 5} = req.query;
    const usaurios = await Usuario
    .find()
    .skip(Number(pageIndex))
    .limit(Number(pageSize));

    const count = await Usuario.count()
    res.json({
        msg: 'hola desde el Get',
        usaurios, count
    });
}
const usuariosPost = async (req, res = Response) => {
    const {nombre, correo, password, rol} = req.body
    const usuario = new Usuario({nombre, correo, password, rol});

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(salt);

    await usuario.save();
    res.json({
        msg: 'hola desde el Post',
        usuario
    })
}
const usuariosPut = async (req, res = Response) => {
    const {id, password} = req.params
    const usuario = await Usuario.findOne({id});

    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(salt);

    res.json({
        msg: 'hola desde el Put',
        usuario
    })
}
const usuariosDelete = (req, res = Response) => {
    res.json({
        msg: 'hola desde el delete',usuario: req.usuario
    })
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}
const { Router} = require('express')
const { check } = require('express-validator')
const { loginUser, loginGoogle} = require('../controllers/auth');
const { validators } = require('../middlewares/Validators');

const loginRouter = Router();

loginRouter.post('/login',[
    check('correo', 'El correo es obligtorio').isEmail(),
    check('password', 'la contrasenha es obligatioria').notEmpty(),
    validators
], loginUser)

loginRouter.post('/google', [
    check('id_token', 'El id_token es obligatorio').notEmpty(),
    validators
], loginGoogle)

module.exports = loginRouter

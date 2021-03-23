const { Router} = require('express')
const { check } = require('express-validator')
const { loginUser} = require('../controllers/auth');
const { validators } = require('../middlewares/Validators');

const loginRouter = Router();

loginRouter.post('/login',[
    check('correo', 'El correo es obligtorio').isEmail(),
    check('password', 'la contrasenha es obligatioria').notEmpty(),
    validators
], loginUser) 

module.exports = loginRouter

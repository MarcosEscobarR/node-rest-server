const {usuariosGet, usuariosDelete, usuariosPut, usuariosPost} = require("../controllers/usuarios");
const { Router } = require('express')
const {check} = require('express-validator');
const {validators} = require('../middlewares/Validators')
const {roleValidator} = require('../middlewares/RoleValidator')
const {RolValidator, EmailValidator} = require('../middlewares/UserValidator')
const {validarJwt} =require('../middlewares/validar-JWT')
const router = Router();

router.get('/', usuariosGet)

router.post('/', [
    check('correo', 'En correo no es valido').isEmail(),
    check('correo', ).custom(EmailValidator),
    check('nombre', 'En Nombre es obligatorio').notEmpty(),
    check('password', 'La contrasenha debe ser de mas de 6 caracteres').isLength({min: 6}),
    check('rol').custom(RolValidator),
    validators
], usuariosPost)
router.put('/:id', usuariosPut)
router.delete('/:id',
    validarJwt,
    roleValidator,
    usuariosDelete)


module.exports = router;
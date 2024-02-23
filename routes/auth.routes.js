const { Router } = require('express');
const { check } = require('express-validator');
const { login, register } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { existenteEmail, existeUserById } = require('../helpers/db-validators');

const router = Router();
router.post('/login',
    [
        check('email', 'El email no es un correo valido').isEmail(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        validarCampos
    ], login);

router.post(
    '/register', [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(existenteEmail),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('role').custom(isValidRole),
    validarCampos
], register);

module.exports = router;

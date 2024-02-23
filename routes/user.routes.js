const { Router } = require('express');
const { check } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { tieneRole } = require('../middlewares/validar-roles');
const { existeUserById } = require('../helpers/db-validators');

const {userDelete, userPut } = require('../controllers/user.controller');

const router = Router();

router.delete("/:id", [
    validarJWT,
    tieneRole('STUDENT_ROLE', 'TEACHER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUserById),
    validarCampos
], userDelete);

router.put("/:id", [
    validarJWT,
    tieneRole('STUDENT_ROLE', 'TEACHER_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUserById),
    validarCampos
], userPut);

module.exports = router;
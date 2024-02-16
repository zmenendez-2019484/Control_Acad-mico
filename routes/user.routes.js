const { Router } = require('express');
const { check, ExpressValidator } = require('express-validator');
const { validarJWT } = require('../middlewares/validar-jwt');
const { validarCampos } = require('../middlewares/validar-campos');
const { tieneRole } = require('../middlewares/validar-roles');
const { existenteEmail, existeUserById } = require('../helpers/db-validators');

const { userPost, userGet, getUserById, userDelete, userPut } = require('../controllers/user.controller');

const router = Router();

router.get("/", userGet);

router.get("/:id", [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUserById),
    validarCampos
], getUserById);

router.post(
    "/", [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser de más de 6 letras').isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    check('email').custom(existenteEmail),
    // check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('role').custom(isValidRole),
    validarCampos
], userPost);

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
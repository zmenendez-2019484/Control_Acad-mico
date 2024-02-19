const express = require('express');
const { Router } = require('express');
const { tieneRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { coursePost/*, courseGet, coursePut, courseDelete*/ } = require('../controllers/course.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.post('/', [
    validarJWT,
    tieneRole('TEACHER_ROLE'),
    check('name', 'Name is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('teacher', 'Teacher is required').not().isEmpty(),
    validarCampos
], coursePost);

module.exports = router;
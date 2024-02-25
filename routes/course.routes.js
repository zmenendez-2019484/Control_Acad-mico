const express = require('express');
const { Router } = require('express');
const { tieneRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { asignarCursoAEstudiante, cursosPorEstudiante } = require('../controllers/course.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

router.get('/students/:userId/courses', [
    validarJWT,
    tieneRole('STUDENT_ROLE'),
    cursosPorEstudiante
]);

router.post('/students/:userId/courses/:courseId', [
    validarJWT,
    tieneRole('STUDENT_ROLE'),
    check('userId', 'El ID del usuario es requerido').notEmpty(),
    check('courseId', 'El ID del curso es requerido').notEmpty(),
    validarCampos,
    asignarCursoAEstudiante
]);

module.exports = router;

const express = require('express');
const { Router } = require('express');
const { tieneRole } = require('../middlewares/validar-roles');
const { check } = require('express-validator');
const { asignarCursoAEstudiante, cursosPorEstudiante, deleteCourse, postCourse, putCourse
    , cursosDeProfesor } = require('../controllers/course.controller');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();
// alumnos
router.get('/students/:userId/courses', [
    validarJWT,
    tieneRole('STUDENT_ROLE'),
    cursosPorEstudiante
]);

router.post('/students/:userId/courses', [
    validarJWT,
    tieneRole('STUDENT_ROLE'),
    check('courseId', 'El ID del curso es requerido').notEmpty(),
    validarCampos,
    asignarCursoAEstudiante
]);



//profesores
router.post('/', [
    validarJWT,
    tieneRole('TEACHER_ROLE'),
    validarCampos,
    postCourse
]);

router.put('/:courseId', [
    validarJWT,
    tieneRole('TEACHER_ROLE'),
    validarCampos,
    putCourse
]);

router.delete('/:courseId', [
    validarJWT,
    tieneRole('TEACHER_ROLE'),
    deleteCourse
]);

router.get('/teachers/:teacherId/courses', [
    validarJWT,
    tieneRole('TEACHER_ROLE'),
    cursosDeProfesor
]);

module.exports = router;

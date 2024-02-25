const Course = require('../models/curso');
const User = require('../models/user');
const { response, json } = require('express');
const jwt = require('jsonwebtoken');

const asignarCursoAEstudiante = async (req, res) => {
    try {
        const { userId, courseId } = req.params;
        const usuarioAutenticado = req.usuario;

        // Verificar si el usuario es el mismo que intenta asignar el curso
        if (usuarioAutenticado._id.toString() !== userId || usuarioAutenticado.role !== 'STUDENT_ROLE') {
            return res.status(403).json({
                msg: 'No tienes permiso para asignar este curso',
            });
        }

        // Contar las asignaciones existentes del alumno
        const existingAssignments = await UserHasCourse.countDocuments({ user: userId });

        // Verificar si el alumno ya está asignado a  3 cursos
        if (existingAssignments >= 3) {
            return res.status(400).json({
                msg: 'El alumno ya está asignado a  3 cursos',
            });
        }

        // Verificar si el alumno ya está asignado a este curso
        const existingAssignment = await UserHasCourse.findOne({ user: userId, course: courseId });
        if (existingAssignment) {
            return res.status(400).json({
                msg: 'El alumno ya está asignado a este curso',
            });
        }

        // Asignar el curso al alumno
        const asignacion = new UserHasCourse({ user: userId, course: courseId });
        await asignacion.save();

        res.status(200).json({
            msg: 'Curso asignado correctamente',
            asignacion,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};

const cursosPorEstudiante = async (req, res) => {
    try {
        const { userId } = req.params;
        const usuarioAutenticado = req.usuario;

        // Verificar si el usuario autenticado es el mismo que intenta ver los cursos
        if (usuarioAutenticado._id.toString() !== userId || usuarioAutenticado.role !== 'STUDENT_ROLE') {
            return res.status(403).json({
                msg: 'No tienes permiso para ver los cursos de este usuario',
            });
        }

        // Buscar las asignaciones del alumno
        const assignments = await UserHasCourse.find({ user: userId });

        // Extraer los IDs de los cursos
        const courseIds = assignments.map(assignment => assignment.course);

        // Buscar los detalles de los cursos
        const courses = await Course.find({ _id: { $in: courseIds } });

        res.status(200).json({
            msg: 'Cursos obtenidos correctamente',
            courses,
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Hable con el administrador',
        });
    }
};


module.exports = {
    asignarCursoAEstudiante,
    cursosPorEstudiante
};

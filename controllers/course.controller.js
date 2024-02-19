const Course = require('../models/curso');
const User = require('../models/user');
const { response, json } = require('express');
const jwt = require('jsonwebtoken');
const getCourses = async (req, res = response) => {
    try {
        
     } catch {
        console.log('Error al obtener los cursos:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });

    }
}
const coursePost = async (req, res) => {
    const { name, description, teacher } = req.body;

    // Verificar si todos los campos requeridos están presentes y no son nulos o vacíos
    if (!name || !description || !teacher) {
        return res.status(400).json({
            error: 'Todos los campos son requeridos'
        });
    }

    // Verificar si los campos requeridos no están vacíos
    if (name.trim() === '' || description.trim() === '' || teacher.trim() === '') {
        return res.status(400).json({
            error: 'Todos los campos deben tener contenido'
        });
    }

    try {
        // Verificar si el profesor existe en la base de datos
        const profesor = await User.findById(teacher);
        if (!profesor || profesor.role !== 'TEACHER_ROLE') {
            return res.status(400).json({
                error: 'El profesor proporcionado no existe o no es un profesor válido'
            });
        }

        // Si el profesor existe, crear y guardar el curso
        const course = new Course({ name, description, teacher });
        await course.save();

        res.status(201).json({
            course
        });
    } catch (error) {
        console.error('Error al guardar el curso:', error);
        res.status(500).json({
            error: 'Error interno del servidor'
        });
    }

}

module.exports = {
    coursePost,
    getCourses
};

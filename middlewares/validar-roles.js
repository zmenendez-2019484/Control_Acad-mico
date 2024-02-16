const { request, response } = require("express");
const { getMyRole } = require("../controllers/auth.controller");
const User = require('../models/user');

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => { // Marcar la función como async
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token primero",
            });
        }

        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`,
            });
        }





        if (getMyRole == req.usuario.role){
            return res.status(401).json({
                msg: 'No tienes permiso para realizar esta acción'
            });
        }



        // // Verificar si el usuario tiene permiso para editar el perfil basado en su rol
        // if (req.usuario.role === 'STUDENT_ROLE' && !req.params.id) {
        //     return res.status(401).json({
        //         msg: 'Los usuarios con rol de STUDENT_ROLE no tienen permiso para editar perfiles de otros usuarios'
        //     });
        // }

        // if (req.usuario.role === 'TEACHER_ROLE' && req.params.id) {
        //     try {
        //         // Obtener el usuario que se intenta editar
        //         const usuarioEditar = await User.findById(req.params.id);
        //         if (!usuarioEditar) {
        //             return res.status(404).json({
        //                 msg: 'Usuario no encontrado'
        //             });
        //         }
        //         // Verificar si el usuario a editar tiene el rol de STUDENT_ROLE
        //         if (usuarioEditar.role === 'STUDENT_ROLE') {
        //             return res.status(401).json({
        //                 msg: 'Los usuarios con rol de TEACHER_ROLE no tienen permiso para editar perfiles de usuarios con rol de STUDENT_ROLE'
        //             });
        //         }
        //     } catch (error) {
        //         console.log(error);
        //         return res.status(500).json({
        //             msg: 'Error al buscar el usuario a editar'
        //         });
        //     }
        // }

        next();
    };
}

module.exports = {
    tieneRole
}


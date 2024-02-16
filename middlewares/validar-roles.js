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

        next();
    };
}

module.exports = {
    tieneRole
}


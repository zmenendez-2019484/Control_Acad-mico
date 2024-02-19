const { request, response } = require("express");
const User = require('../models/user');

const tieneRole = (...roles) => {
    return async (req = request, res = response, next) => {
        if (!req.usuario) {
            return res.status(500).json({
                msg: "Se quiere verificar el role sin validar el token primero",
            });
        }

        // Verificar si el usuario tiene alguno de los roles permitidos
        if (!roles.includes(req.usuario.role)) {
            return res.status(401).json({
                msg: `El servicio requiere uno de estos roles ${roles}`,
            });
        }

        next();
    };
}

module.exports = {
    tieneRole
}


const jwt = require('jsonwebtoken');
const User = require('../models/user');

const validarJWT = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        const usuario = await User.findById(uid); // Esperar a que se resuelva la promesa
        if (!usuario) {
            return res.status(401).json({
                msg: 'Usuario no existe en DB'
            });
        }
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Usuario con estado false'
            });
        }
        req.usuario = usuario;
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }
}

module.exports = {
    validarJWT
}

const User = require('../models/user');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/generar-jwt');
const user = require('../models/user');




const login = async (req, res) => {
    // Agregar este console.log
    const { email, password } = req.body;
    console.log("Email recibido:", email); // Agregar este console.log
    console.log("Contraseña recibida:", password); // Agregar este console.log
    try {
        // Verificar si el email existe
        const usuario = await User.findOne({ email });
        const myRole = usuario.role;
        console.log("myRole:", myRole);
        
        if (!usuario) {
            return res.status(400).json({
                msg: 'El correo no está registrado'
            });
        }
        // Verificar si el usuario está activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario no existe en la base de datos'
            });
        }
        // Verificar la contraseña
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if (!validPassword) {
            return res.status(400).json({
                msg: 'La contraseña es incorrecta'
            });
        }
        // Generar el JWT
        const token = await generarJWT(usuario.id);


        res.status(200).json({
            msg: 'Inicio de sesión exitoso',
            usuario,
            token
        });
    } catch (error) {
        console.log("Error:", error); // Agregar este console.log
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

function getMyRole() {
    return myRole;
}

module.exports = {
    login,
    getMyRole
}

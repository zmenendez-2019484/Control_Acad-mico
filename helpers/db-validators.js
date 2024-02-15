const { User } = require('../models/user');

const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`El email ${email} ya fue registrado`);
    }
}

const existeUserById = async (id = '') => {
    const existeUsuario = await User.findOne({id});
    if (existeUsuario) {
        throw new Error(`El usuario con el ${id} no existe`);
    }
}

module.exports = {
    existenteEmail,
    existeUserById
}

const existenteEmail = async (email = '') => {
    const existeEmail = await User.findOne({ email });
    if (existeEmail) {
        throw new Error(`El correo ${email} ya está registrado`);
    }
}

const existeUserById = async (id= '') => {
    const existeUsuario = await User.findOne({ id });
    if (!existeUser) {
        throw new Error(`El id ${id} no existe`);
    }
}

module.exports = {
    existenteEmail,
    existeUserById
}
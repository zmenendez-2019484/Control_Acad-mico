const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userPost = async (req, res) => {
    const { name, email, password, role } = req.body;
    const usuario = new User({ name, email, password, role });

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

const getUserById = async (req, res) => {
    const { id } = req.params;
    const usuario = await User.findOne({ _id: id });

    res.status(200).json({
        usuario
    });
}

const userGet = async (req, res = response) => {
    const { limite, desde } = req.query;
    const query = { estado: true };

    const [total, usuarios] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
        usuarios
    });
}

const userDelete = async (req, res) => {
    try {
        const { id } = req.params;
        await User.findByIdAndUpdate(id, { estado: false });
        const usuario =  await User.findOne({ _id: id });
        const usuarioAutenticado = req.usuario;

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario no existe'
            });
        }
        res.status(200).json({
            msg: 'Usuario eliminado correctamente',
            usuario,
            usuarioAutenticado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

const userPut = async (req, res) => {
    const { id } = req.params;
    const { _id, name, password, ...resto } = req.body;

    await User.findByIdAndUpdate(id, resto);
    const usuario = await User.findOne({ _id: id });
    res.status(200).json({
        msg: 'Usuario actualizado correctamente',
        usuario
    });
}

module.exports = {
    userPost,
    userGet,
    getUserById,
    userDelete,
    userPut
}
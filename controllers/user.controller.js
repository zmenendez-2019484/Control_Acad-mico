const { response } = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/user');

const userPost = async (req, res) =>{
    const { name, email, password, role } = req.body;
    const usuario = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    await usuario.save();
    res.status(200).json({
        usuario
    });
}

module.exports = {
    userPost
}
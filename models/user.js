const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    estado: {
        type: Boolean,
        default: true
    },
    role: {
        type: String,
        default: 'STUDENT_ROLE',
        enum: ["STUDENT_ROLE", "TEACHER_ROLE"]
    }
});

userSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}
module.exports = mongoose.model('User', userSchema);
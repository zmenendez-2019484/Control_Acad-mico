const mongoose = require('mongoose');

const UserHasCourseSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  course: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Course',
    required: true
  },
  estado: {
    type: Boolean,
    default: true 
  }
});

module.exports = mongoose.model('UserHasCourse', UserHasCourseSchema);

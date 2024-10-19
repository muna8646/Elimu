const mongoose = require('mongoose');

const instructorSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  country: { type: String, required: true },
  idNumber: { type: String, required: true },
  school: { type: String, required: true },
  email: { type: String, required: true },
  approved: { type: Boolean, default: false },
});

const Instructor = mongoose.model('Instructor', instructorSchema);

module.exports = Instructor;

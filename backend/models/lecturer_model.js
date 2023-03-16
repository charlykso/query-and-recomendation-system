const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Lecturer = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    phone_no: { type: String, required: true },
    course_code: { type: [String], required: true },
    admin: { type: boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('lecturers', Lecturer)

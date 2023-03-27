const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const Lecturer = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    title: { type: String, required: true },
    gender: { type: String, required: true },
    email: { type: String, required: true },
    phoneNo: { type: String, required: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('lecturers', Lecturer)

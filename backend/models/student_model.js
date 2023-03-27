const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const Student = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    regNo: { type: String, required: false },
    gender: { type: String, required: false },
    level: { type: Number, required: true },
    admin: { type: Boolean, default: false },
  },
  { timestamps: true }
)

module.exports = mongoose.model('students', Student)

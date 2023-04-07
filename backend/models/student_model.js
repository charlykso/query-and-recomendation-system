const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const Student = new Schema(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phoneNo: { type: String, required: true },
    regNo: { type: String, required: false },
    gender: { type: String, required: false },
    level: { type: Number, required: true },
    role: { type: String, default: "User" },
  },
  { timestamps: true }
)


Student.statics.signup = async function(body) {
  const email = body.email
  const password = body.password
  //check if email or password is empty
  if (!email || !password) {
    throw Error('Email or Password is empty')
  }
  if (!validator.isEmail(email)) {
    throw Error('Email is not valid')
  }
  if (!validator.isStrongPassword(password)) {
    throw Error('Password not strong enough')
  }
  const exists = await this.findOne({email})
  if (exists) {
    throw Error('Email not available')
  }

  const salt = await bcrypt.genSalt(10)
  const harsh = await bcrypt.hash(password, salt)
  body.password = harsh
  const student = await this.create(body)

  return student
}

//static login method
Student.statics.login = async function(email, password) {
  if (!email || !password) {
    throw Error('All fields must be filled')
  }

  const student = await this.findOne({email})

  if (!student) {
    throw Error('Email not found')
  }

  const match = await bcrypt.compare(password, student.password)

  if (!match) {
    throw Error('Incorrect password')
  }

  return student
}

module.exports = mongoose.model('students', Student)

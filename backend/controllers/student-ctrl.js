const Student = require('../models/student_model')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const createToken = (student) => {
  return jwt.sign(
    {
      role: student.role,
      id: student._id,
      email: student.email,
      name: student.firstname + ' ' + student.lastname,
    },
    process.env.JWT_SECRET,
    { expiresIn: '100d' }
  )
}

login = async (req, res) => {
  const { email, password } = req.body

  try {
    const student = await Student.login(email, password)

    //create token
    const token = createToken(student)

    return res.status(200).json({ email, token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

createStudent = async (req, res) => {
  const body = req.body

  try {
    const student = await Student.signup(body)

    //create token
    const token = createToken(student)

    return res.status(201).json({ student, token })
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

updateStudent = async (req, res) => {
  const body = req.body
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'You need to provide data to update',
    })
  }

  const student = await Student.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  )

  if (!student) {
    return res.status(404).json({ error: 'No student found' })
  }
  return res.status(200).json(student)
}

deleteStudent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  const student = await Student.findOneAndDelete({ _id: id })
  if (!student) {
    return res.status(404).json({ error: 'No student found' })
  }
  return res.status(200).json(student)
}

getStudentById = async (req, res) => {
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  const student = await Student.findById({ _id: req.params.id }).populate(
    'events'
  )

  if (!student) {
    return res.status(404).json({ error: 'No student found' })
  }
  return res.status(200).json(student)
}

getStudents = async (req, res) => {
  try {
    const students = await Student.find({})
      .populate('events')
      .sort({ createdAt: -1 })

    return res.status(200).json(students)
  } catch (error) {
    return res.status(404).json({ error: error.message })
  }
}

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getStudents,
  login,
}

const Lecturer = require('../models/lecturer_model')
const mongoose = require('mongoose')

createLecturer = async (req, res) => {
  const body = req.body

  try {
    const lecturer = await Lecturer.create(body)
    return res.status(201).json(lecturer)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}

updateLecturer = async (req, res) => {
  const body = res.body
  const { id } = req.params

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'You need to provide a valid lecturer data',
    })
  }

  const lecturer = await Lecturer.findOneAndUpdate({ _id: req.params.id }, {
    ...body
  })
  if (!lecturer) {
    return res.status(404).json({ error: 'No lecturer found' })
  }
  return res.status(200).json(lecturer)
}

deleteLecturer = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  const lecturer = await Lecturer.findOneAndDelete({ id: req.params.id })
  if (!lecturer) {
    return res.status(404).json({ error: 'No lecturer found' })
  }
  return res.status(200).json(lecturer)
}

getLecturerById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  const lecturer = await Lecturer.findOne({ _id: req.params.id }) 
  
  if (!lecturer) {
    return res.status(404).json({ error: 'No lecturer found' })
  }
  return res.status(200).json(lecturer)
}

getLecturers = async (req, res) => {
  try {
    const lecturers = await Lecturer.find({}).sort({ createdAt: -1 })
    
    return res.status(200).json(lecturers)
  } catch (error) {
    return res.status(404).json({error: error.message})
  }
}

module.exports = {
  createLecturer,
  updateLecturer,
  deleteLecturer,
  getLecturerById,
  getLecturers,
}

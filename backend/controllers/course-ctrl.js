const Course = require('../models/course_model')
const mongoose = require('mongoose')

createCourse = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid data',
    })
  }

  try {
    const course = new Course(body)
    course.course_title = body.course_title
    course.level = body.level
    course.course_code = body.course_code
    course.lecturer_id = body.lecturer_id
    course.credict_unit = body.credict_unit

    const newecourse = await Course.create(course)

    return res.status(201).json(newecourse)
  } catch (error) {
    return res.status(400).json({ error: error.message })
  }
}


updateCourse = async (req, res) => {
  const body = req.body
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid data',
    })
  }
  const course = await Course.findOneAndUpdate(
    { _id: id },
    {
      ...body,
    }
  )
  if (!course) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(course)
}


deleteCourse = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  const course = await Course.findOneAndDelete({ id: req.params.id })
  if (!course) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(course)
}


getCourseById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' })
  }
  const course = await Course.findOne({ _id: id }).populate('lecturer_id')
  if (!course) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(course)
}


getAllCourses = async (req, res) => {
  try {
    const course = await Course.find({})
      .sort({ createdAt: -1 })
      .populate('lecturer_id')
    return res.status(200).json(course)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

getAllCoursesForLecturer = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' })
  }
  const lecturer_course = await Course.find({ lecturer_id: id })
    .populate('lecturer_id')

  if (!lecturer_course) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(lecturer_course)
}

module.exports = {
    createCourse,
    updateCourse,
    getAllCourses,
    getCourseById,
    deleteCourse,
    getAllCoursesForLecturer
}
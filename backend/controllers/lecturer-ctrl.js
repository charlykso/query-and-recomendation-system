const Lecturer = require('../models/lecturer_model')

createLecturer = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'You must provide a valid student data object',
    })
  }

  const lecturer = new Lecturer(body)

  if (!lecturer) {
    return res.status(400).json({ success: false, error: errorMessage })
  }

  Lecturer.save()
    .then(() => {
      return res.status(200).json({
        success: true,
        message: 'lecturer created successfully',
        id: lecturer._id,
      })
    })
    .catch((error) => {
      return res.status(400).json({
        error,
        message: 'Lecturer not created!',
      })
    })
}

updateLecturer = async (req, res) => {
  const body = res.body

  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'You need to provide a valid lecturer data',
    })
  }

  await Lecturer.findOne({ _id: req.params.id }, (err, lecturer) => {
    if (err) {
      return res.status(404).json({
        err,
        message: 'Lecturer not found',
      })
    }
    lecturer.firstname = body.firstname
    lecturer.lastname = body.lastname
    lecturer.email = body.email
    lecturer.phone_no = body.phone_no
    lecturer.course_code = body.course_code

    lecturer
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          message: 'Lecturer updated',
        })
      })
      .catch((error) => {
        return res.status(404).json({
          error,
          message: 'Lecturer not updated!',
        })
      })
  })
}

deleteLecturer = async (req, res) => {
  await Lecturer.findOneAndDelete({ id: req.params.id }, (err, lecturer) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      })
    }

    if (!lecturer) {
      return res.status(404).json({
        success: false,
        message: 'Lecturer not found',
      })
    }

    return res
      .status(200)
      .json({
        success: true,
        data: lecturer,
      })
      .clone()
      .catch((error) => {
        console.log(error)
      })
  })
}

getLecturerById = async (req, res) => {
  await Lecturer.findOne({ _id: req.params.id }, (error, lecturer) => {
    if (error) {
      return res.status(400).json({
        success: false,
        message: err,
      })
    }

    if (!lecturer) {
      return res.status(404).json({
        success: false,
        message: 'Lecturer not found',
      })
    }

    return res
      .status(200)
      .json({
        success: true,
        data: lecturer,
      })
      .clone()
      .catch((err) => {
        console.log(err)
      })
  })
}

getLecturers = async (req, res) => {
  await Lecturer.find({}, (error, lecturers) => {
    if (error) {
      return res.status(400).json({ success: false, message: error.message })
    }

    if (!lecturers.length) {
      return res
        .status(404)
        .json({ success: false, message: 'Lecturers not found.' })
    }

    return res
      .status(200)
      .json({
        success: true,
        data: lecturers,
      })
      .clone()
      .catch((err) => {
        console.log(err)
      })
  })
}

module.exports = {
  createLecturer,
  updateLecturer,
  deleteLecturer,
  getLecturerById,
  getLecturers,
}

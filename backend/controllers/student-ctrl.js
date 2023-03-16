const Student = require('../models/student_model')

createStudent = (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid student data object',
    })
  }

  const student = new Student(body)

  if (!student) {
    return res.status(400).json({
      success: false,
      error: err,
    })
  }

  student
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: student._id,
        message: 'Student created',
      })
    })
    .catch((error) => {
      error, (message = 'Student not created')
    })
}

updateStudent = async (req, res) => {
  const body = req.body

  if (!body) {
    return res.status(400).json({
      success: false,
      message: 'You need to provide student to update',
    })
  }

  await Student.findOne({ _id: req.params.id }, (err, student) => {
    if (err) {
      return res.status(400).json({
        err,
        message: 'Student not found!',
      })
    }
    student.firstname = body.firstname
    student.lastname = body.lastname
    student.email = body.email
    student.phoneNo = body.phone_no
    student.level = body.level
    student.regNo = body.reg_no

    student
      .save()
      .then(() => {
        return res.status(200).json({
          success: true,
          id: student._id,
          message: 'Student updated',
        })
      })
      .catch((err) => {
        return res.status(400).json({
          err,
          message: 'Student not updated',
        })
      })
  })
}

deleteStudent = async (req, res) => {
  await Student.findOneAndDelete({ id: req.params.id }, (err, student) => {
    if (err) {
      return res.status(400).json({
        success: false,
        error: err,
      })
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        message: 'Student not found',
      })
    }

    return res
      .status(200)
      .json({
        success: true,
        data: student,
      })
      .clone()
      .catch((err) => {
        console.log(err)
      })
  })
}

getStudentById = async (req, res) => {
  await Student.findOne({ _id: req.params.id }, (err, student) => {
    if (err) {
      return res.status(400).json({
        success: false,
        message: err,
      })
    }

    if (!student) {
      return res.status(404).json({
        success: false,
        error: 'Student not found',
      })
    }

    return res
      .status(200)
      .json({
        success: true,
        data: student,
      })
      .clone()
      .catch((error) => console.log(error))
  })
}

getStudents = async (req, res) => {
  await Student.find({}, (err, students) => {
    if (err) {
      return res.status(400).json({ success: false, error: err })
    }
    if (!students.length) {
      return res
        .status(404)
        .json({ success: false, error: 'Student not found' })
    }

    return res.status(200).json({ success: true, data: students })
  })
    .clone()
    .catch((error) => console.log(error))
}

module.exports = {
  createStudent,
  updateStudent,
  deleteStudent,
  getStudentById,
  getStudents,
}

// app.get("/getStudents", async (req, res) => {
//     const db = client.db()
//     const count = await db.collection("movies").estimatedDocumentCount();
//     console.log(count);

//     return res.status(200).json({ success: true, data: count })
// })

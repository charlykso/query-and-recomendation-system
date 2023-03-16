const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {ObjectId} = mongoose.Schema;

const Event = new Schema(
  {
    student_id: { type: ObjectId, ref: 'students', required: true },
    lecturer_id: { type: ObjectId, ref: 'lecturers', required: true },
    description: { type: String, required: true },
    explanation: { type: String, required: true },
    course_code: { type: String, required: true },
    type: { type: String, required: true },
  },
  { timestamps: true }
)

module.exports = mongoose.model('events', Event)

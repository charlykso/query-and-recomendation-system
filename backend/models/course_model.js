const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { ObjectId } = mongoose.Schema

const Course = new Schema(
  {
      course_title: { type: String, required: true },
      credict_unit: { type: Number, required: true },
      course_code: { type: String, required: true },
      level: { type: Number, required: true },
      lecturer_id: { type: [ObjectId], ref: 'lecturers' },
  },
  { timestamps: true }
)

module.exports = mongoose.model('courses', Course)

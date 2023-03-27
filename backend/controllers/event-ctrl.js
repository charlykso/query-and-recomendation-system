const Event = require('../models/event_model')
const mongoose = require('mongoose')


createEvent = async (req, res) => {
  const body = req.body


  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid data',
    })
  }

 try {
   const event = new Event(body)
   event.description = body.description
   event.explanation = body.explanation
   event.course_code = body.course_code
   event.student_id = body.student_id
   event.lecturer_id = body.lecturer_id
   event.type = body.type

   const newevent = await Event.create(event)

   return res.status(201).json(newevent)
   
 } catch (error) {
    return res.status(400).json({ error: error.message })
 }
}

updateEvent = async (req, res) => {
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
  const event = await Event.findOneAndUpdate(
    { _id: id },
    {
      ...body,
    }
  )
  if (!event) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(event)
}


deleteEvent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Invalid id parameter' })
  }
  const event = await Event.findOneAndDelete({ id: req.params.id })
  if (!event) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(event)
}

getEventById = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({error: 'Invalid id parameter'})
  }
  const event = await Event.findOne({_id: id}).populate('student_id')
  if (!event) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(event)
}

getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).sort({ createdAt: -1 })
    .populate('student_id')
    .populate('lecturer_id')
    return res.status(200).json(events)
  } catch (error) {
    return res.status(400).json(error.message)
  }
}

getAllEventsForStudent = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' })
  }
  const student_events = await Event.find({student_id : id})
  .populate('student_id')
  .populate('lecturer_id')

  if (!student_events) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(student_events)
}


getAllEventsForLecturer = async (req, res) => {
  const { id } = req.params
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: 'Invalid id parameter' })
  }
  const lecturer_events = await Event.find({ lecturer_id: id })
    .populate('student_id')
    .populate('lecturer_id')

  if (!lecturer_events) {
    return res.status(404).json({ error: 'No event found' })
  }
  return res.status(200).json(lecturer_events)
}


module.exports = {
  createEvent,
  updateEvent,
  deleteEvent,
  getEventById,
  getAllEvents,
  getAllEventsForStudent,
  getAllEventsForLecturer,
}

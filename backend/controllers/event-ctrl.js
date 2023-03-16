const Event = require('../models/event_model')

createEvent = (req, res) => {
  const body = req.body

  if (!ObjectId.isValid(body.student) {
    
  }
  if (!body) {
    return res.status(400).json({
      success: false,
      error: 'You must provide a valid data',
    })
  }

  const event = new Event(body)

  if (!event) {
    return res.status(400).json({
      success: false,
      error: err,
    })
  }

  event
    .save()
    .then(() => {
      return res.status(201).json({
        success: true,
        id: event._id,
        message: 'Successfully created',
      })
    })
    .catch((error) => {
      error, (message = 'Not created')
    })
}
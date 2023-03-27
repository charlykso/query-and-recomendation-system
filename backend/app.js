require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
const studentRouter = require('./routes/student-router')
const lecturerRouter = require('./routes/lecturer-router')
const eventRouter = require('./routes/event-router')
const courseRouter = require('./routes/course-router')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', async (req, res) => {
  res.send('Hello, World!')
})

//middleware
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

// app.use('/api', movieRouter)
app.use('/api', studentRouter)
app.use('/api', lecturerRouter)
app.use('/api', eventRouter)
app.use('/api', courseRouter)

app.listen(process.env.PORT, () => {
  console.log('Server listening on port', process.env.PORT)
})

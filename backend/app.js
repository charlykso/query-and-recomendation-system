// On the server (app.js)
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const db = require('./db')
// const movieRouter = require('./routes/movie-router')
const studentRouter = require('./routes/student-router')
const lecturerRouter = require('./routes/lecturer-router')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())
app.use(bodyParser.json())

db.on('error', console.error.bind(console, 'MongoDB connection error:'))

app.get('/', async (req, res) => {
  res.send('Hello, World!')
})

// app.use('/api', movieRouter)
app.use('/api', studentRouter)
app.use('/api', lecturerRouter)

app.listen(5000, () => {
  console.log('Server listening on port 5000')
})

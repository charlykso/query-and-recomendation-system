const router = require('express').Router()
const EventCtrl = require('../controllers/event-ctrl')


router.post('/event', EventCtrl.createEvent)
router.patch('/events/:id', EventCtrl.updateEvent)
router.delete('/events/:id', EventCtrl.deleteEvent)
router.get('/events/:id', EventCtrl.getEventById)
router.get('/events', EventCtrl.getAllEvents)
router.get('/students/:id/events', EventCtrl.getAllEventsForStudent)
router.get('/lecturers/:id/events', EventCtrl.getAllEventsForLecturer)

module.exports = router

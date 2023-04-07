const express = require('express');
const LecturerCtrl = require('../controllers/lecturer-ctrl')

const router = express.Router();

router.post('/lecturer', LecturerCtrl.createLecturer);
router.get('/lecturers/:id', LecturerCtrl.getLecturerById);
router.get('/lecturers', LecturerCtrl.getLecturers)
router.patch('/lecturers/:id', LecturerCtrl.updateLecturer);
router.delete('/lecturers/:id', LecturerCtrl.deleteLecturer);
router.post('/lecturer/login', LecturerCtrl.login)

module.exports = router;
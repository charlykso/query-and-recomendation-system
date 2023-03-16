const express = require('express');
const LecturerCtrl = require('../controllers/lecturer-ctrl')

const router = express.Router();

router.post('/lecturer', LecturerCtrl.createLecturer);
router.get('/lecturer/:id', LecturerCtrl.getLecturerById);
router.get('/lecturers', LecturerCtrl.getLecturers);
router.put('/lecturer/:id', LecturerCtrl.updateLecturer);
router.delete('/lecturer/:id', LecturerCtrl.deleteLecturer);

module.exports = router;
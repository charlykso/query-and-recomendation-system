const router = require('express').Router()
const StudentCtrl = require('../controllers/student-ctrl')

router.post('/student', StudentCtrl.createStudent)
router.patch('/students/:id', StudentCtrl.updateStudent)
router.delete('/students/:id', StudentCtrl.deleteStudent)
router.get('/students/:id', StudentCtrl.getStudentById)
router.get('/students', StudentCtrl.getStudents)
router.post('/student/login', StudentCtrl.login)

module.exports = router

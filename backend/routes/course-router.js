const router = require('express').Router()
const CourseCtrl = require('../controllers/course-ctrl')

router.post('/course', CourseCtrl.createCourse)
router.patch('/courses/:id', CourseCtrl.updateCourse)
router.delete('/courses/:id', CourseCtrl.deleteCourse)
router.get('/courses/:id', CourseCtrl.getCourseById)
router.get('/courses', CourseCtrl.getAllCourses)
router.get('/lecturers/:id/courses', CourseCtrl.getAllCoursesForLecturer)

module.exports = router

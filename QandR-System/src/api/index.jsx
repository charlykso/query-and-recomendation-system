import base_URL from "./baseURL"

export const baseUrl = 'https://localhost:7255/api'
export const NodeAPI = 'http://localhost:5000/api'

//student routes
export const getStudentsURL = baseUrl + '/student/getAll'
export const deleteStudentURL = baseUrl + '/student/'
export const updateStudentURL = baseUrl + '/student/'
export const getStudentURL = baseUrl + '/student/'
export const createStudentURL = baseUrl + '/student/create'

//lecturer routes
export const getLecturersURL = baseUrl + '/lecturer/getAll'
export const getLecturerURL = baseUrl + '/lecturer/'
export const deleteLecturerURL = baseUrl + '/lecturer/'
export const updateLecturerURL = baseUrl + '/lecturer/'
export const createLecturerURL = baseUrl + '/lecturer/create'

//course routes
export const getCoursesURL = baseUrl + '/course/getAll'
export const getCourseURL = baseUrl + '/course/'
export const deleteCourseURL = baseUrl + '/course/'
export const updateCourseURL = baseUrl + '/course/'
export const createCourseURL = baseUrl + '/course/create'

//event routes
export const getEventsURL = baseUrl + '/event/getAll'
export const getEventURL = baseUrl + '/event/'
export const deleteEventURL = baseUrl + '/event/'
export const updateEventURL = baseUrl + '/event/'
export const createEventURL = baseUrl + '/event/create'
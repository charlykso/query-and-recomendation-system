import { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminLandingPage from "./admin/AdminPages/AdminLanding";
import LecturerLandingPage from "./lecturer/lecturerPages/LecturerLanding";
import StudentLandingPage from "./student/pages/StudentLanding";
import AdminEvents from './admin/AdminPages/AdminEvents';
import AdminHome from './admin/AdminPages/AdminHome';
import AdminStudents from './admin/AdminPages/AdminStudents';
import AdminLecturers from './admin/AdminPages/AdminLecturers';
import AdminCourses from './admin/AdminPages/AdminCourses';
import UpdateLecturers from './admin/adminSubPages/UpdateLecturers';
import CreateLecturer from './admin/AdminPages/CreateLecturer';
import UpdateStudent from './admin/adminSubPages/UpdateStudent';
import AdminCreateStudent from './admin/AdminPages/AdminCreateStudent';


function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/admin' element={<AdminLandingPage />}>
          <Route path='/admin' element={<AdminHome />} />
          <Route path='courses' element={<AdminCourses />}/>
          <Route path='events' element={<AdminEvents />} />
          <Route path='students' element={<AdminStudents />}/>
          <Route path='students/:Id/update' element={<UpdateStudent />}/>
          <Route path='students/create' element={<AdminCreateStudent />}/>
          <Route path='lecturers' element={<AdminLecturers />}/>
          <Route path='lecturer/:Id/update' element={<UpdateLecturers />}/>
          <Route path='lecturers/create' element={<CreateLecturer />} />
          <Route path='/admin/course_allocation' />
        </Route>
        <Route path='/' element={<StudentLandingPage />}>
          <Route path='/events/create' />
          <Route path='/students/:Id/events' />
        </Route>
        <Route path='/lecturer' element={<LecturerLandingPage />}>
          <Route path='/lecturer/events' />
        </Route>
      </Routes>
    </div>
  )
}

export default App

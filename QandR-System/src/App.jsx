import { useState } from 'react'
import apis from './api/index'
import { Route, Routes } from 'react-router-dom'
import AdminLandingPage from "./admin/AdminPages/AdminLanding";
import LecturerLandingPage from "./lecturer/lecturerPages/LecturerLanding";
import StudentLandingPage from "./student/pages/StudentLanding";
import AdminEvents from './admin/AdminPages/AdminEvents';
import AdminHome from './admin/AdminPages/AdminHome';
import AdminStudents from './admin/AdminPages/AdminStudents';
import AdminLecturers from './admin/AdminPages/AdminLecturers';
import AdminCourses from './admin/AdminPages/AdminCourses';


function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/admin' element={<AdminLandingPage />}>
          <Route path='/admin' element={<AdminHome />} />
          <Route path='/admin/students' element={<AdminStudents />}/>
          <Route path='/admin/lecturers' element={<AdminLecturers />}/>
          <Route path='/admin/courses' element={<AdminCourses />}/>
          <Route path='/admin/events' element={<AdminEvents />} />
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

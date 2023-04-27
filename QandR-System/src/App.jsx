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
import UpdateEvent from './admin/adminSubPages/UpdateEvent';
import UpdateCourse from './admin/adminSubPages/UpdateCourse';
import AdminCreateCourse from './admin/AdminPages/AdminCreateCourse';
import AdminCourseAllocation from './admin/AdminPages/AdminCourseAllocation';
import UpdateCourseAllocation from './admin/adminSubPages/UpdateCourseAllocation';
import AdminCreateCourseAllocation from './admin/AdminPages/AdminCreateCourseAllocation';
import LoginPage from './auth/LoginPage';
import RegisterPage from './auth/RegisterPage';
import LecturerHomePage from './lecturer/lecturerPages/LecturerHomePage';
import LecturerQueries from './lecturer/lecturerPages/LecturerQueries';
import LecturerRecomendations from './lecturer/lecturerPages/LecturerRecomendations';
import StudentHomePage from './student/components/StudentHomePage';
import StudentQueries from './student/pages/StudentQueries';
import StudentRecomendations from './student/pages/StudentRecomendations';
import StudentCreateEvent from './student/pages/StudentCreateEvent';


function App() {

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin' element={<AdminLandingPage />}>
          <Route path='/admin' element={<AdminHome />} />

          {/* course */}
          <Route path='courses' element={<AdminCourses />}/>
          <Route path='courses/:Id/update' element={<UpdateCourse />}/>
          <Route path='courses/create' element={<AdminCreateCourse />}/>

          {/* event */}
          <Route path='events' element={<AdminEvents />} />
          <Route path='events/:Id/update' element={<UpdateEvent />} />

          {/* student */}
          <Route path='students' element={<AdminStudents />}/>
          <Route path='students/:Id/update' element={<UpdateStudent />}/>
          <Route path='students/create' element={<AdminCreateStudent />}/>

          {/* //lecturer */}
          <Route path='lecturers' element={<AdminLecturers />}/>
          <Route path='lecturer/:Id/update' element={<UpdateLecturers />}/>
          <Route path='lecturers/create' element={<CreateLecturer />} />

          {/* course allocation */}
          <Route path='courseAllocations' element={<AdminCourseAllocation />}/>
          <Route path='courseAllocations/:Id/update/:CourseId' element={<UpdateCourseAllocation />} />
          <Route path='courseAllocations/create' element={<AdminCreateCourseAllocation />}/>
        </Route>
        <Route path='/' element={<StudentLandingPage />}>
          <Route path='/' element={<StudentHomePage />} />
          <Route path='/student/events/queries' element={<StudentQueries />} />
          <Route path='/student/events/recommendations' element={<StudentRecomendations />} />
          <Route path='/students/event/create' element={<StudentCreateEvent />} />
          <Route path='/students/:Id/events' />
        </Route>
        <Route path='/lecturer' element={<LecturerLandingPage />}>
          <Route path='/lecturer' element={<LecturerHomePage />} />
          <Route path='/lecturer/events/queries' element={<LecturerQueries />} />
          <Route path='/lecturer/events/recommendations' element={<LecturerRecomendations />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

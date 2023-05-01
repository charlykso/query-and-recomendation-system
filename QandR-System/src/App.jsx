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
import { useAuthContext } from './hooks/useAuthContex';


function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin' element={ <AdminLandingPage /> }>
          <Route path='/admin' element={user ? <AdminHome /> : <LoginPage />} />

          {/* course */}
          <Route path='courses' element={user ? <AdminCourses /> : <LoginPage />}/>
          <Route path='courses/:Id/update' element={user ? <UpdateCourse /> : <LoginPage />}/>
          <Route path='courses/create' element={user ?<AdminCreateCourse /> : <LoginPage />}/>

          {/* event */}
          <Route path='events' element={user ?<AdminEvents /> : <LoginPage />} />
          <Route path='events/:Id/update' element={user ?<UpdateEvent /> : <LoginPage />} />

          {/* student */}
          <Route path='students' element={user ?<AdminStudents /> : <LoginPage />}/>
          <Route path='students/:Id/update' element={user ?<UpdateStudent /> : <LoginPage />}/>
          <Route path='students/create' element={user ?<AdminCreateStudent /> : <LoginPage />}/>

          {/* //lecturer */}
          <Route path='lecturers' element={user ?<AdminLecturers /> : <LoginPage />}/>
          <Route path='lecturer/:Id/update' element={user ?<UpdateLecturers /> : <LoginPage />}/>
          <Route path='lecturers/create' element={user ?<CreateLecturer /> : <LoginPage />} />

          {/* course allocation */}
          <Route path='courseAllocations' element={user ?<AdminCourseAllocation /> : <LoginPage />}/>
          <Route path='courseAllocations/:Id/update/:CourseId' element={user ?<UpdateCourseAllocation /> : <LoginPage />} />
          <Route path='courseAllocations/create' element={user ?<AdminCreateCourseAllocation /> : <LoginPage />}/>
        </Route>
        <Route path='/' element={<StudentLandingPage />}>
          <Route path='/' element={user ? <StudentHomePage />: <LoginPage />} />
          <Route path='/student/events/queries' element={user ? <StudentQueries />: <LoginPage />} />
          <Route path='/student/events/recommendations' element={user ? <StudentRecomendations />: <LoginPage />} />
          <Route path='/students/event/create' element={user ? <StudentCreateEvent />: <LoginPage />} />
          <Route path='/students/:Id/events' />
        </Route>
        <Route path='/lecturer' element={<LecturerLandingPage />}>
          <Route path='/lecturer' element={user ? <LecturerHomePage /> : <LoginPage />} />
          <Route path='/lecturer/events/queries' element={user ? <LecturerQueries /> : <LoginPage />} />
          <Route path='/lecturer/events/recommendations' element={user ? <LecturerRecomendations /> : <LoginPage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App

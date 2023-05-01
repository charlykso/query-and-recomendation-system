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
import NotFound from './auth/NotFound';


function App() {
  const { user } = useAuthContext()

  return (
    <div className='App'>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<RegisterPage />} />
        <Route path='/admin' element={ <AdminLandingPage /> }>
          <Route path='/admin' element={user && user.Role === 'Admin'  ? <AdminHome /> : <LoginPage />} />

          {/* course */}
          <Route path='courses' element={user && user.Role === 'Admin' ? <AdminCourses /> : <LoginPage />}/>
          <Route path='courses/:Id/update' element={user && user.Role === 'Admin' ? <UpdateCourse /> : <LoginPage />}/>
          <Route path='courses/create' element={user && user.Role === 'Admin' ?<AdminCreateCourse /> : <LoginPage />}/>

          {/* event */}
          <Route path='events' element={user && user.Role === 'Admin' ?<AdminEvents /> : <LoginPage />} />
          <Route path='events/:Id/update' element={user && user.Role === 'Admin' ? <UpdateEvent /> : <LoginPage />} />

          {/* student */}
          <Route path='students' element={user && user.Role === 'Admin' ? <AdminStudents /> : <LoginPage />}/>
          <Route path='students/:Id/update' element={user && user.Role === 'Admin' ? <UpdateStudent /> : <LoginPage />}/>
          <Route path='students/create' element={user && user.Role === 'Admin' ? <AdminCreateStudent /> : <LoginPage />}/>

          {/* //lecturer */}
          <Route path='lecturers' element={user && user.Role === 'Admin' ? <AdminLecturers /> : <LoginPage />}/>
          <Route path='lecturer/:Id/update' element={user && user.Role === 'Admin' ? <UpdateLecturers /> : <LoginPage />}/>
          <Route path='lecturers/create' element={user && user.Role === 'Admin' ? <CreateLecturer /> : <LoginPage />} />

          {/* course allocation */}
          <Route path='courseAllocations' element={user && user.Role === 'Admin' ? <AdminCourseAllocation /> : <LoginPage />}/>
          <Route path='courseAllocations/:Id/update/:CourseId' element={user && user.Role === 'Admin' ? <UpdateCourseAllocation /> : <LoginPage />} />
          <Route path='courseAllocations/create' element={user && user.Role === 'Admin' ? <AdminCreateCourseAllocation /> : <LoginPage />}/>
        </Route>
        <Route path='/' element={<StudentLandingPage />}>
          <Route path='/' element={user && (user.Role === 'User' || user.Role === 'Student') ? <StudentHomePage />: <LoginPage />} />
          <Route path='/student/events/queries' element={user && (user.Role === 'User' || user.Role === 'Student') ? <StudentQueries />: <LoginPage />} />
          <Route path='/student/events/recommendations' element={user && (user.Role === 'User' || user.Role === 'Student') ? <StudentRecomendations />: <LoginPage />} />
          <Route path='/students/event/create' element={user && (user.Role === 'User' || user.Role === 'Student') ? <StudentCreateEvent />: <LoginPage />} />
          <Route path='/students/:Id/events' />
        </Route>
        <Route path='/lecturer' element={<LecturerLandingPage />}>
          <Route path='/lecturer' element={user && user.Role === 'Lecturer' ? <LecturerHomePage /> : <LoginPage />} />
          <Route path='/lecturer/events/queries' element={user && user.Role === 'Lecturer' ? <LecturerQueries /> : <LoginPage />} />
          <Route path='/lecturer/events/recommendations' element={user && user.Role === 'Lecturer' ? <LecturerRecomendations /> : <LoginPage />} />
        </Route>
        <Route path='*' element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App

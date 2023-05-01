import React, { useState } from 'react'
import StudentBreadcrumbs from '../components/StudentBreadcrumbs'
import { useNavigate, useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik';
import { CreateEventSchema } from '../../forms/Schemas';
import { createEventURL, getCoursesURL, getLecturersURL } from '../../api';
import Typography from '@mui/material/Typography';
import FormikControl from '../../forms/FormikControl';
import Select from '../../forms/Select';
import useCreate from '../../hooks/useCreate';
import useFetch from '../../hooks/useFetch';


const StudentCreateEvent = () => {
    const [creatingEvent, setCreatingEvent] = useState(null)
    const [createError, setCreateError] = useState(null)
    const { createUser: createEvent, Error, responseData, isLoading} = useCreate();
    const user = JSON.parse(localStorage.getItem('user'))
    const Alltoken = JSON.parse(user.Token)
    const token = Alltoken.token
    const { data: courseData, isLoading: courseLoading, error: courseError } = useFetch(getCoursesURL, token);
    const { data: lecturerData, isLoading: lecturerLoading, error: lecturerError } = useFetch(getLecturersURL, token);
    // const user = JSON.parse(localStorage.getItem('user'))
    const StudentId = user.Id
    const location = useLocation();
    const navigate = useNavigate()

  const successMsg = (resData) => {
    return <div className='text-green-500'>{resData}</div>
  }

  const errorMsg = (err) => {
    return <div className='text-red-500'>{err}</div>
  }
  return (
    <Box sx={{ p: 1}}>
      <StudentBreadcrumbs location={location.pathname} />
      <div>
                <Formik 
                  initialValues={{
                    Course_code: "",
                    Type: "",
                    LecturerId: "",
                    StudentId: "",
                    Description: "",
                  }}
                  validationSchema={CreateEventSchema}
                  onSubmit={ async (values, actions) => {
                    setCreatingEvent(true)
                    console.log(values);

                    let formData = new FormData()
                    formData.append('Course_code', values.Course_code)
                    formData.append('Description', values.Description)
                    formData.append('LecturerId', values.LecturerId)
                    formData.append('Type', values.Type)
                    formData.append('StudentId', StudentId)

                    try{
                      await createEvent(createEventURL, formData, token)
                      if (Error) {
                        // console.log(Error);
                        throw new Error(Error)
                      }else{
                        setCreatingEvent(false)
                        navigate(-1)
                      }
                      // console.log(responseData);
                    }catch (error) {
                      setCreatingEvent(false)
                      setCreateError(error.message)
                    }
                  }}
                  >
                    {(props) => (
                      <Form>
                        <Box sx={{mb: 6}}>
                          <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Create Event
                          </Typography>
                          {createError && (<div className='text-red-500'>{createError}</div>)}
                          {Error && (errorMsg(Error))}
                          {responseData && (successMsg(responseData))}
                        </Box>
                        <div className='form group mb-6'>
                          <Select
                          label='Type'
                          className='form-select appearance-none
      block
      w-full
      px-3
      py-3
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          name='Type'
                        >
                          <option value="" >Select Event Type</option>
                          <option value="Recommendation" >Recommendation</option>
                          <option value="Query" >Query</option>
                        </Select>
                        </div>
                                               
                        <div className='form group mb-6'>
                          <Select
                          label='Course code'
                          className='form-select appearance-none
      block
      w-full
      px-3
      py-3
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                          name='Course_code'
                        >
                          {courseLoading ? (<option>Loading ...</option>) : (<option value="" >Select the lecturer's Course</option>)}
                          {courseError && (<option>{courseError}</option>)}
                          {courseData && (
                            courseData.map((course, index) => (
                                <option value={course.Course_code} key={index} >{course.Course_code}</option>
                            ))
                          )}
                        </Select>
                      </div>
                      <div className='form group mb-6'>
                            <Select
                            label='Select lecturer'
                            className='form-select appearance-none
        block
        w-full
        px-3
        py-3
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding bg-no-repeat
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                            name='LecturerId'
                          >
                            {lecturerLoading ? (<option>loading ...</option>): (<option value="" >Select the lecturers</option>)}
                            {lecturerError && (<option>{lecturerError}</option>)}
                            {lecturerData && (
                                lecturerData.map((lecturer, index) => (
                                    <option value={lecturer.Id} key={index} >{lecturer.Title} {lecturer.Lastname}</option>
                                ))
                            )}
                            
                          </Select>
                        </div>
                        <div className='form-group mb-6'>
                            <FormikControl
                            label='Description'
                        className='form-control
        block
        w-full
        px-3
        py-3
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none'
                        control='textarea'
                        type='text'
                        name='Description'
                        placeholder='Tell us what happened'
                      />
                        </div>
                      <button
                      disabled={creatingEvent}
                      type='submit'
                      className='
      w-full
      px-6
      py-3
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out'
                    >
                      {creatingEvent ? 'Loading...' : 'Create Event'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
    </Box>
  )
}

export default StudentCreateEvent

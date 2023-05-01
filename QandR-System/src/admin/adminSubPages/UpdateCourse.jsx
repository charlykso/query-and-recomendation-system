import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Breadcrumb from './Breadcrumb'
import useFetch from '../../hooks/useFetch'
import { updateCourseURL, getCourseURL } from '../../api'
import CircularProgress from '@mui/material/CircularProgress'
import { Formik, Form } from 'formik'
import { UpdateCourseSchema } from '../../forms/Schemas'
import FormikControl from '../../forms/FormikControl'
import Typography from '@mui/material/Typography'
import Select from '../../forms/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useUpdate from '../../hooks/useUpdate'
import { Token } from '@mui/icons-material'

const UpdateCourse = () => {
    const { Id } = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const [updating, setUpdating] = useState(null)
    const [updataError, setUpdataError] = useState(null)
    const updateCourseurl =  updateCourseURL + Id + '/update'
    // console.log(updateLecturerurl);
    const getcourseurl = getCourseURL + Id + '/get'
    const user = JSON.parse(localStorage.getItem('user'))
    const Alltoken = JSON.parse(user.Token)
    const token = Alltoken.token
    const { data: course, isLoading, error} = useFetch(getcourseurl, token)
    const { updateUser: updateCourse, isLoading: updateIsLoading, updateError, responseData} = useUpdate()
    if (course) {
      var lecturers = course.lecturer_Courses
    //   console.log(lecturers);
    }

  return (
    <Box sx={{ p: 1}}>
        {course && (<Breadcrumb location={location.pathname} />)}
        {updataError && <div className='text-red-600'>{updataError}</div>}
        {isLoading && (<div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                  <CircularProgress />
                </div>
        )}
        {course && (
            <div>
                <Formik 
                  initialValues={{
                    Course_code: course.Course_code,
                    Course_title: course.Course_title,
                    Unit: course.Unit,
                    Level: course.Level,
                  }}
                  validationSchema={UpdateCourseSchema}
                  onSubmit={ async (values, actions) => {
                    setUpdating(true)
                    console.log(values);

                    let formData = new FormData()
                    formData.append('Course_code', values.Course_code)
                    formData.append('Course_title', values.Course_title)
                    formData.append('Unit', values.Unit)
                    formData.append('Level', values.Level)

                    try{
                        let updateCourseurl = updateCourseURL + Id + '/update'
                        await updateCourse(updateCourseurl, formData, token)
                        if (error) {
                          throw new Error(error)
                        }else{
                          navigate( - 1)
                        }
                    }catch (error) {
                      setUpdating(false)
                      setUpdataError(error.message)
                    }
                  }}
                  >
                    {(props) => (
                      <Form>
                        <Box sx={{mb: 6}}>
                          <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Update Course
                          </Typography>
                          {error && (<div className='text-red-500'>{error}</div>)}
                        </Box>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='form-group mb-6'>
                              <FormikControl
                              label='Course code'
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
                          control='input'
                          type='text'
                          name='Course_code'
                          placeholder='Course code eg CSC 101'
                        />
                          </div>
                          
                          <div className='form-group mb-6'>
                              <FormikControl
                              label='Credit unit load'
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
                          control='input'
                          type='number'
                          name='Unit'
                          placeholder='Credit unit load'
                        />
                          </div>
                        </div>
                        <div className='form-group mb-6'>
                              <FormikControl
                              label='Course title'
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
                          control='input'
                          type='text'
                          name='Course_title'
                          placeholder='Course title'
                        />
                          </div>
                        <div className='form group mb-6'>
                          <Select
                          label='Level'
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
                          name='Level'
                        >
                          <option value="" >Select Level</option>
                          <option value="100" >100 level</option>
                          <option value="200" >200 level</option>
                          <option value="300" >300 level</option>
                          <option value="400">400 level</option>
                        </Select>
                      </div>
                      <button
                      disabled={updating}
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
                      {updating ? 'Loading...' : 'Update Lecturer'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
        )}
        {/* list of lecturers taking the course */}
                {lecturers && (
                  <div className='form group mb-6 mt-6'>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="simple-select-label">Lecturers</InputLabel>
                    <MuiSelect
                      labelId="simple-select-label"
                      id="simple-select-autowidth"
                      label="Courses"
                      value=''
                    >
                      {lecturers.map((lecturer, index) => (
                        <MenuItem value='' key={index}>
                          {lecturer.Lecturer.Title} {lecturer.Lecturer.Firstname}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  </FormControl>
                </div>
                )}
    </Box>
  )
}

export default UpdateCourse

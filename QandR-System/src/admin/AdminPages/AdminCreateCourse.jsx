import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik';
import { CreateCourseSchema } from '../../forms/Schemas';
import { createCourseURL } from '../../api';
import Typography from '@mui/material/Typography';
import FormikControl from '../../forms/FormikControl';
import Select from '../../forms/Select';
import Breadcrumb from '../adminSubPages/Breadcrumb';
import useCreate from '../../hooks/useCreate';

const AdminCreateCourse = () => {
  const [creatingCourse, setCreatingCourse] = useState(null)
  const [createError, setCreateError] = useState(null)
  const user = JSON.parse(localStorage.getItem('user'))
  const Alltoken = JSON.parse(user.Token)
  const token = Alltoken.token
  const { createUser: createCourse, Error, responseData, isLoading} = useCreate();
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
      <Breadcrumb location={location.pathname} />
      <div>
                <Formik 
                  initialValues={{
                    Course_code: "",
                    Course_title: "",
                    Level: "",
                    Unit: "",
                  }}
                  validationSchema={CreateCourseSchema}
                  onSubmit={ async (values, actions) => {
                    setCreatingCourse(true)
                    console.log(values);

                    let formData = new FormData()
                    formData.append('Course_code', values.Course_code)
                    formData.append('Course_title', values.Course_title)
                    formData.append('Level', values.Level)
                    formData.append('Unit', values.Unit)

                    try{
                      await createCourse(createCourseURL, formData, token)
                      if (Error) {
                        // console.log(Error);
                        throw new Error(Error)
                      }else{
                        navigate(-1)
                      }
                      // console.log(responseData);
                    }catch (error) {
                      setCreatingCourse(false)
                      setCreateError(error.message)
                    }
                  }}
                  >
                    {(props) => (
                      <Form>
                        <Box sx={{mb: 6}}>
                          <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Create Course
                          </Typography>
                          {createError && (<div className='text-red-500'>{createError}</div>)}
                          {Error && (errorMsg(Error))}
                          {responseData && (successMsg(responseData))}
                        </Box>
                        <div className='grid grid-cols-2 gap-4'>
                          <div className='form-group mb-6'>
                              <FormikControl
                              label='Course Code'
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
                          placeholder='Course code'
                          value={props.Course_code}
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
                          type='text'
                          name='Unit'
                          placeholder='Credit unit load'
                          value={props.Unit}
                        />
                          </div>
                        </div>
                        <div className='form-group mb-6'>
                              <FormikControl
                              label="Course title"
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
                          value={props.Course_title}
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
                          <option value='' >Select Level</option>
                          <option value="100" >100 level</option>
                          <option value="200" >200 level</option>
                          <option value="300" >300 level</option>
                          <option value="400">400 level</option>
                        </Select>
                      </div>
                      
                      <button
                      disabled={creatingCourse}
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
                      {creatingCourse ? 'Loading...' : 'Create Lecturer'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
    </Box>
  )
}

export default AdminCreateCourse

import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Breadcrumb from './Breadcrumb'
import useFetch from '../../hooks/useFetch'
import { updateStudentURL, getStudentURL } from '../../api'
import CircularProgress from '@mui/material/CircularProgress'
import { Formik, Form } from 'formik'
import { updateStudentSchema } from '../../forms/Schemas'
import FormikControl from '../../forms/FormikControl'
import Typography from '@mui/material/Typography'
import Select from '../../forms/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useUpdate from '../../hooks/useUpdate'

const UpdateStudent = () => {
    const { Id } = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const [updating, setUpdating] = useState(null)
    const [updataError, setUpdataError] = useState(null)
    const updateStudenturl =  updateStudentURL + Id + '/update'
    // console.log(updateLecturerurl);
    const getStudenturl = getStudentURL + Id + '/get'
    const user = JSON.parse(localStorage.getItem('user'))
    const Alltoken = JSON.parse(user.Token)
    const token = Alltoken.token
    const { data: student, isLoading, error} = useFetch(getStudenturl, token)
    const { updateUser: updateStudent, isLoading: updateIsLoading, updateError, responseData} = useUpdate()
    if (student) {
    //   var courses = lecturer.Lecturer_Courses
    }
  return (
    <Box sx={{ p: 1}}>
        {student && (<Breadcrumb location={location.pathname} />)}
        {error && <div className='text-red-600'>{error}</div>}
        {isLoading && (<div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                  <CircularProgress />
                </div>
        )}
        {student && (
            <div>
                <Formik 
                  initialValues={{
                    RegNo: student.RegNo,
                    Firstname: student.Firstname,
                    Lastname: student.Lastname,
                    Email: student.Email,
                    PhoneNumber: student.PhoneNumber,
                    Role: student.Role,
                    Gender: student.Gender,
                  }}
                  validationSchema={updateStudentSchema}
                  onSubmit={ async (values, actions) => {
                    setUpdating(true)
                    console.log(values);

                    let formData = new FormData()
                    formData.append('RegNo', values.RegNo)
                    formData.append('Firstname', values.Firstname)
                    formData.append('Lastname', values.Lastname)
                    formData.append('Email', values.Email)
                    formData.append('PhoneNumber', values.PhoneNumber)
                    formData.append('Role', values.Role)
                    formData.append('Gender', values.Gender)

                    try{
                        let updateStudenturl = updateStudentURL + Id + '/update'
                        await updateStudent(updateStudenturl, formData, token)
                        if (error) {
                          throw Error(error)
                        }
                        navigate( - 1)
                    }catch (error) {
                      setUpdataError(error.message)
                    }
                  }}
                  >
                    {(props) => (
                      <Form>
                        <Box sx={{mb: 6}}>
                          <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Update Student
                          </Typography>
                          {error && (<div className='text-red-500'>{error}</div>)}
                        </Box>
                        <div className='grid grid-cols-3 gap-4'>
                          <div className='form-group mb-6'>
                              <FormikControl
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
                          name='RegNo'
                          placeholder='Reg number'
                        />
                          </div>
                          <div className='form-group mb-6'>
                              <FormikControl
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
                          name='Firstname'
                          placeholder='First Name'
                        />
                          </div>
                          <div className='form-group mb-6'>
                              <FormikControl
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
                          name='Lastname'
                          placeholder='Last Name'
                        />
                          </div>
                        </div>
                        <div className='form-group mb-6'>
                            <FormikControl
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
                        name='Email'
                        placeholder='Email'
                      />
                        </div>
                        <div className='form-group mb-6'>
                            <FormikControl
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
                        name='PhoneNumber'
                        placeholder='Phone Number'
                      />
                        </div>
                        <div className='form group mb-6'>
                          <Select
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
                          name='Role'
                        >
                          <option value="" >Select Role</option>
                          <option value="Admin" >Admin</option>
                          <option value="Lecturer" >Lecturer</option>
                          <option value="User" >User</option>
                          <option value="Student">Student</option>
                        </Select>
                      </div>
                        <div className='form group mb-6'>
                            <Select
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
                            name='Gender'
                          >
                            <option value="" >Select Gender</option>
                            <option value="Female" >Female</option>
                            <option value="Male" >Male</option>
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
                      {updating ? 'Loading...' : 'Update Student'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
        )}
    </Box>
  )
}

export default UpdateStudent

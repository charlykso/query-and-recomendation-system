import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik';
import { CreateStudentSchema } from '../../forms/Schemas';
import { createStudentURL } from '../../api';
import Typography from '@mui/material/Typography';
import FormikControl from '../../forms/FormikControl';
import Select from '../../forms/Select';
import Breadcrumb from '../adminSubPages/Breadcrumb';
import useCreate from '../../hooks/useCreate';

const AdminCreateStudent = () => {
    const location = useLocation();
    const navigate = useNavigate()
    const [creatingStudent, setCreatingStudent] = useState(null)
    const [createError, setCreateError] = useState(null)
    const { createUser: createStudent, Error, responseData, isLoading} = useCreate();

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
                    RegNo: "",
                    Firstname: "",
                    Lastname: "",
                    Email: "",
                    PhoneNumber: "",
                    Role: "",
                    Gender: "",
                    Password: "",
                    ConfirmPassword: "",
                  }}
                  validationSchema={CreateStudentSchema}
                  onSubmit={ async (values, actions) => {
                    setCreatingStudent(true)
                    // console.log(values);

                    let formData = new FormData()
                    formData.append('RegNo', values.RegNo)
                    formData.append('Firstname', values.Firstname)
                    formData.append('Lastname', values.Lastname)
                    formData.append('Email', values.Email)
                    formData.append('PhoneNumber', values.PhoneNumber)
                    formData.append('Role', values.Role)
                    formData.append('Gender', values.Gender)
                    formData.append('Password', values.Password)

                    try{
                      // console.log(createLecturerURL);
                      await createStudent(createStudentURL, formData)
                      if (Error) {
                        console.log(Error);
                        throw new Error(Error)
                      }else{
                        console.log(responseData);
                        navigate(-1)
                      }
                    }catch (error) {
                      setCreateError(error.message)
                      setCreatingStudent(false)
                    }
                  }}
                  >
                    {(props) => (
                      <Form>
                        <Box sx={{mb: 6}}>
                          <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Create Student
                          </Typography>
                          {Error && (errorMsg(Error))}
                          {responseData && (successMsg(responseData))}
                        </Box>
                        <div className='grid grid-cols-3 gap-4'>
                          <div className='form-group mb-6'>
                              <FormikControl
                              label='Reg number'
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
                          value={props.RegNo}
                        />
                          </div>
                          <div className='form-group mb-6'>
                              <FormikControl
                              label="Firstname"
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
                          value={props.Firstname}
                        />
                          </div>
                          <div className='form-group mb-6'>
                              <FormikControl
                              label='Lastname'
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
                          value={props.Lastname}
                        />
                          </div>
                        </div>
                        <div className='form-group mb-6'>
                            <FormikControl
                            label='Email'
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
                        type='email'
                        name='Email'
                        placeholder='Email'
                        value={props.Email}
                      />
                        </div>
                        <div className='form-group mb-6'>
                            <FormikControl
                            label="Phone number"
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
                        placeholder='Phone Number eg +2347062682820'
                        value={props.PhoneNumber}
                      />
                        </div>
                        <div className='form group mb-6'>
                          <Select
                          label='Role'
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
                          <option value='' >Select Role</option>
                          <option value="Admin" >Admin</option>
                          <option value="Lecturer" >Lecturer</option>
                          <option value="User" >User</option>
                          <option value="Student">Student</option>
                        </Select>
                      </div>
                        <div className='form group mb-6'>
                            <Select
                            label='Gender'
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
                            <option value=''  >Select Gender</option>
                            <option value="Female" >Female</option>
                            <option value="Male" >Male</option>
                            </Select>
                        </div>
                      <div className='form-group mb-6'>
                        <FormikControl
                        label='Password'
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
                        type='password'
                        name='Password'
                        placeholder='Password'
                        value={props.Password}
                      />
                        </div>
                        <div className='form-group mb-6'>
                          <FormikControl
                          label='Comfirm password'
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
                        type='password'
                        name='ConfirmPassword'
                        placeholder='Confirm password'
                        value={props.ConfirmPassword}
                      />
                        </div>
                      <button
                      disabled={creatingStudent}
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
                      {creatingStudent ? 'Loading...' : 'Create Student'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
    </Box>
  )
}

export default AdminCreateStudent

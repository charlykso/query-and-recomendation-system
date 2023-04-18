import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box'
import { Formik, Form } from 'formik';
import { CreateUserSchema } from '../../forms/Schemas';
import { createLecturerURL } from '../../api';
import Typography from '@mui/material/Typography';
import FormikControl from '../../forms/FormikControl';
import Select from '../../forms/Select';
import Breadcrumb from '../adminSubPages/Breadcrumb';
import useCreate from '../../hooks/useCreate';
import { Password } from '@mui/icons-material';

const CreateLecturer = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [creatingLecturer, setCreatingLecturer] = useState(null)
  const [createError, setCreateError] = useState(null)
  const { createUser: createLecturer, Error, responseData, isLoading} = useCreate();

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
                    Title: "",
                    Firstname: "",
                    Lastname: "",
                    Email: "",
                    PhoneNumber: "",
                    Role: "",
                    Gender: "",
                    Marital_status: "",
                    Password: "",
                    ConfirmPassword: "",
                  }}
                  validationSchema={CreateUserSchema}
                  onSubmit={ async (values, actions) => {
                    setCreatingLecturer(true)
                    console.log(values);

                    let formData = new FormData()
                    formData.append('Title', values.Title)
                    formData.append('Firstname', values.Firstname)
                    formData.append('Lastname', values.Lastname)
                    formData.append('Email', values.Email)
                    formData.append('PhoneNumber', values.PhoneNumber)
                    formData.append('Role', values.Role)
                    formData.append('Gender', values.Gender)
                    formData.append('Marital_status', values.Marital_status)
                    formData.append('Password', values.Password)

                    try{
                      // console.log(createLecturerURL);
                      await createLecturer(createLecturerURL, formData)
                      if (Error) {
                        // console.log(Error);
                        throw new Error(Error)
                      }else{
                        navigate(-1)
                      }
                      // console.log(responseData);
                    }catch (error) {
                      setCreatingLecturer(false)
                      setCreateError(error.message)
                    }
                  }}
                  >
                    {(props) => (
                      <Form>
                        <Box sx={{mb: 6}}>
                          <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Create Lecturer
                          </Typography>
                          {Error && (errorMsg(Error))}
                          {responseData && (successMsg(responseData))}
                        </Box>
                        <div className='grid grid-cols-3 gap-4'>
                          <div className='form-group mb-6'>
                              <FormikControl
                              label='Title'
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
                          name='Title'
                          placeholder='Title. eg Mr., Dr, Prof'
                          value={props.Title}
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
                      <div className='grid grid-cols-2 gap-4'>
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
                          <div className='form group mb-6'>
                            <Select
                            label='Marital status'
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
                            name='Marital_status'
                          >
                            <option value=''>Select marital status</option>
                            <option value="Single" >Single</option>
                            <option value="Married" >Married</option>
                            <option value="Divorced" >Divorced</option>
                          </Select>
                        </div>
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
                      disabled={creatingLecturer}
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
                      {creatingLecturer ? 'Loading...' : 'Create Lecturer'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
    </Box>
  )
}

export default CreateLecturer

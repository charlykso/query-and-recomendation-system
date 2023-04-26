import React, { useState } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Breadcrumb from './Breadcrumb'
import useFetch from '../../hooks/useFetch'
import { updateEventURL, getEventURL } from '../../api'
import CircularProgress from '@mui/material/CircularProgress'
import { Formik, Form } from 'formik'
import { UpdateEventSchema } from '../../forms/Schemas'
import FormikControl from '../../forms/FormikControl'
import Typography from '@mui/material/Typography'
import Select from '../../forms/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useUpdate from '../../hooks/useUpdate'

const UpdateEvent = () => {
    const { Id } = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const [updating, setUpdating] = useState(null)
    const [updataError, setUpdataError] = useState(null)
    const updateEventurl =  updateEventURL + Id + '/update'
    // console.log(updateLecturerurl);
    const getEventurl = getEventURL + Id + '/get'
    const { data: event, isLoading, error} = useFetch(getEventurl)
    const { updateUser: updateEvent, isLoading: updateIsLoading, updateError, responseData} = useUpdate()
    if (event) {
    //   var courses = lecturer.Lecturer_Courses
    }
  return (
    <Box sx={{ p: 1}}>
        {event && (<Breadcrumb location={location.pathname} />)}
        {updataError && <div className='text-red-600'>{updataError}</div>}
        {isLoading && (<div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                  <CircularProgress />
                </div>
        )}
        {event && (
            <div>
                <Formik 
                  initialValues={{
                    Type: event.Type,
                    Description: event.Description,
                    StudentId: event.StudentId,
                    LecturerId: event.LecturerId,
                    Course_code: event.Course_code,
                  }}
                  validationSchema={UpdateEventSchema}
                  onSubmit={ async (values, actions) => {
                    setUpdating(true)
                    console.log(values);

                    let formData = new FormData()
                    formData.append('Type', values.Type)
                    formData.append('Description', values.Description)
                    formData.append('StudentId', values.StudentId)
                    formData.append('LecturerId', values.LecturerId)
                    formData.append('Course_code', values.Course_code)

                    try{
                        let updateEventurl = updateEventURL + Id + '/update'
                        await updateEvent(updateEventurl, formData)
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
                            Update Lecturer
                          </Typography>
                          {error && (<div className='text-red-500'>{error}</div>)}
                        </Box>
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
                            label='Course_code'
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
                            <option value="" >Select the lecturers Course</option>
                            <option value="Female" >Female</option>
                            <option value="Male" >Male</option>
                          </Select>
                        </div>
                        <div className='form group mb-6'>
                          <Select
                          label='StudentId'
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
                            name='StudentId'
                          >
                            <option value="">Select the student</option>
                            <option value="Single" >Single</option>
                            <option value="Married" >Married</option>
                            <option value="Divorced" >Divorced</option>
                          </Select>
                        </div>
                        <div className='form group mb-6'>
                          <Select
                          label='LecturerId'
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
                            <option value="">Select the lecturer</option>
                            <option value="Single" >Single</option>
                            <option value="Married" >Married</option>
                            <option value="Divorced" >Divorced</option>
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
                      {updating ? 'Loading...' : 'Update Event'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
        )}
    </Box>
  )
}

export default UpdateEvent

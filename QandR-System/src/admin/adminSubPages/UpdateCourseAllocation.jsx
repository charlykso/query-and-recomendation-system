import React, { useEffect, useState } from 'react'
import { useParams, useLocation, useNavigate, useFetcher, useFetchers } from 'react-router-dom'
import Box from '@mui/material/Box'
import Breadcrumb from './Breadcrumb'
import useFetch from '../../hooks/useFetch'
import { updateCourseAllocationURL, getCourseAllocationURL, getCourseURL } from '../../api'
import CircularProgress from '@mui/material/CircularProgress'
import { Formik, Form } from 'formik'
import { UpdateCourseAllocationSchema } from '../../forms/Schemas'
import FormikControl from '../../forms/FormikControl'
import Typography from '@mui/material/Typography'
import Select from '../../forms/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import useUpdate from '../../hooks/useUpdate'
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import MyuiSelect from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import SelectLecturer from './SelectLecturer'

const UpdateCourseAllocation = () => {
    const { Id, CourseId } = useParams()
    const location = useLocation();
    const navigate = useNavigate()
    const [updating, setUpdating] = useState(null)
    const [updataError, setUpdataError] = useState(null)
    const updateCourseALlourl =  updateCourseAllocationURL + Id + '/update'
    // console.log(updateLecturerurl);
    const getCAurl = getCourseURL + CourseId + '/get'
    const user = JSON.parse(localStorage.getItem('user'))
    const Alltoken = JSON.parse(user.Token)
    const token = Alltoken.token
    const { data: courseAllo, isLoading, error} = useFetch(getCAurl, token)
    const { updateUser: updateCourseAllo, isLoading: updateIsLoading, updateError, responseData} = useUpdate()
    const [lecturerCourse, setLecturerCourse] = useState([]);

    if (courseAllo) {
        var lecturers = courseAllo.lecturer_Courses
        console.log(lecturers);
        // var courseUrl = getCoursesURL + courseAllo.CourseId +'/get';
        var lecIds = []
        lecturers.forEach(element => {
            lecIds.push(element.Id)
        });
    }

    const handleChange = (event) => {
        const {
        target: { value },
        } = event;
        setLecturerCourse(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    };

  return (
    <Box sx={{ p: 1}}>
        {courseAllo && (<Breadcrumb location={location.pathname} />)}
        {updataError && <div className='text-red-600'>{updataError}</div>}
        {isLoading && (<div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                  <CircularProgress />
                </div>
        )}
        {courseAllo && (
            <div>
                <Formik 
                  initialValues={{
                    LecturerId: lecIds,
                    CourseId: courseAllo.Id,
                  }}
                  validationSchema={UpdateCourseAllocationSchema}
                  onSubmit={ async (values, actions) => {
                    setUpdating(true)
                    console.log(values);

                    let formData = new FormData()
                    formData.append('CourseId', values.CourseId)
                    formData.append('LecturerId', values.LecturerId)

                    try{
                        let updateCAurl = updateCourseAllocationURL + Id + '/update'
                        await updateCourseAllo(updateCAurl, formData, token)
                        if (error) {
                          throw new Error(error)
                        }else{
                        //   navigate( - 1)
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
                            Reallocate Course
                          </Typography>
                          {error && (<div className='text-red-500'>{error}</div>)}
                        </Box>
                        <div className='form group mb-6'>
                          <Select
                          label='Course'
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
                          name='CourseId'
                        >
                          <option value={courseAllo.Id} >{courseAllo.Course_code}</option>
                        </Select>
                      </div>
                    <div className='form group mb-6'>
                        <FormControl sx={{ width: '100%' }}>
                            <InputLabel id="demo-multiple-checkbox-label">Lecturers</InputLabel>
                            <MyuiSelect
                                labelId="demo-multiple-checkbox-label"
                                id="demo-multiple-checkbox"
                                multiple
                                value={lecturerCourse}
                                onChange={handleChange}
                                input={<OutlinedInput label="Lecturers" />}
                                renderValue={(selected) => selected.join(', ')}
                                name='LecturerId'
                                // MenuProps={MenuProps}
                                >
                                {lecturers.map((lecturer) => (
                                    <MenuItem key={lecturer.LecturerId} value={lecturer.LecturerId}>
                                    <Checkbox checked={lecturerCourse.indexOf(lecturer.LecturerId) > -1} />
                                    <ListItemText primary={lecturer.Lecturer.Title+' '+lecturer.Lecturer.Lastname} />
                                    </MenuItem>
                                ))}
                            </MyuiSelect>
                    </FormControl>
                    </div>
                    <div className='form group mb-6'>
                        {<SelectLecturer />}
                    </div>
                      <button
                    //   disabled={updating}
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
                      {updating ? 'Loading...' : 'Reallocate course'}
                    </button>
                  </Form>
                  )}
                </Formik>
            </div>
        )}
        {/* list of courses */}
                {/* {courseAllo && (
                  <div className='form group mb-6 mt-6'>
                  <FormControl sx={{ minWidth: '100%' }}>
                    <InputLabel id="simple-select-label">Courses</InputLabel>
                    <MuiSelect
                      labelId="simple-select-label"
                      id="simple-select-autowidth"
                      label="Courses"
                      value=''
                    >
                      {lecturers && lecturers.map((lecturer, index) => (
                        <MenuItem value='' key={index}>
                          {lecturer.Title} {lecturer.Lastname}
                        </MenuItem>
                      ))}
                    </MuiSelect>
                  </FormControl>
                </div>
                )} */}
    </Box>
  )
}

export default UpdateCourseAllocation

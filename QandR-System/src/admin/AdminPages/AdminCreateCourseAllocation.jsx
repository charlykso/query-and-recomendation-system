import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import React, { useState, useEffect } from 'react'
import Breadcrumb from '../adminSubPages/Breadcrumb'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetch from '../../hooks/useFetch'
import { getCoursesURL, getLecturersURL } from '../../api'
import Radio from '@mui/material/Radio'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import FormLabel from '@mui/material/FormLabel'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import Checkbox from '@mui/material/Checkbox'
import ListItemText from '@mui/material/ListItemText'
import { TextField } from '@mui/material'
import useCreate from '../../hooks/useCreate'
import { createCourseAllocationURL } from '../../api'

const AdminCreateCourseAllocation = () => {
    const [courseErrMsg, setCourseErrMsg] = useState("")
    const [lecturerErrMsg, setLecturerErrMsg] = useState([])
    const [selectedOption, setSelectedOption] = useState("");
    const [lecturerCourse, setLecturerCourse] = useState([]);
    const [pageLoading, setpageLoading] = useState(null)
    const location = useLocation()
    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('user'))
    const Alltoken = JSON.parse(user.Token)
    const token = Alltoken.token
    const { data: courses, isLoading: courseIsLoading, error: courseError} = useFetch(getCoursesURL, token)
    const { data: lecturers, isLoading: lecturerIsLoading, error: lecturerError} = useFetch(getLecturersURL, token)
    const { createUser: createCourseAlloc, Error, responseData, isLoading} = useCreate();

    // if (courses) {
    //     console.log(courses);
    // }else{
    //     console.log(courseError);
    //     console.log(lecturerError);
    // }
    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
    };

    const handleLecturerChange = (event) => {
        const {
        target: { value },
        } = event;
        setLecturerCourse(
        // On autofill we get a stringified value.
        typeof value === 'string' ? value.split(',') : value,
        );
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setpageLoading(true)
        if (selectedOption === null) {
            setCourseErrMsg("Please select a course")
        }else if(lecturerCourse === null)
        {
            setLecturerErrMsg("Please select at least a lecturer")
        }else{
            lecturerCourse.forEach(async ele => {
                var formData = new FormData()
                formData.append('CourseId', selectedOption)
                formData.append('LecturerId', ele)
                try {
                    // console.log(formData);
                    await createCourseAlloc(createCourseAllocationURL, formData, token)
                    if (Error) {
                        setLecturerErrMsg(Error)
                    }
                } catch (error) {
                    setLecturerErrMsg(error.message)
                }
            });
            if (responseData) {
                // navigate(-1)
            }
        }
        // console.log(selectedOption);
        // console.log(lecturerCourse);
    }
  return (
    <Box sx={{ p: 1}}>
      <Breadcrumb location={location.pathname} />
        {responseData && (<div className='text-green-500'>{responseData}</div>)}
        {Error && (<div className='text-red-500'>{Error}</div>)}
        {courseErrMsg && (<div className='text-red-500'>{courseErrMsg}</div>)}
        <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                            Allocate Course
        </Typography>
        {lecturerErrMsg && (<div className='text-red-500'>{lecturerErrMsg}</div>)}
        <form onSubmit={handleSubmit} className='mt-6'>
            <div className='form group mb-6'>
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Select a course</InputLabel>
                    <Select value={selectedOption} input={<OutlinedInput label="Select a course:" />} onChange={handleSelectChange} fullWidth>
                        {courseIsLoading && (
                            <MenuItem value="">
                            <span>Loading ...</span>
                            </MenuItem>
                        )}
                        {courseError && (
                            <MenuItem value="">
                            <span className='text-red-500'>{courseError}</span>
                            </MenuItem>
                        )}
                        {courses && (
                            courses.map((course, index) => (
                                <MenuItem value={course.Id} key={index}>
                                    <Radio checked={selectedOption === course.Id} sx={{fontSize: 28,}} />
                                    <span>{course.Course_code}</span>
                                </MenuItem>
                            ))
                        )}
                    </Select>
                </FormControl>
            </div>
            <div className='form group mb-6'>
                <Box sx={{ width: '100%' }}>
                    <TextField
                        label='Select lecturer'
                        select
                        value={lecturerCourse}
                        onChange={handleLecturerChange}
                        fullWidth
                        SelectProps={{multiple: true}}
                    >
                        {lecturerError && (
                            <MenuItem value="">
                            <span className='text-red-500'>{lecturerError}</span>
                            </MenuItem>
                        )}
                        {lecturers && (
                            lecturers.map((lecturer, index) => (
                                <MenuItem key={index} value={lecturer.Id}>{lecturer.Title+' '+lecturer.Lastname}</MenuItem>
                            ))
                        )}
                    </TextField>
                </Box>
            </div>
            <button
                disabled={isLoading && pageLoading}
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
                      {isLoading && pageLoading ? 'Loading...' : 'Allocate course'}
                    </button>
        </form>
    </Box>
  )
}

export default AdminCreateCourseAllocation

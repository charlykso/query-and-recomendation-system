import React, { useState } from 'react'
import FormikControl from '../../forms/FormikControl'
import Typography from '@mui/material/Typography'
import Select from '../../forms/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel';
import MuiSelect from '@mui/material/Select';
import useUpdate from '../../hooks/useUpdate'
import OutlinedInput from '@mui/material/OutlinedInput';
import ListItemText from '@mui/material/ListItemText';
import MyuiSelect from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import useFetch from '../../hooks/useFetch'
import { getLecturersURL } from '../../api'
import TextField from '@mui/material/TextField'
import MenuItem from '@mui/material/MenuItem'
import { Box } from '@mui/material'

const SelectLecturer = (lect_Id) => {
    const [lecturerCourse, setLecturerCourse] = useState([]);
    const {data: lecturers, isLoading, error} = useFetch(getLecturersURL)

    const handleChange = (e) => {
        const value = e.target.value
        setLecturerCourse(typeof value === 'string' ? value.split(',') : value)
    }

  return (
    <Box>
    {lecturers && <TextField
        select
        value={lecturerCourse}
        onChange={handleChange}
        fullWidth
        SelectProps={{ multiple: true }}
        name='LecturerId02'
    >
        {lecturers.map((lecturer, index) => (
            <MenuItem value={lecturer.Id} key={index}>{lecturer.Title+' '+lecturer.Lastname}</MenuItem>
        ))}
      
    </TextField>
    }
    </Box>
  )
}

export default SelectLecturer

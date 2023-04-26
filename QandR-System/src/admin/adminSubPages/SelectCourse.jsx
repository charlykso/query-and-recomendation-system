import Box from '@mui/material/Box'
import Select from '@mui/material/Select'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import OutlinedInput from '@mui/material/OutlinedInput'
import MenuItem from '@mui/material/MenuItem'
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText'
import React, { useState } from 'react'
import useFetch from '../../hooks/useFetch'
import Radio from '@mui/material/Radio'
import RadioGroup from '@mui/material/RadioGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel'
import { getCoursesURL } from '../../api'

const SelectCourse = () => {
    const [selectedOption, setSelectedOption] = useState("");
    const { data: courses, isLoading, error} = useFetch(getCoursesURL)

    const handleSelectChange = (event) => {
        setSelectedOption(event.target.value);
        console.log(selectedOption);
    };

  return (
    <Box sx={{width: '100%'}}>
      <FormControl component="fieldset" sx={{ width: '100%' }}>
        <FormLabel component="legend">Select a course:</FormLabel>
        <Select value={selectedOption} onChange={handleSelectChange} fullWidth>
            {/* {courses && (
                courses.map((course, index) => (
                    <MenuItem value="option4">
                        <Radio checked={selectedOption === "option4"} />
                        <span>Option 4</span>
                    </MenuItem>
                ))
            )} */}
            <MenuItem value="option4">
            <Radio checked={selectedOption === "option4"} />
            <span>Option 4</span>
            </MenuItem>
            <MenuItem value="option5">
            <Radio checked={selectedOption === "option5"} />
            <span>Option 5</span>
            </MenuItem>
            <MenuItem value="option6">
            <Radio checked={selectedOption === "option6"} />
            <span>Option 6</span>
            </MenuItem>

        </Select>
        </FormControl>
        <input type="hidden" name='course_Id' value={selectedOption} />
    </Box>
  )
}

export default SelectCourse

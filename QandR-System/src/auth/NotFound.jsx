import React from 'react'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'

const NotFound = () => {
  return (
    <Box>
      <Typography variant='h2' sx={{textAlign: 'center'}}>404 - Not Found</Typography>
      <div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
        <Typography variant='h4'>Sorry, the page you are looking for could not be found.</Typography>
      </div>
    </Box>
  )
}

export default NotFound

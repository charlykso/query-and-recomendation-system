import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventIcon from '@mui/icons-material/Event'
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const Breadcrumb = ({location}) => {
  const [button, setButton] = useState(1)
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  }
  useEffect(() => {
    if (location === '/admin/students') {
      setButton(1)
    } else if (location === '/admin/lecturers') {
      setButton(2)
    } else if (location === '/admin/events') {
      setButton(3)
    } else if (location === '/admin/courses') {
      setButton(4)
    } else {
      setButton(-1)
    }
  }, [location])
  return (
    <Box role="presentation" sx={{ maxWidth: '100%'}}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 1 }} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Grid xs={6} sm={6} md={10} sx={{}}>
            <Breadcrumbs aria-label="breadcrumb" separator="/" maxItems={2} sx={{px: 2}}>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin"
              >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
              </Link>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/students"
              >
              <People sx={{ mr: 0.5 }} fontSize="inherit" />
              Students
              </Link>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/Lecturers"
              >
              <SchoolIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Lecturers
              </Link>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/Events"
              >
              <EventIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Events
              </Link>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/Courses"
              >
              <LibraryBooksIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Courses
              </Link>
            </Breadcrumbs>
          </Grid>
          <Grid xs={6} sm={6} md={2} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end'}}>
            {button == 1 && 
            <Link
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/Students/create"
              ><Button variant="contained">+ AddStudent</Button>
              </Link>
              }
            {button == 2 && 
            <Link
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/Lecturers/create"
              ><Button variant="contained">+ AddLecturer</Button>
              </Link>
              }
            {button == 3 && 
            <Link
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/createEvent"
              ><Button variant="contained">+ AddEvent</Button>
              </Link>
              }
            {button == 4 && 
            <Link
              underline="none"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/admin/createStudent"
              ><Button variant="contained">+ AddCourse</Button>
              </Link>
              }
            {button == -1 && (<Button variant='contained' onClick={handleGoBack} >Go Back</Button>)}
        </Grid>
      </Grid>
    </Box>
  )
}

export default Breadcrumb

import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import People from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import Grid from '@mui/material/Unstable_Grid2';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable'

const LecturerBreadcrumbs = ({location}) => {
    const [button, setButton] = useState(1)
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    }

    useEffect(() => {
      if (location === '/lecturer') {
        setButton(1)
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
              href="/lecturer"
              >
              <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Home
              </Link>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/lecturer/events/queries"
              >
              <EventBusyIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Queries
              </Link>
              <Link
              underline="hover"
              sx={{ display: 'flex', alignItems: 'center' }}
              color="inherit"
              href="/lecturer/events/recommendations"
              >
              <EventAvailableIcon sx={{ mr: 0.5 }} fontSize="inherit" />
              Recommendations
              </Link>
            </Breadcrumbs>
          </Grid>
            <Grid xs={6} sm={6} md={2} lg={2} sx={{ display: 'flex', justifyContent: 'flex-end'}}>        
                {button == -1 && (<Button variant='contained' onClick={handleGoBack} >Go Back</Button>)}
            </Grid>
      </Grid>
    </Box>
  )
}

export default LecturerBreadcrumbs

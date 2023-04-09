import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import People from '@mui/icons-material/People';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventIcon from '@mui/icons-material/Event';
import Typography from '@mui/material/Typography'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  height: 140,
  color: theme.palette.text.secondary,
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AdminHome = () => {
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 12 }}>
            <Grid item xs={6}>
              <Paper
                variant="outlined"
                sx={{
                  bgcolor: 'background.gray',
                }}
                >
                <Item>100
                  
                <Typography variant='h4' >
                  <People sx={{ fontSize: 50 }}/> Students
                </Typography>
                </Item>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                variant="outlined"
                sx={{
                  bgcolor: 'background.gray',
                }}
                >
                <Item>10
                  <Typography variant='h4' >
                  <SchoolIcon sx={{ fontSize: 50}} /> Lecturers
                </Typography>
                </Item>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                variant="outlined"
                sx={{
                  bgcolor: 'background.gray',
                }}
                >
                <Item>62
                  <Typography variant='h4' >
                  <LibraryBooksIcon sx={{fontSize: 50}}/> Courses
                </Typography>
                </Item>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                variant="outlined"
                sx={{
                  bgcolor: 'background.gray',
                }}
                >
                <Item>5
                  <Typography variant='h4' >
                  <EventIcon sx={{fontSize: 50}}/> Events
                </Typography>
                </Item>
              </Paper>
            </Grid>
          </Grid>
  )
}

export default AdminHome

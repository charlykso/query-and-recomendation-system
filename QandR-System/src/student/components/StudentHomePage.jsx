import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';

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

const StudentHomePage = () => {
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
                        <EventBusyIcon sx={{ fontSize: 50 }}/> Queries
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
                            <EventAvailableIcon sx={{ fontSize: 50}} /> Recomendations
                        </Typography>
                    </Item>
                </Paper>
            </Grid>
    </Grid>
  )
}

export default StudentHomePage

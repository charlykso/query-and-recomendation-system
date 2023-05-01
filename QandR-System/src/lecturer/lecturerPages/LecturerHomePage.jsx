import React from 'react'
import Grid from '@mui/material/Grid'
import Paper from '@mui/material/Paper'
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography'
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { getQueryEventsURL, getRecommendationEventsURL } from '../../api';
import useFetch from '../../hooks/useFetch';

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

const LecturerHomePage = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const Alltoken = JSON.parse(user.Token)
  const token = Alltoken.token
  var listQueries = []
  var listRecommendations = []

  const {data: queries, isLoading: queriesLoading, error: queriesError} = useFetch(getQueryEventsURL, token)
  const {data: recommendations, isLoading: recomLoading, error: recomError} = useFetch(getRecommendationEventsURL, token)

  if (queries) {
    queries.map((query) => {
      if (query.LecturerId === user.Id) {
        listQueries.push(query)
      }
    })
  }
  if (recommendations) {
    recommendations.map((recom) => {
      if (recom.LecturerId === user.Id) {
        listRecommendations.push(recom)
      }
    })
  }
  return (
    <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 2, md: 12 }}>
            <Grid item xs={6}>
              <Paper
                variant="outlined"
                sx={{
                  bgcolor: 'background.gray',
                }}
                >
                <Item>
                  {queriesLoading && 'Loading ...'}
                  {queries && listQueries.length}
                  {queriesError && <div className='text-red-500'>{queriesError}</div>}
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
                    <Item>
                      {recomLoading && 'Loading ...'}
                      {recommendations && listRecommendations.length}
                      {recomError && <div className='text-red-500'>{recomError}</div>}
                        <Typography variant='h4' >
                            <EventAvailableIcon sx={{ fontSize: 50}} /> Recomendations
                        </Typography>
                    </Item>
                </Paper>
            </Grid>
    </Grid>
  )
}

export default LecturerHomePage

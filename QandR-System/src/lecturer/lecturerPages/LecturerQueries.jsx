import React, { useState } from 'react'
import { getQueryEventsURL } from '../../api'
import { useLocation } from 'react-router-dom'
import LecturerBreadcrumbs from '../lecturerSubPages/LecturerBreadcrumbs'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { FilterMatchMode } from 'primereact/api'
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import useFetch from '../../hooks/useFetch'
import Typography from '@mui/material/Typography'
import CircularProgress from '@mui/material/CircularProgress'

const LecturerQueries = () => {
    const location = useLocation()
    const listQueries = []
    const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS },
        })
    const user = JSON.parse(localStorage.getItem('user'))
    const Alltoken = JSON.parse(user.Token)
    const token = Alltoken.token
    const { data, isLoading, error} = useFetch(getQueryEventsURL, token)
    if (user) {
        // console.log(user);
    }
  if (data) {
    // console.log(data);
    data.map((da) => 
    {
            // console.log(da.LecturerId);
            if (da.LecturerId === user.Id) {
            // console.log(da);
            listQueries.push(da)
        }}
    )
  }
  if (listQueries) {
      // console.log(listQueries);
  }
  return (
    <Box sx={{ p: 1}}>
      <LecturerBreadcrumbs location={location.pathname} />
        <Box
            component="form"
            sx={{
            '& > :not(style)': {width: '100%', mt: 1, mb: 1 },
            }}
            noValidate
            autoComplete="off"
            onInput={(e) => 
            setFilters({
            global: {value: e.target.value, matchMode: FilterMatchMode.CONTAINS},
            })
            }
        >
            <TextField id="outlined-basic" label="Search" variant="outlined" />
        </Box>
        <Typography variant='h4' sx={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
          My Queries
        </Typography>
        {error && <div className='text-red-500'>{error}</div>}
        {isLoading && (
              <div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                <CircularProgress />
              </div>
        )}
        {listQueries && 
          <DataTable value={listQueries} filters={filters} paginator scrollable rows={5} rowsPerPageOptions={[5, 10, 15]} totalRecords={listQueries.length}>
            <Column field='Course_code' header='Course code' />
            <Column field='Description' header='Description' sortable/>
            <Column field='Created_at' header='Date Created' />
          </DataTable>}
    </Box>
  )
}

export default LecturerQueries

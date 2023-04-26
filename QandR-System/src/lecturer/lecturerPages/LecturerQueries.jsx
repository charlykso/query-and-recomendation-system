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

const LecturerQueries = () => {
    const location = useLocation()
    const listQueries = []
    const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS },
        })
    const user = JSON.parse(localStorage.getItem('user'))
    const { data, isLoading, error} = useFetch(getQueryEventsURL)
    if (user) {
        console.log(user);
    }
  if (data) {
    console.log(data);
    data.map((da) => 
    {
            console.log(da.LecturerId);
            if (da.LecturerId === user.Id) {
            console.log(da);
            listQueries.push(da)
        }}
    )
  }
  if (listQueries) {
      console.log(listQueries);
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
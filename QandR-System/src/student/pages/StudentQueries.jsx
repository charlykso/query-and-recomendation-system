import React, { useState } from 'react'
import { useLocation } from 'react-router-dom'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import { FilterMatchMode } from 'primereact/api'
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import useFetch from '../../hooks/useFetch'
import { getStudentQueryEvents } from '../../api'
import StudentBreadcrumbs from '../components/StudentBreadcrumbs';
import CircularProgress from '@mui/material/CircularProgress';

const StudentQueries = () => {
    const location = useLocation()
    const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS },
        })
    const user = JSON.parse(localStorage.getItem('user'))
    const url = getStudentQueryEvents + user.Id + '/queries'
    const { data, isLoading, error} = useFetch(url)
  return (
    <Box sx={{ p: 1}}>
      <StudentBreadcrumbs location={location.pathname} />
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
        {error && <div className='text-red-500'>{error}</div>}
          {isLoading && (<div className='absolute flex justify-center items-center min-h-full mt-5 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                  <CircularProgress />
                </div>
          )}
        {data && 
          <DataTable value={data} filters={filters} paginator scrollable rows={5} rowsPerPageOptions={[5, 10, 15]} totalRecords={data.length}>
            <Column field='Course_code' header='Course code' sortable />
            <Column field='Description' header='Description' sortable/>
            <Column field='Created_at' header='Date Created' sortable />
          </DataTable>}
    </Box>
  )
}

export default StudentQueries

import React, {useState} from 'react'
import Box from '@mui/material/Box'
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';
import useFetch from '../../hooks/useFetch';
import { getLecturers } from '../../api';
import { FilterMatchMode } from 'primereact/api'
import { InputText } from 'primereact/inputtext'
import Breadcrumb from '../adminSubPages/Breadcrumb';
import { useLocation } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import DeleteIcon from '@mui/icons-material/Delete';
import Link from '@mui/material/Link'
import EditIcon from '@mui/icons-material/Edit';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'


const AdminLecturers = () => {
  const location = useLocation()
  const [filters, setFilters] = useState({
    global: {value: null, matchMode: FilterMatchMode.CONTAINS },
  })
  const { data, isLoading, error} = useFetch(getLecturers)
  if (data) {
    // console.log(data);
  }
  const deleteLecturer = (data) => {
    return <Box sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}}>
              <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href={`/lecturer/${data.Id}/delete`}
                >
                <DeleteIcon />
            </Link>
            <Link
                underline="hover"
                sx={{ display: 'flex', alignItems: 'center' }}
                color="inherit"
                href={`/lecturer/${data.Id}/edit`}
                >
                <EditIcon />
            </Link>
          </Box>
  }
  return (
    <Box sx={{ p: 1}}>
      <Breadcrumb location={location.pathname} />
        
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
          {isLoading && "Loading..."}
          {data && 
          <DataTable value={data} filters={filters} paginator scrollable scrollHeight="400px" style={{  }} rows={2} rowsPerPageOptions={[5, 10, 15]} totalRecords={data.length}>
            <Column field='Title' header='Title' />
            <Column field='Firstname' header='FirstName' sortable/>
            <Column field='Lastname' header='LastName' sortable />
            <Column field='Email' header='Email' />
            <Column field='Gender' header='Gender' />
            <Column field='PhoneNumber' header='Phone Number' />
            <Column header='Action' body={deleteLecturer} />
          </DataTable>}
        
    </Box>
  )
}

export default AdminLecturers

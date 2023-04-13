import React from 'react'
import Box from '@mui/material/Box'
import useFetch from '../../hooks/useFetch'
import { getStudents } from '../../api'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {DataTable} from 'primereact/datatable'
import { Column } from 'primereact/column';

const AdminStudents = () => {
    const { data, isLoading, error} = useFetch(getStudents)
    // console.log(data);
  return (
    <Box>
        {isLoading && <h1>Loading...</h1>}
        {error && error}
        {data && <List>
          {data.map((text, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  
                </ListItemIcon>
                <ListItemText primary={text.Firstname} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>}
    </Box>
  )
}

export default AdminStudents

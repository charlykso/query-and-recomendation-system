import React from 'react'
import Sidebar from '../adminSubPages/Sidebar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AdminLanding = () => {
  return (
    <Box sx={{ }}>
        <CssBaseline />
        <Sidebar />
        <Box sx={{pt: 3, pb: 11, pr: 3, pl: 11}}>
          <DrawerHeader />
            <Outlet />
        </Box>
    </Box>
  )
}

export default AdminLanding

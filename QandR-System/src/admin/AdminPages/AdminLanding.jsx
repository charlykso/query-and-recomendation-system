import React from 'react'
import Sidebar from '../adminSubPages/Sidebar'
import Box from '@mui/material/Box'
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { Outlet } from 'react-router-dom';

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

const AdminLanding = () => {
  return (
    <Box sx={{ display: 'flex' }}>
        <Sidebar />
        <DrawerHeader />
        <Box component="main" sx={{ flexGrow: 1, px: 3, py: 10,  }}>
          <Outlet />
        </Box>
    </Box>
  )
}

export default AdminLanding

import React from 'react'
import { styled, useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import People from '@mui/icons-material/People';
import Dashboard from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import EventIcon from '@mui/icons-material/Event';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import {useState} from 'react';
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import RestoreIcon from '@mui/icons-material/Restore';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import { Link } from 'react-router-dom'
import Tooltip from '@mui/material/Tooltip'
import BallotIcon from '@mui/icons-material/Ballot';
import useLogout from '../../hooks/useLogout';

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

const StudentSidebar = () => {

    const [anchorEl, setAnchorEl] = useState(null)
    const [value, setValue] = useState(0);
    const { logout } = useLogout()
    const openMenu = Boolean(anchorEl)
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget)
    }
    const handleClose = () => {
        setAnchorEl(null)
    }

    const theme = useTheme();
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleLogout = () => {
    logout()
  }
  return (
    <>
        {/* <CssBaseline /> */}
        <AppBar position="fixed" open={open}>
          <Toolbar>
            <IconButton
                color="inherit"
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                marginRight: 5,
                ...(open && { display: 'none' }),
                }}
            >
                <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{flexGrow: 1}}>
                Student Q & R system
            </Typography>
            <Stack spacing={2} direction='row'>
                <Button color='inherit' onClick={handleLogout}>Logout</Button>
            </Stack>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            <ListItem key='Dashboard' disablePadding sx={{ display: 'block' }}>
            <Link to='/'>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                id='dashboard-button'
                onClick={handleClick}
                aria-controls={openMenu ? 'dashboard-menu' : undefined}
                aria-haspopup='true'
                aria-expanded={openMenu ? 'true' : undefined}
              >
                
        
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  <Tooltip title="Dashboard" arrow>
                    <Dashboard />
                  </Tooltip>
                  </ListItemIcon>
                  <ListItemText primary='Dashboard' sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </Link>
          </ListItem>
          <ListItem key='Query' disablePadding sx={{ display: 'block' }}>
              <Link to='/student/events/queries'>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  id='query-button'
                  onClick={handleClick}
                  aria-controls={openMenu ? 'query-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={openMenu ? 'true' : undefined}
                >
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Queries" arrow>
                      <EventBusyIcon />
                    </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary='Query' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
          </ListItem>
          <ListItem key='Recommendation' disablePadding sx={{ display: 'block' }}>
              <Link to='/student/events/recommendations'>
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: open ? 'initial' : 'center',
                    px: 2.5,
                  }}
                  id='Recommendation-button'
                  onClick={handleClick}
                  aria-controls={openMenu ? 'Recommendation-menu' : undefined}
                  aria-haspopup='true'
                  aria-expanded={openMenu ? 'true' : undefined}
                >
                  
          
                  <ListItemIcon
                    sx={{
                      minWidth: 0,
                      mr: open ? 3 : 'auto',
                      justifyContent: 'center',
                    }}
                  >
                    <Tooltip title="Recommendation" arrow>
                      <EventAvailableIcon />
                    </Tooltip>
                    </ListItemIcon>
                    <ListItemText primary='Recommendation' sx={{ opacity: open ? 1 : 0 }} />
                </ListItemButton>
              </Link>
          </ListItem>
        </List>
      </Drawer>

      <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: '2'}} elevation={1}>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            justifyContent: 'flex-end', alignItems: 'center'
          }}
        >
          <BottomNavigationAction label="Recents" icon={<RestoreIcon />} />
          <BottomNavigationAction label="LinkedIn" icon={<LinkedInIcon />} />
          <BottomNavigationAction label="Facebook" icon={<FacebookIcon />} />
          <BottomNavigationAction label='Github' icon={<GitHubIcon />} />
        </BottomNavigation>
      </Paper>
    </>
  )
}

export default StudentSidebar

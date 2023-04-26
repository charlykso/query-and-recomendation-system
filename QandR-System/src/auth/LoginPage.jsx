import React, { useState } from 'react'
import Login from '@mui/icons-material/Login'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import KeyIcon from '@mui/icons-material/Key';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button'
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import useLogin from '../hooks/useLogin';
import { loginURL } from '../api';

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false)
  const [Email, setEmail] = useState("")
  const [Password, setPassword] = useState("")
  const { signin, isLoading, error } = useLogin()

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(Email, Password);
    const formdata = new FormData()
    formdata.append('Email', Email)
    formdata.append('Password', Password)

    await signin(loginURL, formdata)
  }
  return (
    <Box sx={{ width: '100%', height: "100vh"}}>
      <Box sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center',
        }}>
          <Typography variant='h4' my={3}>
            Sign in
          </Typography>
        <form onSubmit={handleSubmit}  className=' w-[50%] p-4'>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 3, width: '100%' }}>
            <PersonIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField 
              id="input-email" 
              label="Email" 
              variant="standard" 
              onChange={(e) => setEmail(e.target.value)} 
              type='email' 
              fullWidth name='Email'
            />
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'flex-end', my: 3 }}>
            <KeyIcon sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
            <TextField 
              id="input-password" 
              label="Password" 
              variant="standard" 
              onChange={(e) => setPassword(e.target.value)}  
              fullWidth type={showPassword ? 'text' : 'password'} name='Password' 
              InputProps={{
                endAdornment:(
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />
          </Box>
          <Box sx={{mb: 2, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            Not yet registered? you can register with this registration <Link to='/register' className='text-blue-500'>link</Link>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Button variant="contained" startIcon={<Login />} type='submit' disabled={isLoading}>
              Login
            </Button>
          </Box>
          {error && <div className='text-red-500'>{error}</div>}
        </form>
      </Box>
    </Box>
  )
}

export default LoginPage

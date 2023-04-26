import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import './style/index'
import 'react-router-dom'
import { BrowserRouter } from 'react-router-dom'
import { AuthContextProvider } from './context/AuthContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthContextProvider>
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </AuthContextProvider>
  </BrowserRouter>
)

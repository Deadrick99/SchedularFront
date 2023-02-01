import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter,Routes,  Route } from 'react-router-dom'
import App from './App'
import './App.css'
import { AuthProvider } from './Context/AuthProvider'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <AuthProvider>
    <Routes>
      <Route path='/*'element= {<App/>}/>
    </Routes>
    </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
)

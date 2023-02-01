import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router'
import "../dist/output.css"
import Login from './components/Login'
function App() {
  
  return (
    <div >
    <Navbar/>
    <Routes>
    <Route path='login' element={<Login/>}/>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App

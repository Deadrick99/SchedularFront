
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Routes,Route } from 'react-router'
import Login from './components/Login'
import Register from './components/Register'
import Layout from './components/Layout'
import RequireAuth from "./components/requireAuth"
import Availability from './components/Availability'
import PersistLogin from './components/PersistLogin'
function App() {
  
  return (
    <div >
    <Navbar/>
    <Routes>
      
    <Route path='login' element={<Login/>}/>
    <Route path ="register" element={<Register/>}/>
    <Route element= {<PersistLogin/>}>
    <Route element={<RequireAuth allowedRoles={[6213]}/>}>
      <Route path='/' element={<Layout/>}/>
            <Route path='/availability' element={<Availability/>}/>
          </Route>
          </Route>
    </Routes>
    <Footer/>
   </div>
  )
}

export default App

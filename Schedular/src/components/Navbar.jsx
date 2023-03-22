import React from 'react'
import "../output.css"
import {MdSchedule,} from "react-icons/md"
import {GiHamburgerMenu} from "react-icons/gi"
import { useState } from "react"
import { Link } from 'react-router-dom'
import useLogout from '../Hooks/useLogout'
import useAuth from '../Hooks/useAuth'
function Navbar() {
  const {auth } = useAuth();
  const [navbar,useNavbar] = useState("hidden")
  const logout = useLogout()
  const toggleNav = () =>{
    if (navbar === "hidden")
    useNavbar("")
    else
    useNavbar("hidden")
    
  }
  const handleLogout = async () =>{
    console.log(logout)
      await logout()
    }
  return (
    <nav className='p-3 h-16 w-full  sticky top-0 bg-gray-800 border-gray-700'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <a href='#' className='flex items-center'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap text-white'><MdSchedule/></span>
          <span className='self-center text-xl font-semibold whitespace-nowrap text-white' >FastSchedule</span>
        </a>
        <button type="button" className='inline-flex items-center p-2 ml-3 text-sm  rounded-lg hover:cursor-pointer  focus:ring-2
          text-gray-400 hover:bg-gray-700 focus:ring-gray-600'
          aria-controls= "navbar-hamburger"aria-expanded="false" onClick={toggleNav}>
         <span className="sr-only">Open main menu</span>
         <span className='text-2xl self-center font-semibold whitespace-nowrap text-white' aria-hidden="true"><GiHamburgerMenu/></span>
         </button>
         <div className={`${navbar} w-full text-white`} id= "navbar-hamburger" >
          <ul className='flex flex-col mt-4 rounded-lg  bg-gray-800 border-gray-700' >
            <li>
             <Link to="/" onClick={toggleNav} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded " aria-current="page">Home</Link>
            </li>
            <li  className= {auth?.roles?.find( role => role ==2652)? "" :"hidden"}>
              <Link to="/storehours" onClick ={toggleNav} className = "block py-2 pl-3 pr-4  rounded  text-gray-100 hover:bg-gray-700 hover:text-white">Store Hours</Link>
            </li>
            <li  className= {auth?.roles?.find( role => role ==2652)? "" :"hidden"}>
              <Link to="/storeshifts" onClick ={toggleNav} className = "block py-2 pl-3 pr-4  rounded bg-blue-700 text-gray-100 hover:bg-gray-700 hover:text-white">Store Shifts</Link>
            </li>
            <li  className= {auth?.roles?.find( role => role ==2652)? "" :"hidden"}>
              <Link to="/makeschedule" onClick ={toggleNav} className = "block py-2 pl-3 pr-4  rounded  text-gray-100 hover:bg-gray-700 hover:text-white">Make Schedule</Link>
            </li>
            <li>
             <Link to="/comingsoon" className="block py-2 pl-3 pr-4  rounded  text-gray-100 bg-blue-700 hover:bg-gray-700 hover:text-white">Release a Shift</Link>
            </li>
            <li>
             <Link to="/comingsoon" className="block py-2 pl-3 pr-4  rounded  text-gray-100 hover:bg-gray-700 hover:text-white">My Requests</Link>
            </li>
            <li>
             <Link to="/comingsoon" className="block py-2 pl-3 pr-4  rounded  text-gray-100 bg-blue-700 hover:bg-gray-700 hover:text-white">Available Shifts</Link>
            </li>
            <li>
             <Link to={"/availability"} onClick={toggleNav} className="block py-2 pl-3 pr-4  rounded  text-gray-100 hover:bg-gray-700 hover:text-white">My Availablity</Link>
            </li>
            <li>
             <Link onClick={handleLogout} href="#" className="block py-2 pl-3 pr-4  rounded bg-blue-700  text-gray-100 hover:bg-gray-700 hover:text-white">Logout</Link>
            </li>
          </ul>
         </div>
      </div>
    </nav>
  )
}

export default Navbar
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
    <nav className='p-3 h-16 w-full border-gray-200 bg-gray-50 sticky top-0 dark:bg-gray-800 dark:border-gray-700'>
      <div className='container flex flex-wrap items-center justify-between mx-auto'>
        <a href='#' className='flex items-center'>
          <span className='self-center text-2xl font-semibold whitespace-nowrap dark:text-white'><MdSchedule/></span>
          <span className='self-center text-xl font-semibold whitespace-nowrap dark:text-white' >FastSchedule</span>
        </a>
        <button type="button" className='inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg hover:cursor-pointer hover:bg-gray-100 focus:ring-2
         focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600'
          aria-controls= "navbar-hamburger"aria-expanded="false" onClick={toggleNav}>
         <span className="sr-only">Open main menu</span>
         <span className='text-2xl self-center font-semibold whitespace-nowrap dark:text-white' aria-hidden="true"><GiHamburgerMenu/></span>
         </button>
         <div className={`${navbar} w-full`} id= "navbar-hamburger" >
          <ul className='flex flex-col mt-4 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700' >
            <li>
             <Link to="/" onClick={toggleNav} className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded dark:bg-blue-600" aria-current="page">Home</Link>
            </li>
            <li  className= {auth?.roles?.find( role => role ==2652)? "" :"hidden"}>
              <Link to="/storehours" onClick ={toggleNav} className = "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Store Hours</Link>
            </li>
            <li  className= {auth?.roles?.find( role => role ==2652)? "" :"hidden"}>
              <Link to="/storeshifts" onClick ={toggleNav} className = "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Store Shifts</Link>
            </li>
            <li  className= {auth?.roles?.find( role => role ==2652)? "" :"hidden"}>
              <Link to="/makeschedule" onClick ={toggleNav} className = "block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Make Schedule</Link>
            </li>
            <li>
             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Release a Shift</a>
            </li>
            <li>
             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">My Requests</a>
            </li>
            <li>
             <a href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Available Shifts</a>
            </li>
            <li>
             <Link to={"/availability"} onClick={toggleNav} className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">My Availablity</Link>
            </li>
            <li>
             <Link onClick={handleLogout} href="#" className="block py-2 pl-3 pr-4 text-gray-700 rounded hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white">Logout</Link>
            </li>
          </ul>
         </div>
      </div>
    </nav>
  )
}

export default Navbar
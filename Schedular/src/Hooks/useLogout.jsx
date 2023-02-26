import axios from "../api/axios"
import useAuth from "./useAuth"

import React from 'react'

function useLogout() {
    const {auth,setAuth} = useAuth();
    const logout = async() => {
        setAuth({})
        console.log(auth.id)
        try {
            const response = await axios('/logout', {
                withCredentials:true
            })
        } catch (error) {
            console.error(error)
        }
    }
  return (
    logout
  )
}

export default useLogout
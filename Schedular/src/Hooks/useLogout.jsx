import Axios from "../api/axios"
import useAuth from "./useAuth"

import React from 'react'

function useLogout() {
    const {setAuth} = useAuth();
    const logout = async() => {
        setAuth({})
        try {
            const response = await axios('/logout', {
                withCredentaials:true
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
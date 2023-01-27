import {createContext, useState} from 'react'

const AuthContext = createContext({});

import React from 'react'

export const AuthProvider=({children}) =>{
  return (
   <AuthContext.Provider>
    {children}
   </AuthContext.Provider>
  )
}

export default AuthProvider

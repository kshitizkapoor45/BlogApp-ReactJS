import React, { useState } from 'react'
import globalContext from './GlobalContext'


const UserProvider = ({children}) => {

    const[user,setUser]= useState({
        name:"Komal Rathore"
    })
  return (

    <globalContext.Provider value={user}>
        {children}
    </globalContext.Provider>
     
  )
}

export default UserProvider
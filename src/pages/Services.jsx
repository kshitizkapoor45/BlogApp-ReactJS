import React, { useContext } from 'react'
import globalContext from '../context/GlobalContext'
import Base from '../components/Base'

const Services = () => {
  const user = useContext(globalContext)
  
  return (
    <Base>
     <h2>Welcome {user.name}</h2>
    </Base>
  )
    
}

export default Services
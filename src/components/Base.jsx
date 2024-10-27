import React from 'react'
import NavBar from './NavBar'

const Base = ({title = "Welcome", children}) => {

    return (
        <div className='container-fluid'>
            <NavBar />
            {children}
        </div>
    )
}

export default Base
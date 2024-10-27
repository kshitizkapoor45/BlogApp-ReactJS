import React from 'react'
import Base from '../components/Base'
import AddPost from '../components/AddPost'
import { Container } from 'reactstrap'

export const UserDashBoard = () => {
  return (
     <Base>
       <Container>
         <AddPost />
       </Container>
     </Base>
  )
}

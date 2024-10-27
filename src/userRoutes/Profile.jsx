import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { getUserId } from '../auth'
import { getPostByUser } from '../services/PostService'
import { toast } from 'react-toastify'
import Post from '../components/Post'
import { Col, Container, Row } from 'reactstrap'

const Profile = () => {
  const[user,setUser] = useState({})
  const[posts,setPosts] = useState([])

  useEffect(()=> {
     const userId = getUserId();
    setUser(userId);
    getPostByUser(userId).then(data => {
      console.log(data)
      setPosts([...data])
    }).catch(error => {
      console.log(error)
      toast.error("Error Occured")
    })



  },[])
  return (
    <Base>
     <Container className='mt-3 border-0 shadow-sm'>
        <Row>
          <Col md={12} className='pt-3 mb-2 shadow-sm'>
            <h2>Your Blogs: {posts.length}</h2>
            {
              posts && posts.map((post,index) => {
                return (
                  <Post post={post} key={index} />
                )
              })
            }
         
          </Col>
        </Row>
      </Container>
      
    </Base>
  )
}

export default Profile
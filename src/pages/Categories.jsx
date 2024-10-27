import React, { useEffect, useState } from 'react'
import Base from '../components/Base'
import { useParams } from 'react-router-dom'
import { Col, Container, Row } from 'reactstrap'
import CategorySideMenu from '../components/CategorySideMenu'
import { getPostCategory } from '../services/PostService'
import { toast } from 'react-toastify'
import Post from '../components/Post'

const Categories = () => {

    const { categoryId } = useParams()
    const [posts, setPosts] = useState([])

    useEffect(() => {
        console.log(categoryId)
        getPostCategory(categoryId).then(data => {

            setPosts([...data.content]);
        }).catch(error => {
            console.log(error)
            toast.error("Could Not load")
        })


    }, [categoryId])
    return (
        <Base>
            <Container className='mt-3'>
                <Row>
                    <Col md={2} className='pt-3 mb-2'>
                        <CategorySideMenu />
                    </Col>
                    <Col md={9}>

                        <h1>Blogs Count: {posts.length}</h1>
                        {
                            posts && posts.map((post, index) => {
                                return (
                                    <Post key={index} post={post} />
                                )
                            })
                        }

                    </Col>
                </Row>
            </Container>
        </Base>
    )
}

export default Categories
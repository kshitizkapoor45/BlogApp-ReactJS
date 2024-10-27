import React, { useEffect, useState } from 'react'
import { getAllPosts } from '../services/PostService'
import { Col, Container, Pagination, PaginationItem, PaginationLink, Row } from 'reactstrap'
import Post from './Post'
import { toast } from 'react-toastify'
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeed = () => {

    const [postContent, setPostContent] = useState({
        content: [],
        totalPages: '',
        totalElements: '',
        pageSize: '',
        lastPage: false,
        pageNumber: ''


    })

    const [currentPage, setCurrentPage] = useState(0)

    useEffect(() => {

        ChangePage(currentPage)

    }, [currentPage])

    const ChangePage = (pageNumber = 0, pageSize = 5) => {
        if (pageNumber > postContent.pageNumber && postContent.lastPage) {
            return;
        }
        if (pageNumber < postContent.pageNumber && postContent.pageNumber == 0) {
            return;
        }
        getAllPosts(pageNumber, pageSize).then((data) => {
            setPostContent({
                content: [...postContent.content, ...data.content],
                totalPages: data.totalPages,
                totalElements: data.totalElements,
                pageSize: data.pageSize,
                lastPage: data.lastPage,
                pageNumber: data.pageNumber
            })

        }).catch(error => {
            toast.error("Error in Loading New Posts")
        })



    }
    const changePageInfinite = () => {
        console.log("Page loaded Infinitely")
        setCurrentPage(currentPage + 1)

    }
    return (
        <div className='container-fluid'>
            <Row>
                <Col md={
                    {
                        size: 10,
                        offset: 1
                    }
                }>
                    <h1>Blogs Count {postContent?.totalElements}</h1>

                    <InfiniteScroll
                        dataLength={postContent.content.length}
                        next={changePageInfinite}
                        hasMore={!postContent.lastPage}
                        loader={<h4>Loading...</h4>}
                        endMessage={
                            <p style={{textAlign:'center', fontSize:'30px'}}>
                                <b>You are all caught up !!</b>
                            </p>
                        }
                    >
 

                        {
                            postContent.content.map((post) => (
                                <Post post={post} key={post.postid} />
                            ))
                        }

                    </InfiniteScroll>
                    {/* <Container className='center'>
            <Pagination size='lg'>
                <PaginationItem onClick={()=>ChangePage(postContent.pageNumber - 1)} disabled={postContent.pageNumber==0}>
                    <PaginationLink previous>
                        Previous
                    </PaginationLink>
                </PaginationItem>
                {
                    [...Array(postContent.totalPages)].map((item,index)=>(
                        <PaginationItem onClick={()=>ChangePage(index)} active={index==postContent.pageNumber} key={index}>
                            <PaginationLink>
                                {index+1}
                            </PaginationLink>
                        </PaginationItem>
                    ))
                }
                <PaginationItem onClick={()=> ChangePage(postContent.pageNumber + 1)} disabled={postContent.lastPage}>
                    <PaginationLink next>
                         Next
                    </PaginationLink>
                </PaginationItem>
             </Pagination>
            </Container> */}
                </Col>
            </Row>

        </div>
    )
}

export default NewFeed
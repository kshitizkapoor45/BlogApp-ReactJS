import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { Link, useParams } from 'react-router-dom';
import { Button, Card, CardBody, CardText, Col, Container, Input, Row } from 'reactstrap';
import { createComment, loadPost } from '../services/PostService';
import { toast } from 'react-toastify';
import { BASE_URL } from '../services/Helper';
import { isLoggedIn } from '../auth';

const PostPage = () => {
    const { postId } = useParams();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState({
        content: '',
        userId: '',
        name: ''
    });

    useEffect(() => {
        // Load the post when the component is mounted or when postId changes
        loadPost(postId)
            .then(data => {
                console.log(data);
                setPost(data);
            }).catch(error => {
                toast.error("Could Not load");
            });

        // Retrieve user details from local storage
        const details = {
            id:localStorage.getItem("userId"),
            Name:localStorage.getItem("name"),
        }
       
        if (details) {
            setComment({
                ...comment,
                userId: details.id,  // Assuming user ID is stored as "id"
                name: details.Name    // Assuming user name is stored as "name"
            });
        }
    }, [postId]);  // Only reload when postId changes

    function CurrentDate(numbers) {
        return new Date(numbers).toLocaleDateString();
    }

    const submitPost = () => {
        if(!isLoggedIn())
        {
            toast.error("Log in to Add your Comment")
            return
        }


        if (!comment.content.trim()) {
            toast.error("Comment content cannot be empty");
            return;
        }

        createComment(comment, post.postId, comment.userId, comment.name)
            .then(data => {
                console.log(data);
                toast.success("Comment Added");
                setPost({
                    ...post,
                    comments: [...post.comments, data.data]
                });
                // Clear the comment field after submitting
                setComment({ ...comment, content: '' });
            }).catch(error => {
                console.log(error);
                toast.error("Failed to add comment");
            });
    };

    return (
        <Base>
            <Container className='mt-4 border-0 shadow-sm'>
                <Link className='btn btn-secondary' to={'/'}>Home</Link>
                <Row>
                    <Col md={{ size: 12 }}>
                        <Card className='mt-3 ps-2 border-0 shadow-sm'>
                            <CardBody>
                                <CardText>
                                    Posted By <b>{post?.user.name}</b> on <b>{CurrentDate(post?.addDate)}</b>
                                </CardText>
                                <CardText>
                                    <span className='text-muted'>Post Category: {post?.category.categoryTitle}</span>
                                </CardText>
                                <div style={{ height: '1.5px', width: '100%', backgroundColor: 'wheat' }}></div>
                                <CardText className='mt-3'>
                                    <h3>{post?.title}</h3>
                                </CardText>
                                <div className='image-container mt-3' style={{ width: '20%' }}>
                                    <img className='img-fluid' src={BASE_URL + '/api/post/image/' + post?.imageName} alt='' />
                                </div>
                                <CardText className='mt-3' dangerouslySetInnerHTML={{ __html: post?.content }}></CardText>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <Row className='mt-4'>
                    <Col md={{ size: 6, offset: 1 }}>
                        <h3>Comments: {post ? post.comments.length : 0} </h3>
                        {
                            post && post.comments.map((c, index) => (
                                <Card className='mt-2 border-0' key={index}>
                                    <CardBody>
                                        <CardText>
                                            <p><b>{c.name}</b></p>
                                            {c.content}
                                        </CardText>
                                    </CardBody>
                                </Card>
                            ))
                        }
                        <Card className='mt-2 border-0'>
                            <CardBody>
                                <Input
                                    type="textarea"
                                    placeholder='Comment here....'
                                    value={comment.content} // Corrected the field name
                                    onChange={(e) => setComment({ ...comment, content: e.target.value })} // Keep userId and name intact
                                />
                                <Button onClick={submitPost} color='primary' className='mt-2'>Submit</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}

export default PostPage;

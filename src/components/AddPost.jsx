import React, { useEffect, useRef, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label } from 'reactstrap'
import { loadAllCategories } from '../services/CategoryService'
import JoditEditor from 'jodit-react'
import { newPost, uploadImage } from '../services/PostService'
import {  getUserId } from '../auth'
import { toast } from 'react-toastify'

const AddPost = () => {

    const[categories, setCategories]= useState([])
    const editor = useRef(null)
    const [post, setPost] = useState({
        title:'',
        content:'',
        categoryId:''
    })

    const [userId, setUserId] = useState(undefined)
    const[image,setImage] = useState(null)

  useEffect(() => {
     
    setUserId(getUserId())
    loadAllCategories()
    .then((data) => {
        console.log(data)
        setCategories(data)
    })
    .catch(error => {
        console.log(error)
    })

  },[])

  const feildChange = (e) => {
    setPost({...post, [e.target.name]:e.target.value})

  }
  const contentFeild = (data) => {
      setPost({...post,'content':data})
  }

  const createPost = (e) => {
     e.preventDefault()
     console.log(post)

     if(post.title.trim()===''){
        alert("Post is required")
        return;
     }

     if(post.content.trim()===''){
        alert("Content is required")
        return;
     }

     if(post.categoryId.trim()===''){
        alert("Category is required")
        return;
     }
    
     post['userId'] = userId;
    newPost(post)
    .then(data => {
        uploadImage(image,data.postId)
        .then(data=>{
            toast.success('Image Uploaded')
        }).catch(error=>{
            console.log(error)
            toast.error('Could not upload')
        })
        toast.success("post created")
        console.log(post)
    })
    .catch((error) => {
        toast.error("Something went wrong")
      
    })



  }
  const handleFileChange = (e) => {
         setImage(e.target.files[0])

  }

    return (
        <div className='wrapper'>
            <Card className='mt-4 shadow-sm'>
                <CardBody>
                    <h3>What's going in your mind</h3>
                    <Form onSubmit={createPost}>
                        <div className='my-3'>
                            <Label for='title'>Post Title</Label>
                            <Input
                                type='text'
                                id='title'
                                name='title'
                                onChange={feildChange}
                                placeholder='Enter here' />
                        </div>

                        <div className='my-3'>
                            <Label for='content'>Post Content</Label>
                             <JoditEditor 
                             ref={editor}
                             value={post.content}
                             onChange={contentFeild}
                             />
                        </div>

                         <div className="mt-3">
                            <Label for='image'>Select Post Banner</Label>
                            <Input id='image' type='file'  onChange={handleFileChange}/>
                         </div>

                        <div className='my-3'>
                            <Label for='category'>Post Category</Label>
                            <Input
                                type='select'
                                id='category'
                                name='categoryId'
                                placeholder='Enter here'
                                onChange={feildChange}
                                defaultValue={0}
                            >
                                <option disabled value={0}>--Select Category--</option>
                              {
                                categories.map((category) => (
                                    <option value={category.categoryId} key={category.categoryId}>
                                       {category.categoryTitle}
                                    </option>
                                ))
                            }
                              
                            </Input>

                        </div>
                        <Container className='text-center'>
                            <Button type='submit' color='primary'>Create Post</Button>
                            <Button color='danger' className='ms-3'>Reset</Button>
                        </Container>
                    </Form>
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost
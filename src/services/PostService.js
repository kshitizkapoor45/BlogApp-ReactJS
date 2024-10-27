import { myAxios, privateAxios } from "./Helper"


export const newPost = (postData) => {
    console.log(postData)
    return privateAxios.post(`/api/user/${postData.userId}/category/${postData.categoryId}/posts`,postData)
    .then(response => response.data)
}

export const getAllPosts = (pageNumber,pageSize) => {
    return myAxios.get(`/api/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=postId&sortDir=desc`)
    .then(response=>response.data)
}

export const loadPost = (postId) => {
    return myAxios.get('/api/posts/'+postId)
    .then((response)=>response.data)
}

export const createComment = (comment,postId,userId,name) => {
    return privateAxios.post(`/api/post/${postId}/user/${userId}/${name}/comments`,comment)

}

export const uploadImage = (image,postId) => {

    let formData = new FormData()
    formData.append("image",image)
    return privateAxios.post(`/api/post/image/upload/${postId}`,formData,{
        headers:{
            'Content-Type':'Multipart/form-data'
        }
    })
    .then((response)=>response.data)

}

export function getPostCategory(categoryId) {
     return privateAxios.get(`/api/category/${categoryId}/posts`)
     .then(res=>{
        console.log(res.data)
        return res.data
     })

}

export function getPostByUser(userId) {
    return privateAxios.get(`/api/user/${userId}/posts`)
    .then(res=>res.data)
}

import React, { useEffect, useState } from 'react'
import { ListGroup, ListGroupItem } from 'reactstrap'
import { loadAllCategories } from '../services/CategoryService'
import { toast } from 'react-toastify'
import { Link } from 'react-router-dom'

const CategorySideMenu = () => {

  const[categories,setCategories] = useState([])

  useEffect(() => {
    loadAllCategories()
    .then(data=>{
      setCategories([...data])
    }).catch(error=>{
      toast.error("Could not load categories")
    })
  },[])


  return (
    <div>
      <ListGroup>
        <ListGroupItem tag={Link} to="/" action={true} className='border-0'>
          All Blogs
        </ListGroupItem>
        {categories && categories.map((cat,index) => {
          return (
            <ListGroupItem key={index} tag={Link} to={"/categories/"+cat.categoryId}  action={true} className='border-0 shadow-sm mt-1'>
              {cat.categoryTitle}
            </ListGroupItem>
          )
        })}
      </ListGroup>
    </div>
  )
}

export default CategorySideMenu
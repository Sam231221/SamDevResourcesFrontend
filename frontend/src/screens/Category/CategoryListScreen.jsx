import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function CategoryListScreen(){
  const [categories, setCategories] = useState([])

  const listCategories = async ()=>{
    const {data} =await axios.get('api/categories')
    setCategories(data)
  } 

  const handleOnDelete= async (id) =>{
    const {data} = await axios.delete(`api/deletecategory/${id}/`)
    console.log(data)
    listCategories()
  }

   useEffect(()=>{
      listCategories()
   }, [])

  return (
    <div className='container mt-3'>
        <table class="table  table-hover" style={{"box-shadow":' 0px 2px 15px rgb(0 0 0 / 6%)'}}>
            <thead className='table-dark'>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody className='bg-white'>
    
            {categories.map((category, i)=>(
                  <tr key={i}>
                     <th scope="row">{category.id}</th>
                      <th scope="row">{category.name}</th>
                      <td colspan="2">
                        <Link to={`/updatecategory/${category.id}`} className='btn btn-primary btn-sm'>Update</Link>
                        <button onClick={()=> handleOnDelete(category.id)} className='btn btn-danger btn-sm mx-3'>Delete</button>
                      </td>
                  </tr>
            ))}


              
            </tbody>

        </table>
    </div>
  )
}

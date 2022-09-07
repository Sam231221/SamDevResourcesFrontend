import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

export default function CategoryUpdateScreen(){
  const {id} =useParams()
  console.log(id)
  const [category, setCategory] = useState('')
 
  const getCategory =async ()=>{
    const {data} = await axios.get(`/api/getcategory/${id}/`)
    console.log(data)
    if (data.success == true){
      console.log(data.category.name)
      setCategory(data.category.name)
    }
  }
  useEffect(()=>{
    getCategory() 
  },[])

  const handleOnSubmit= async (e)=>{
    e.preventDefault()
    const {data} = await axios.put(`/api/updatecategory/${id}/`, {'category':category})
    console.log(data)
 
  }
  return (
    <div className='container p-4 shadow bg-white mt-3'>
        <h3>Update Category</h3>
        <hr className='m-0'></hr>
       <form onSubmit={(e)=>handleOnSubmit(e)}>
       <div className="mb-3">
        <label htmlFor="categoryname" className="form-label">Category</label>
        <input type="text" className="form-control" id="categoryname" onChange={(e)=>{setCategory(e.target.value)}} value={category} />
        </div>

        <input type="submit" className='btn btn-primary btn-sm mt-3' value="Update" />
       </form>
    </div>
  )
}

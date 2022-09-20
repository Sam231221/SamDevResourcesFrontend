import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
export const ResourceTypeCreateScreen = () => {
  const [name,setName] =useState('')
  const [categoryname, setCategoryName] = useState('')

  const redirect = useNavigate();

  const handleOnClick = async () =>{
      const {data} = await axios.post('/api/createresourcetype/',{'category':categoryname, 'name':name})
      console.log(data)
      redirect('/resourcetypes')
  }

  const [categories, setCategories] = useState([])

  const listCategories = async ()=>{
    const {data} =await axios.get('api/categories')
    console.log(data)
    setCategories(data)
  } 
  useEffect(()=>{
    listCategories()
 }, [])

  return (
    <div className='container p-3 shadow bg-white mt-3'>
        <h3>Create ResourceType</h3>
        <hr className='m-0'></hr>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control"  onChange={(e)=>setName(e.target.value)}id="name" placeholder="Enter a Resource Type" />
        </div>

        <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select className="form-select" id="category" value={categoryname} onChange={(e)=>setCategoryName(e.target.value)} aria-label="Default select example">
            <option selected>---</option>
            {categories.map((category, id)=>(
              <option key={id} value={category.name}>{category.name}</option>
            ))}

        </select>
        </div>


         <button type='button' onClick={()=>handleOnClick()} className='btn btn-primary btn-sm mt-3'>Create</button>
    </div>
  )
}

import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const ResourceTypeUpdateScreen = () => {
  const {id} =useParams()
  const redirect = useNavigate();

  const [name,setName] =useState('')
  const [categoryname, setCategoryName] = useState('')
  //for options
  const [categories, setCategories] = useState([])

  const getResourceType =async ()=>{
    const {data} = await axios.get(`/api/getresourcetype/${id}/`)
    console.log(data)
    if (data.success == true){
      console.log(data.resourcetype)
      setName(data.resourcetype.name)
      setCategoryName(data.resourcetype.category_name)
    }
  }

  //for options
  const listCategories = async ()=>{
    const {data} =await axios.get('/api/categories/')
    setCategories(data)
  } 

  useEffect(()=>{
    getResourceType() 
    //for select options
    listCategories()
 }, [])

 const handleOnClick = async () =>{
  const {data} = await axios.put(`/api/updateresourcetype/${id}/`,{'categoryname':categoryname, 'name':name})
  console.log(data)
  redirect('/resourcetypes')
}


  return (
    <div className='container p-3 shadow bg-white mt-3'>
        <h3>Update ResourceType</h3>
        <hr className='m-0'></hr>

        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" onChange={e=> setName(e.target.value)} value={name} />
        </div>

        <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select className="form-select" id="category" value={categoryname} onChange={(e)=>setCategoryName(e.target.value)} aria-label="Default select example">
            <option selected>{categoryname}</option>
            {categories.map((category, id)=>(
              <option key={id} value={category.name}>{category.name}</option>
            ))}

        </select>
        </div>

        <button type='button' onClick={()=>handleOnClick()} className='btn btn-primary btn-sm mt-3'>Update</button>
    </div>
  )
}

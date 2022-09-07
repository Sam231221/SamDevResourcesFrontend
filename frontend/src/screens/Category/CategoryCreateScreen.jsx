import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function CategoryCreateScreen() {
  const redirect = useNavigate()
  const [category, setCategory] =useState('')
  const handleOnClick = async () =>{
        const {data} = await axios.post('/api/createcategory/',{'category':category})
        console.log(data)
        redirect('/categories')
  }

  return (
    <div className='container p-3 shadow bg-white mt-3'>
        <div className="mb-3">
        <label htmlFor="categoryname" className="form-label">Category</label>
        <input type="text" className="form-control" 
          onChange={(e)=>setCategory(e.target.value)}
          id="categoryname" placeholder="Enter a Category" />
        </div>
        {/* <div className="mb-3">
        <label htmlFor="examplehtmlFormControlTextarea1" className="htmlForm-label">Example textarea</label>
        <textarea className="htmlForm-control" id="examplehtmlFormControlTextarea1" rows="3"></textarea>
        </div> */}

        <button type='button' onClick={()=>handleOnClick()} className='btn btn-primary btn-sm mt-3'>Create</button>
    </div>
  )
}

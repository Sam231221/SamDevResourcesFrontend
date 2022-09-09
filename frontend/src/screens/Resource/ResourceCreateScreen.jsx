import React from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function ResourceCreateScreen() {
  const [name,setName] =useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [ resourcetype, setResourceType] = useState('')

  const redirect = useNavigate();

  const handleOnClick = async () =>{
      const {data} = await axios.post('/api/createresource/',{
        'name':name,
        'url':url,
        'description': description,
        'resourcetype':resourcetype,
      })
      console.log(data)
      redirect('/resources')
  }

  const [resourcetypes, setResourceTypes] = useState([])

  const listResourceTypes = async ()=>{
    const {data} =await axios.get('api/resourcetypes/')
    console.log(data)
    setResourceTypes(data)
  } 
  useEffect(()=>{
    listResourceTypes()
 }, [])


  return (
    <div className='container p-5 shadow bg-white mt-3'>
        <h3>Create Resource</h3>
        <hr className='m-0'></hr>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" onChange={e=>setName(e.target.value)} placeholder="Enter a Resource Type" />
        </div>
        <div className="mb-3">
        <label htmlFor="url" className="form-label">Url</label>
        <input type="url" className="form-control" id="url"   onChange={e=>setUrl(e.target.value)} placeholder="Enter a Valid Url" />
        </div>

        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control"  onChange={e=>setDescription(e.target.value)} id="description" rows="3"></textarea>
        </div>

        <div className="mb-3">
        <label htmlFor="category" className="form-label">Category</label>
        <select className="form-select" id="category" value={resourcetype} onChange={(e)=>setResourceType(e.target.value)} aria-label="Default select example">
            <option selected>---</option>
            {resourcetypes.map((resourcetype, id)=>(
              <option key={id} value={resourcetype.name}>{resourcetype.name}</option>
            ))}

        </select>
        </div>
        <button type='button' onClick={()=>handleOnClick()} className='btn btn-primary btn-sm mt-3'>Create</button>
    </div>
  )
}

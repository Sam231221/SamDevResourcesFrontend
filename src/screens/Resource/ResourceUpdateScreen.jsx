import React from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'


export default function ResourceUpdateScreen() {
  const {id} =useParams()
  const redirect = useNavigate();

  const [name,setName] =useState('')
  const [url, setUrl] = useState('')
  const [description, setDescription] = useState('')
  const [ resourcetypename, setResourceType] = useState('')


  //for options
  const [resourcetypes, setResourceTypes] = useState([])


  const getResource =async ()=>{
    const {data} = await axios.get(`/api/getresource/${id}/`)
    console.log(data)
    if (data.success == true){
      console.log(data.resource)
      setName(data.resource.name)
      setUrl(data.resource.url)
      setDescription(data.resource.description)
      setResourceType(data.resource.resourcetype_name)
    }
  }

  //for options
  const listResourceTypes = async ()=>{
    const {data} =await axios.get('/api/resourcetypes/')
    console.log(data)
    setResourceTypes(data)
  } 

  useEffect(()=>{
    getResource() 
    //for select options
    listResourceTypes()
 }, [])

 const handleOnClick = async () =>{
  const {data} = await axios.put(`/api/updateresource/${id}/`,{
    'name':name,
    'url':url,
    'description': description,
    'resourcetype':resourcetypename,
  })
  console.log(data)
  redirect('/resources')
}


  return (
    <div className='container p-5 shadow bg-white mt-3'>
        <h3>Update Resource</h3>
        <hr className='m-0'></hr>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" onChange={(e)=>setName(e.target.value)}  placeholder="Enter a Resource Type" value={name} />
        </div>
        <div className="mb-3">
        <label htmlFor="url" className="form-label">Url</label>
        <input type="url" className="form-control" id="url" onChange={(e)=>setUrl(e.target.value)}  placeholder="Enter a Valid Url" value={url} />
        </div>

        <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <textarea className="form-control" id="description" rows="3" onChange={(e)=>setDescription(e.target.value)}  value={description}></textarea>
        </div>

        <div className="mb-3">
        <label htmlFor="resourcetype" className="form-label">ResourceType</label>
        <select className="form-select" id="resourcetype" value={resourcetypename} onChange={(e)=>setResourceType(e.target.value)} aria-label="Default select example">
            <option selected>{resourcetypename}</option>
            {resourcetypes.map((resourcetype, id)=>(
              <option key={id} value={resourcetype.name}>{resourcetype.name}</option>
            ))}

        </select>
        </div>
        
        <button type='button' onClick={()=>handleOnClick()} className='btn btn-primary btn-sm mt-3'>Update</button>
    </div>
  )
}

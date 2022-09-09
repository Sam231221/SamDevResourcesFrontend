import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
export default function ResourceSreen() {
  const [resources, setResources] = useState([])

  const listResources = async ()=>{
    const {data} =await axios.get('/api/resources/')
    setResources(data)
  } 

  const handleOnDelete= async (id) =>{
    const {data} = await axios.delete(`/api/deleteresource/${id}/`)
    console.log(data)
    listResources()
  }

   useEffect(()=>{
      listResources()
   }, [])

  return (
    <div className='container mt-3'>
        <table class="table  table-hover" style={{"box-shadow":' 0px 2px 15px rgb(0 0 0 / 6%)'}}>
            <thead className='table-dark'>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">ID</th>
                  <th scope="col">Resource</th>
                  <th scope="col">ResourceType</th>
                  <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody>

            {resources.map((resource, i)=>(
                          <tr key={i}>
                              <th scope="row">{i+1}</th>
                              <th scope="row">{resource.id}</th>
                              <th scope="row">{resource.name}</th>
                              <th scope="row">{resource.resourcetype_name}</th>
                              <td colspan="3">
                              <Link to ={`/updateresource/${resource.id}`} className='btn btn-primary btn-sm'>Update</Link>
                                <button onClick={()=>handleOnDelete(resource.id)} className='btn btn-danger btn-sm mx-3'>Delete</button>
                              </td>

                        </tr>

            ))}

            </tbody>

        </table>
    </div>
  )
}

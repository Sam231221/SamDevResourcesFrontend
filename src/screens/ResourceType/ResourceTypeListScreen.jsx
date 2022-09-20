import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'

export const ResourceTypeListScreen =()=> {
  const [resourcetypes, setResourceTypes] = useState([])

  const listResourceTypes = async ()=>{
    const {data} =await axios.get('/api/resourcetypes/')
    setResourceTypes(data)
  } 

  const handleOnDelete= async (id) =>{
    const {data} = await axios.delete(`/api/deleteresourcetype/${id}/`)
    console.log(data)
    listResourceTypes()
  }

   useEffect(()=>{
      listResourceTypes()
   }, [])


  return (
    <div className='container mt-3'>
        <table class="table  table-hover" style={{"box-shadow":' 0px 2px 15px rgb(0 0 0 / 6%)'}}>
            <thead className='table-dark'>
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">ID</th>
                  <th scope="col">ResourceType</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody className='bg-white'>
    

            {resourcetypes.map((resourcetype, i)=>(
                          <tr key={i}>
                          <th scope="row">{i+1}</th>
                          <th scope="row">{resourcetype.id}</th>
                          <th scope="row">{resourcetype.name}</th>
                          <th scope="row">{resourcetype.category_name}</th>
                          <td colspan="2">
                          <Link to ={`/updateresourcetype/${resourcetype.id}`} className='btn btn-primary btn-sm'>Update</Link>
                            <button onClick={()=>handleOnDelete(resourcetype.id)} className='btn btn-danger btn-sm mx-3'>Delete</button>
                          </td>

                        </tr>

            ))}

            </tbody>

        </table>
    </div>
  )
}

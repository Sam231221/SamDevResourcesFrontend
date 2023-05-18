import React from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { urlFor, client } from '../../client';

export default function CategoryListScreen(){
  const [categories, setCategories] = useState([])
   useEffect(()=>{
    client.fetch(`*[_type == "category"] `)
      .then((data) => {
        setCategories(data.slice(0, 3));

      })
      .catch(console.error);

      console.log(categories)
   }, [])

  return (
    <div className='container mt-3'>
        <table className="table  table-hover" style={{"box-shadow":' 0px 2px 15px rgb(0 0 0 / 6%)'}}>
            <thead className='table-dark'>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Category</th>
                  <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody className=''>
    
            {categories.map((category, i)=>(
                  <tr key={i}>
                     <th scope="row">{i+1}</th>
                      <th scope="row">{category.title}</th>
                      <td colSpan="2">
                        <Link to={`/updatecategory/${category.id}`} className='btn btn-primary btn-sm'>Update</Link>
                        <button  className='btn btn-danger btn-sm mx-3'>Delete</button>
                        {/* <button onClick={()=> handleOnDelete(category.id)} className='btn btn-danger btn-sm mx-3'>Delete</button> */}
                      </td>
                  </tr>
            ))}


              
            </tbody>

        </table>
    </div>
  )
}

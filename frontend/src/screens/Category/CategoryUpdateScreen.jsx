import React from 'react'

export default function CategoryUpdateScreen(){
  return (
    <div className='container p-4 shadow bg-white mt-3'>
        <h3>Update Category</h3>
        <hr className='m-0'></hr>
        <div className="mb-3">
        <label htmlFor="categoryname" className="form-label">Category</label>
        <input type="text" className="form-control" id="categoryname" placeholder="Enter a Category" />
        </div>

        <button className='btn btn-primary btn-sm mt-3'>Update</button>
    </div>
  )
}

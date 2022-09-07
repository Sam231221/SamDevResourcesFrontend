import React from 'react'

export const ResourceTypeUpdateScreen = () => {
  return (
    <div className='container p-3 shadow bg-white mt-3'>
        <h3>Update ResourceType</h3>
        <hr className='m-0'></hr>

        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" placeholder="Enter a Resource Type" />
        </div>

        <div className="mb-3">
        <label htmlFor="categoryname" className="form-label">Category</label>
        <input type="text" className="form-control" id="categoryname" placeholder="Enter a Category" />
        </div>
        <button className='btn btn-primary btn-sm mt-3'>Update</button>
    </div>
  )
}

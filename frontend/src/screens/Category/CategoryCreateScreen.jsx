import React from 'react'

export default function CategoryCreateScreen() {
  return (
    <div className='container p-3 shadow bg-white mt-3'>
        <div className="mb-3">
        <label htmlFor="categoryname" className="form-label">Category</label>
        <input type="text" className="form-control" id="categoryname" placeholder="Enter a Category" />
        </div>
        {/* <div className="mb-3">
        <label htmlFor="examplehtmlFormControlTextarea1" className="htmlForm-label">Example textarea</label>
        <textarea className="htmlForm-control" id="examplehtmlFormControlTextarea1" rows="3"></textarea>
        </div> */}

        <button className='btn btn-primary btn-sm mt-3'>Create</button>
    </div>
  )
}

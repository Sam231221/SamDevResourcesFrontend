import React from 'react'

export default function ResourceCreateScreen() {
  return (
    <div className='container p-5 shadow bg-white mt-3'>
        <h3>Create Resource</h3>
        <hr className='m-0'></hr>
        <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input type="text" className="form-control" id="name" placeholder="Enter a Resource Type" />
        </div>
        <div className="mb-3">
        <label htmlFor="url" className="form-label">Url</label>
        <input type="url" className="form-control" id="url" placeholder="Enter a Valid Url" />
        </div>

        <div className="mb-3">
        <label htmlFor="description" className="form-label">Example textarea</label>
        <textarea className="form-control" id="description" rows="3"></textarea>
        </div>

        <select class="form-select" aria-label="Default select example">
            <option selected>Resource Type</option>
            <option value="1">One</option>
            <option value="2">Two</option>
            <option value="3">Three</option>
        </select>

        <button className='btn btn-primary btn-sm mt-3'>Create</button>
    </div>
  )
}

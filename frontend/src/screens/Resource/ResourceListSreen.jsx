import React from 'react'
import { Link } from 'react-router-dom'
export default function ResourceSreen() {
  return (
    <div className='container mt-3'>
        <table class="table  table-hover" style={{"box-shadow":' 0px 2px 15px rgb(0 0 0 / 6%)'}}>
            <thead className='table-dark'>
                <tr>
                  <th scope="col">Resource</th>
                  <th scope="col">ResourceType</th>
                  <th scope="col">Action</th>
                </tr>
            </thead>

            <tbody>

              <tr>
                <th scope="row">WebDevelopment</th>
                <th scope="row">velopment</th>
                <td colspan="2">
                  <Link to='/updateresource' className='btn btn-primary btn-sm'>Update</Link>
                  <Link to='/deleteresource' className='btn btn-danger btn-sm mx-3'>Delete</Link>
                </td>

              </tr>
            </tbody>

        </table>
    </div>
  )
}

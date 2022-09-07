import React from 'react'
import { Link } from 'react-router-dom'

import './Sidebar.css'
import me from '../images/me.jpg'
export default function Sidebar() {
  return (

    <div className='sidebar col-4'>
      <div className='d-flex align-items-center p-2'>
        <img src={me} alt="me" />
         <h3 className='m-0 mx-2'>Sam Dev</h3>
        
      </div>
    
      <hr className='bg-black m-0' />

      <ul class="nav flex-column mt-3">

            <li className='d-flex side-links align-items-center'>
                <div className="row">
                            <div className="col d-flex align-items-center align-self-start">
                            <i class="bi bi-speedometer2 mx-3"></i>
                                <Link to="/" class="p-0  nav-link link-dark">
                                Dashboard
                                </Link>
                            </div>
                    
                </div>
            </li>

        
        <li className='side-links'>
         <div className="d-flex">
    
                <div className="col-8 d-flex align-items-center align-self-start">
                    <i class="bi ms-3 bi-card-heading mx-2"></i>
                    <Link to="/resourcetypes" class="p-2 nav-link link-dark">
                    ResourceTypes
                    </Link>
                </div>
           
                <div className="col-4 align-self-end">
                    <Link to="/createresourcetype" class="nav-link link-dark">
                                Add <i class="bi bi-plus-lg mx-1"></i>
                    </Link>
                </div>

         </div>
        </li>

        <li className='side-links'>
        <div className="d-flex">
     
                <div className="col-8 d-flex align-items-center align-self-start">
                    <i class="bi ms-3 bi-card-list mx-2"></i>
                    <Link to="/resources" class="p-2 nav-link link-dark">
                    Resources
                    </Link>
                </div>
           
                <div className="col-4 align-self-end">
                    <Link to="/createresource" class="nav-link link-dark">
                                Add <i class="bi bi-plus-lg mx-1"></i>
                    </Link>
                </div>
        

         </div>
        </li>

        
        <li className='side-links'>
        <div className="d-flex">

                <div className="col-8 d-flex align-items-center align-self-start">
                    <i class="bi ms-3 bi-border-width mx-2"></i>
                    <Link to="/categories" class="p-2 nav-link link-dark">
                    Categories
                    </Link>
                </div>
           
                <div className="col-4 align-self-end">
                                <Link to="createcategory" className='nav-link link-dark'>Add <i class="bi bi-plus-lg mx-1"></i></Link>
                </div>


         </div>
        </li>

    </ul>
    </div>

       
  )
}

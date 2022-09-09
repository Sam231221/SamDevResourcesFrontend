import axios from 'axios'
import React from 'react'
import { useEffect , useState} from 'react'
import { useSearchParams } from 'react-router-dom'

export const DashboardScreen = () => {
	const [searchParams, setSearchParams] = useSearchParams('');
  const [resourcetypes, setResourceTypes] = useState([])
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || "")

  const listResourceTypes = async ()=> {
    if (keyword){
      const {data}=  await axios.get(`/api/dashboard?keyword=${keyword}`)
      console.log(data)
      setResourceTypes(data)
    }else{
      const {data}=  await axios.get('/api/dashboard')
      console.log(data)
      setResourceTypes(data)
    }

  }

   useEffect(()=>{
    listResourceTypes()
   }, [keyword])

  return (
    <div className='container mt-5'>
      <div class="d-flex align-items-center">
            <form class="w-100 me-3" role="search">
              <input type="search" onChange={(e)=> setKeyword(e.target.value)} class="form-control" placeholder="Search..." aria-label="Search" />
            </form>

          </div>
      <div className="row g-3 mt-5">

           {resourcetypes.map((resourcetype, i)=>(
                                <div key={resourcetype.id} className="col">
                                <div class="card" style={{"width": "18rem"}}>
                                  <div class="card-header">
                                   <h4>{i+1}. {resourcetype.name}</h4>
                  
                                  </div>
                                  <ul class="list-group list-group-flush">
                                  {resourcetype.resources.map((resource, i)=>(
                                    <div className='list-group-item' key={resource.id}>
                                     <a href={resource.url} target="_blank" rel="noreferrer" class="nav-link link-dark "><strong>{resource.name}</strong></a>
                                     {resource.description && <p className='ps-3'>{resource.description}</p>}
                                
                                    </div>
                                     
                                  ))}

                                  </ul>
                                </div>
                              </div>
           ))}


      </div>

        
    </div>
  )
}

import axios from 'axios'
import React from 'react'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { urlFor, client } from '../client';

export const DashboardScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams('');
  const [resourcetypes, setResourceTypes] = useState([])
  const [keyword, setKeyword] = useState(searchParams.get('keyword') || "")
  const menu_bar = document.querySelector(".menu-bar");
  const drop_boxes = document.querySelectorAll(".drop-box")
  const drop_btns = document.querySelectorAll(".drop-button")

         //Forward Detail Page
         for (let i = 0; i < drop_btns.length; i++) {
          for (let j = 0; j < drop_boxes.length; j++) {
              drop_btns[i].onclick = (() => {

                  document.getElementById(drop_btns[i].parentElement.id).style.marginLeft = "-32rem";
     
                      setTimeout(() => {
                        console.log(drop_btns[i])
                        document.getElementById("detailbox-" + drop_btns[i].getAttribute("data-detailbox")).style.display = "block";
                     
                        }, 100);
            

              })
          }
      }

      const back_btns = document.querySelectorAll(".back-btn");
        //Backward Main page
        for (let i =0; i<back_btns.length ; i++){

          back_btns[i].onclick=(()=>{
               document.getElementById("menu-" + back_btns[i].id).style.marginLeft = "0px";
              setTimeout(() => {
                          console.log("back:",document.getElementById("menu-"+back_btns[i].id))
                  
                          document.getElementById("menu-"+back_btns[i].id).style.display = "block";
                          document.getElementById(back_btns[i].parentElement.id).style.display = "none";
                        }, 100);
          })
      }
  
  useEffect(() => {
    client.fetch(`*[_type == "resourcetype"]{
           name,
          "resources":resources[]->{
          name,
          sources[]->
        }
      }`)
      .then((data) => {
        console.log(data)
        setResourceTypes(data);

      })
      .catch(console.error);
    console.log('resourcetypes:', resourcetypes)

  }, []);


  return <>
    <div className="row g-5 mt-5">
      {resourcetypes.map((item, i) => (

        <div class='card col-4'>
          <div class="drop-btn">
            {item.name}
          </div>
          <div class="wrapper">
            <ul class="menu-bar" id={`menu-${item.name}`}>
              {item.resources?.map((resource, i) => (

                <li class="blog-item drop-button" data-detailbox={`${resource.name}`} id={`drop-b-${item.name}`}>
                  <a href="#">{i+1}. {resource.name} <i class="fas fa-angle-right"></i></a>
                </li>
              ))}
            </ul>

            {item.resources?.map((resource, i) => (
              <ul class="drop-box" id={`detailbox-${resource.name}`}>
                <li class="arrow back-btn" id={`${item.name}`}>
                  <span class="fas fa-arrow-left"></span> Go Back
                </li>
                {resource.sources?.map((source, i) => (
                  <li>
                    <a href={source.url} target='_blank' rel='noreferrer'>
                      <div class="icon">
                        <span class="fas fa-user"></span>
                      </div>
                      {source.name}
                    </a>
                  </li>
                ))}
              </ul>


            ))}

          </div>
        </div>
      ))}
    </div>
  </>;
}

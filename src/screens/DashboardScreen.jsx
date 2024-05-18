import React from "react";

import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { client } from "../client";

const DashboardScreen = () => {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [resourcetypes, setResourceTypes] = useState([]);
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");

  const handleForwardClick = (e) => {
    e.target.parentElement.style.marginLeft = "-32rem";
    setTimeout(() => {
      document.getElementById(
        "detailbox-" + e.target.getAttribute("data-detailbox")
      ).style.display = "block";
    }, 100);
  };

  const handleBackClick = (e) => {
    document.getElementById("menu-" + e.target.id).style.marginLeft = "0px";

    setTimeout(() => {
      document.getElementById("menu-" + e.target.id).style.display = "block";
      document.getElementById(e.target.parentElement.id).style.display = "none";
    }, 100);
  };

  useEffect(() => {
    client
      .fetch(
        `*[_type == "resourcetype"]{
             name,
            "resources":resources[]->{
            name,
            sources[]->
          }
        }`
      )
      .then((data) => {
        setResourceTypes(data);
      })
      .catch(console.error);
  }, []);
  console.log("resourcetypes:", resourcetypes);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-4 col-md-2">
          <Sidebar />
        </div>
        <div className="col-8 col-md-10 mt-5">
          <div className="row">
            {resourcetypes.length > 0 && (
              <>
                {resourcetypes.map((item, i) => (
                  <div key={i} className="card col-12 col-md-4 mb-3">
                    <div className="drop-btn">{item.name}</div>
                    <div className="wrapper">
                      <ul className="menu-bar" id={`menu-${item.name}`}>
                        {item.resources.length > 0 && (
                          <>
                            {item.resources.map((resource, i) => (
                              <div
                                key={i}
                                onClick={(e) => handleForwardClick(e)}
                                className="blog-item drop-button"
                                data-detailbox={`${resource?.name}`}
                                id={`drop-b-${item?.name}`}
                              >
                                {i + 1}. {resource?.name}{" "}
                                <i className="fas fa-angle-right"></i>
                              </div>
                            ))}
                          </>
                        )}
                      </ul>

                      {item.resources.length > 0 &&
                        item.resources.map((resource, i) => (
                          <ul
                            className="drop-box"
                            id={`detailbox-${resource?.name}`}
                          >
                            <div
                              onClick={(e) => handleBackClick(e)}
                              className="arrow  drop-button"
                              id={`${item?.name}`}
                            >
                              <span className="fas fa-arrow-left"></span> Go
                              Back
                            </div>

                            {resource?.sources?.map((source, i) => (
                              <li>
                                <a
                                  href={source?.url}
                                  target="_blank"
                                  rel="noreferrer"
                                >
                                  <div className="icon">
                                    <span className="fas fa-user"></span>
                                  </div>
                                  {source?.name}
                                </a>
                              </li>
                            ))}
                          </ul>
                        ))}
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardScreen;

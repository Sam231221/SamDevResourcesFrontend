import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import me from "../images/me.jpg";
export default function Sidebar() {
  return (
    <div className="sidebar ">
      <div className="d-flex align-items-center p-2">
        <img src={me} alt="me" />
        <h3 className="m-0 mx-2 text-white">
          <strong>Sam Dev Resources</strong>
        </h3>
      </div>

      <hr className="bg-black m-0" />

      <ul className="nav flex-column mt-3">
        <li className="d-flex side-links align-items-center">
          <div className="row">
            <div className="col d-flex align-items-center align-self-start">
              <i className="bi bi-speedometer2 mx-3"></i>
              <Link to="/" className="p-0  nav-link dark-link">
                Dashboard
              </Link>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
}

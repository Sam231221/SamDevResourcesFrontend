import React from "react";
import { Link } from "react-router-dom";

import "./Sidebar.css";
import me from "../images/me.jpg";

const NavContent = () => (
  <>
    <div className="d-flex align-items-center p-2 sidebar-header">
      <img src={me} alt="me" />
      <h3 className="m-0 mx-2 text-white">
        <strong>Sam Dev Resources</strong>
      </h3>
    </div>
    <hr className="bg-black m-0" />
    <ul className="nav flex-column mt-3">
      <li className="d-flex side-links align-items-center">
        <div className="row w-100">
          <div className="col d-flex align-items-center align-self-start"></div>
        </div>
      </li>
    </ul>
  </>
);

export default function Sidebar() {
  return (
    <>
      <button
        className="sidebar-toggle d-md-none"
        type="button"
        data-bs-toggle="offcanvas"
        data-bs-target="#sidebarOffcanvas"
        aria-label="Toggle menu"
      >
        <i className="bi bi-list"></i>
      </button>

      <div className="sidebar-col d-none d-md-block">
        <div className="sidebar sidebar-desktop">
          <NavContent />
        </div>
      </div>

      <div
        className="offcanvas offcanvas-start sidebar-offcanvas d-md-none"
        tabIndex="-1"
        id="sidebarOffcanvas"
        aria-labelledby="sidebarOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title text-white" id="sidebarOffcanvasLabel">
            Menu
          </h5>
          <button
            type="button"
            className="btn-close btn-close-white"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body p-0">
          <NavContent />
        </div>
      </div>
    </>
  );
}

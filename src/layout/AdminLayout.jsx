import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useGetAdminProfileQuery } from "../redux/services/adminApi";
 


export default function AdminLayout() {
  // const navigate = useNavigate();
  // const location = useLocation();
  const [toggled,setToggled]=useState(false)
  const {data,isLoading,isError}=useGetAdminProfileQuery()
  useEffect(()=>{
  if(isError){
    localStorage.removeItem("authToken")
    window.location.href="/"
  }
  },[isError])
 

  return (
    <div id="db-wrapper" className={toggled?`toggled`:''}>
 
 <nav className="navbar-vertical navbar">
  <div className="vh-100 simplebar-scrollable-y" data-simplebar="init">
    <div className="simplebar-wrapper" style={{ margin: 0 }}>
      <div className="simplebar-content" style={{ padding: 0 }}>
        {/* Brand logo */}
        <a className="navbar-brand" href="/">
          <img
            src="/logo.png"
            alt="Logo"
          />
        </a>
        <ul className="navbar-nav flex-column" id="sideNavbar">
              <li className="nav-item">
                <a className="nav-link" href="/admin/dashboard">
                  <i className="nav-icon fe fe-home me-2" />
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/users">
                  <i className="nav-icon fe fe-users me-2" />
                  Users Management
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/businesses">
                  <i className="nav-icon fe fe-briefcase me-2" />
                  Business Listings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/services">
                  <i className="nav-icon fe fe-briefcase me-2" />
                  Business Services
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/amenities">
                  <i className="nav-icon fe fe-briefcase me-2" />
                  Business Amenities
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/reviews">
                  <i className="nav-icon fe fe-star me-2" />
                  Reviews & Ratings
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/categories">
                  <i className="nav-icon fe fe-layers me-2" />
                  Categories & Tags
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/reports">
                  <i className="nav-icon fe fe-flag me-2" />
                  Reported Content
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/settings">
                  <i className="nav-icon fe fe-settings me-2" />
                  Settings
                </a>
              </li>
            </ul>
  
      </div>
    </div>
  </div>
</nav>

  
    <main id="page-content">
      <div className="header">
        
        
      </div>
      
      <div >
       <Outlet/>
      </div>
    </main>
  </div>
  
  );
}
 
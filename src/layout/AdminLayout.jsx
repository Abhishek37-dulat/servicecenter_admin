import React, { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useGetAdminProfileQuery } from "../redux/services/adminApi";
import {
  FaBlog,
  FaBriefcase,
  FaCog,
  FaFlag,
  FaHome,
  FaLayerGroup,
  FaStar,
  FaUsers,
} from "react-icons/fa";
import { MdSpaceDashboard, MdStoreMallDirectory } from "react-icons/md";

export default function AdminLayout() {
  // const navigate = useNavigate();
  const location = useLocation();
  const [toggled, setToggled] = useState(false);
  const { data, isLoading, isError } = useGetAdminProfileQuery();
  useEffect(() => {
    if (isError) {
      localStorage.removeItem("authToken");
      window.location.href = "/";
    }
  }, [isError]);
  const isActive = (path) => location.pathname === path;

  return (
    <div id="db-wrapper" className={toggled ? `toggled` : ""}>
      <nav className="navbar-vertical navbar bg-gradient-to-b from-[#0f336d] via-[#073d80] to-[#023fa0] text-white flex flex-col items-center py-6">
        <div className="vh-100 simplebar-scrollable-y" data-simplebar="init">
          <div className="simplebar-wrapper" style={{ margin: 0 }}>
            <div className="simplebar-content" style={{ padding: 0 }}>
              <div className="w-full navbar-brand">
                <div className="text-4xl font-bold text-white">YelpClone</div>
              </div>

              {/* Brand logo */}
              {/* <a className="navbar-brand" href="/">
                <img src="/logo.png" alt="Logo" />
              </a> */}

              <ul className="navbar-nav flex-column" id="sideNavbar">
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/dashboard")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/dashboard"
                  >
                    <MdSpaceDashboard
                      className={`nav-icon me-2 ${
                        isActive("/admin/dashboard")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Dashboard
                  </a>
                </li>
                {/* User Management */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/users")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/users"
                  >
                    <FaUsers
                      className={`nav-icon me-2 ${
                        isActive("/admin/users")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Users Management
                  </a>
                </li>
                {/* Business Info */}
           
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/businesses")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/businesses"
                  >
                    <FaBriefcase
                      className={`nav-icon me-2 ${
                        isActive("/admin/businesses")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Business Listings
                  </a>
                </li>
                {/* Business Services */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/services")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/services"
                  >
                    <FaBriefcase
                      className={`nav-icon me-2 ${
                        isActive("/admin/services")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Business Services
                  </a>
                </li>
                {/* Business Amenities */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/amenities")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/amenities"
                  >
                    <FaBriefcase
                      className={`nav-icon me-2 ${
                        isActive("/admin/amenities")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Business Amenities
                  </a>
                </li>

                    <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/amenities")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/categories"
                  >
                    <FaBriefcase
                      className={`nav-icon me-2 ${
                        isActive("/admin/categories")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Business Categories
                  </a>
                </li>
                {/* Reviews & Ratings */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/reviews")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/reviews"
                  >
                    <FaStar
                      className={`nav-icon me-2 ${
                        isActive("/admin/reviews")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Reviews & Ratings
                  </a>
                </li>

                {/* Categories & Tags */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/categories")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/categories"
                  >
                    <FaLayerGroup
                      className={`nav-icon me-2 ${
                        isActive("/admin/categories")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Categories & Tags
                  </a>
                </li>
                {/* Reported Content */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/reports")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/reports"
                  >
                    <FaFlag
                      className={`nav-icon me-2 ${
                        isActive("/admin/reports")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Reported Content
                  </a>
                </li>
                {/* Blog Management */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/blogs")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/blogs"
                  >
                    <FaBlog
                      className={`nav-icon me-2 ${
                        isActive("/admin/blogs")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Blog Management
                  </a>
                </li>

                {/* Settings */}
                <li className="nav-item">
                  <a
                    className={`nav-link ${
                      isActive("/admin/settings")
                        ? "bg-white text-[#0f336d] font-semibold rounded"
                        : ""
                    }`}
                    href="/admin/settings"
                  >
                    <FaCog
                      className={`nav-icon me-2 ${
                        isActive("/admin/settings")
                          ? "text-yellow-300"
                          : "text-white"
                      }`}
                    />
                    Settings
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      <main id="page-content">
        <div className="header"></div>

        <div>
          <Outlet />
        </div>
      </main>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Layout, Menu, Button, Dropdown, Badge, Avatar, Modal } from "antd";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaPinterestP,
  FaTwitter,
  FaYoutube,
  FaTumblr,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useLazyGetUserProfileQuery } from "../redux/services/authApi";
import { setStudent } from "../redux/slices/studentSlice";
import Form from "../components/ModelForm";
import { FaSearch } from "react-icons/fa";
import BookDemoForm from "../components/ModelForm";
import CareerExpertModal from "../components/CarrierExpert";
import FloatingWhatsAppButton from "../components/FloatingButton";
export default function UserLayout() {
  const isLoaderActive = useSelector((state) => state.loader.isLoading);
  const [searchQuery, setSearchQuery] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setShowResults(!!e.target.value);
  };

  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [collapsed1, setCollapsed1] = useState(false);
  const toggleMobileMenu = () => {
    document.body.classList.toggle("mobile-menu-visible");
  };
  const user = useSelector((state) => state.student.student);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      window.location.pathname === "/" ||
      window.location.pathname === "/about" ||
      window.location.pathname == "/courses" ||
      window.location.pathname == "/contact"
    ) {
      const timer = setTimeout(() => {
        setIsModalVisible(true);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [window.location.pathname]);
  const closeMobileMenu = () => {
    document.body.classList.remove("mobile-menu-visible");
  };
  const [getUser, { data, isLoading, isError }] = useLazyGetUserProfileQuery();

  useEffect(() => {
    if (localStorage.getItem("authToken")) {
      getUser();
    }
  }, []);
  useEffect(() => {
    if (isError) {
      localStorage.removeItem("authToken");
    }
    if (data) {
      dispatch(setStudent(data.data));
    }
  }, [data]);
  return (
    <>
      <header>
     
        <div id="header-fixed-height" />
        <div id="sticky-header" className="tg-header__area">
          <div className="container custom-container">
            <div className="row">
              <div className="col-12">
                <div className="tgmenu__wrap">
                  <nav className="tgmenu__nav">
                    <div className="logo">
                      <a href="/">
                        <img
                          src="/logo.png"
                          alt=""
                          style={{ height: "60px" }}
                        />
                      </a>
                    </div>
                    <div className="tgmenu__navbar-wrap tgmenu__main-menu d-none d-xl-flex">
                      <ul className="navigation">
                        <li className={location?.pathname == "/" && "active"}>
                          <a href="/">Home</a>
                        </li>
                        <li
                          className={`${
                            location?.pathname.startsWith("/courses") &&
                            "active"
                          } menu-item-has-children`}
                        >
                          <a>Programs</a>
                          <ul className="sub-menu mega-menu">
                            <div className="row text-center">
                              {/* Card 1 */}
                              <a
                                href="/self-learning-program"
                                className="col-md-3 mb-4"
                              >
                                <div className="card border-0">
                                  <img
                                    src="/images/1.png"
                                    alt="Self Learning Program"
                                    className="img-fluid rounded mb-3"
                                    style={{
                                      background: "#FFEDD5",
                                      borderRadius: "50%",
                                      padding: "10px",
                                      height: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <h5 className="text-orange fw-bold">
                                    Self Learning Program
                                  </h5>
                                </div>
                              </a>

                              {/* Card 2 */}
                              <a
                                href="/intensive-trainig-program"
                                className="col-md-3 mb-4"
                              >
                                <div className="card border-0">
                                  <img
                                    src="/images/2-2.png"
                                    alt="Intensive Training Program"
                                    className="img-fluid rounded mb-3"
                                    style={{
                                      background: "#D1FAE5",
                                      borderRadius: "50%",
                                      padding: "10px",
                                      height: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <h5 className="text-orange fw-bold">
                                    Intensive Training Program
                                  </h5>
                                </div>
                              </a>

                              {/* Card 3 */}
                              <a
                                href="/job-readiness-program"
                                className="col-md-3 mb-4"
                              >
                                <div className="card border-0">
                                  <img
                                    src="/images/3.png"
                                    alt="Job Assistance Program"
                                    className="img-fluid rounded mb-3"
                                    style={{
                                      background: "#DBEAFE",
                                      borderRadius: "50%",
                                      padding: "10px",
                                      height: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <h5 className="text-orange fw-bold">
                                    Job Readiness Program
                                  </h5>
                                </div>
                              </a>

                              {/* Card 4 */}
                              <a
                                href="/placement-guarantee-program"
                                className="col-md-3 mb-4"
                              >
                                <div className="card border-0">
                                  <img
                                    src="/images/4-2.png"
                                    alt="Placement Guarantee Program"
                                    className="img-fluid rounded mb-3"
                                    style={{
                                      background: "#FEF3C7",
                                      borderRadius: "50%",
                                      padding: "10px",
                                      height: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <h5 className="text-orange fw-bold">
                                    Placement Guarantee Program
                                  </h5>
                                </div>
                              </a>

                              {/* Card 5 */}
                              <a href="/workshop" className="col-md-3 mb-4">
                                <div className="card border-0">
                                  <img
                                    src="/images/4-2.png"
                                    alt="Workshop / CRT Program"
                                    className="img-fluid rounded mb-3"
                                    style={{
                                      background: "#FEF3C7",
                                      borderRadius: "50%",
                                      padding: "10px",
                                      height: "150px",
                                      objectFit: "cover",
                                    }}
                                  />
                                  <h5 className="text-orange fw-bold">
                                    Workshop / CRT Program
                                  </h5>
                                </div>
                              </a>
                            </div>
                          </ul>

                          <div className="dropdown-btn">
                            <span className="plus-line" />
                          </div>
                        </li>

                        <li
                          className={
                            location?.pathname == "/hire-with-us" && "active"
                          }
                        >
                          <a href="/hire-with-us">Hire With Us</a>
                        </li>

                        <li className="menu-item-has-children">
                          <a
                            href="#"
                            className={
                              (location?.pathname == "/contact" ||
                                location?.pathname == "/enquiry-now" ||
                                location?.pathname == "/expert-help") &&
                              "active"
                            }
                          >
                            More
                          </a>
                          <ul className="sub-menu">
                            <li>
                              <a
                                href="/contact"
                                className={
                                  location?.pathname == "/contact" && "active"
                                }
                              >
                                contact
                              </a>
                            </li>
                            
                            <li>
                              <a
                                href="/webinar-form"
                                className={
                                  location?.pathname == "/webinar-form" && "active"
                                }
                              >
                                Webinar Form
                              </a>
                            </li>

                             <li>
                              <a
                                href="/careers"
                                className={
                                  location?.pathname == "/webinar-form" && "active"
                                }
                              >
                                Careers
                              </a>
                            </li>
                            <li>
                              <a href="/expert-help">Expert help</a>
                            </li>
                          </ul>
                          <div className="dropdown-btn">
                            <span className="plus-line" />
                          </div>
                        </li>
                      </ul>
                    </div>

                    <div className="tgmenu__action">
                      <ul className="list-wrap">
                        <li className="wishlist-icon">
                          <a href="/cart" className="cart-count">
                            <IoMdCart size={"25px"} color="#139a76" />
                            <span className="  text-white">
                              {user?.cart?.courses.length || 0}
                            </span>
                          </a>
                        </li>
                        {!user?._id ? (
                          <li className="header-btn login-btn">
                            <a href="/login">Log in</a>
                          </li>
                        ) : (
                          <a href="/student/profile">
                            <Avatar>{user?.name?.charAt(0)}</Avatar>
                          </a>
                        )}
                      </ul>
                    </div>
                    {!user?._id ? (
                      <div className="mobile-login-btn">
                        <div
                          className="btn btn-success "
                          style={{ marginRight: "12px" }}
                          onClick={() => (window.location.href = "/login")}
                        >
                          {" "}
                          Log in
                        </div>
                      </div>
                    ) : (
                      <a href="/student/profile">
                        <Avatar>{user?.name?.charAt(0)}</Avatar>
                      </a>
                    )}
                    <div
                      className="mobile-nav-toggler"
                      onClick={toggleMobileMenu}
                    >
                      <i className="tg-flaticon-menu-1" />
                    </div>
                  </nav>
                </div>
                <div className="tgmobile__menu">
                  <nav className="tgmobile__menu-box">
                    <div className="close-btn" onClick={closeMobileMenu}>
                      <i className="tg-flaticon-close-1" />
                    </div>
                    <div className="nav-logo">
                      <a href="/">
                        <img src="/logo.png" alt="Logo" />
                      </a>
                    </div>
                    <ul className="navigation">
                      <li className="active">
                        <a href="/">Home</a>
                      </li>
                      <li
                        className={`${
                          location?.pathname.startsWith("/courses") && "active"
                        } menu-item-has-children`}
                        onClick={() => setCollapsed(!collapsed)}
                      >
                        <a>Programs</a>
                        <ul
                          className="sub-menu mega-menu"
                          style={{ display: collapsed ? "block" : "none" }}
                        >
                          <div className="row text-center p-4">
                            {/* Card 1 */}
                            <a
                              href="/self-learning-program"
                              className="col-md-3 mb-4"
                            >
                              <div className="card border-0">
                                <img
                                  src="/images/1.png"
                                  alt="Self Learning Program"
                                  className="img-fluid rounded mb-3"
                                  style={{
                                    background: "#FFEDD5",
                                    borderRadius: "50%",
                                    padding: "10px",
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <h5 className="text-orange fw-bold">
                                  Self Learning Program
                                </h5>
                              </div>
                            </a>

                            {/* Card 2 */}
                            <a
                              href="/intensive-trainig-program"
                              className="col-md-3 mb-4"
                            >
                              <div className="card border-0">
                                <img
                                  src="/images/2-2.png"
                                  alt="Intensive Training Program"
                                  className="img-fluid rounded mb-3"
                                  style={{
                                    background: "#D1FAE5",
                                    borderRadius: "50%",
                                    padding: "10px",
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <h5 className="text-orange fw-bold">
                                  Intensive Training Program
                                </h5>
                              </div>
                            </a>

                            {/* Card 3 */}
                            <a
                              href="/job-readiness-program"
                              className="col-md-3 mb-4"
                            >
                              <div className="card border-0">
                                <img
                                  src="/images/3.png"
                                  alt="Job Assistance Program"
                                  className="img-fluid rounded mb-3"
                                  style={{
                                    background: "#DBEAFE",
                                    borderRadius: "50%",
                                    padding: "10px",
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <h5 className="text-orange fw-bold">
                                  Job Readiness Program
                                </h5>
                              </div>
                            </a>

                            {/* Card 4 */}
                            <a
                              href="/placement-guarantee-program"
                              className="col-md-3 mb-4"
                            >
                              <div className="card border-0">
                                <img
                                  src="/images/4-2.png"
                                  alt="Placement Guarantee Program"
                                  className="img-fluid rounded mb-3"
                                  style={{
                                    background: "#FEF3C7",
                                    borderRadius: "50%",
                                    padding: "10px",
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <h5 className="text-orange fw-bold">
                                  Placement Guarantee Program
                                </h5>
                              </div>
                            </a>

                            {/* Card 5 */}
                            <a href="/workshop" className="col-md-3 mb-4">
                              <div className="card border-0">
                                <img
                                  src="/images/4-2.png"
                                  alt="Workshop / CRT Program"
                                  className="img-fluid rounded mb-3"
                                  style={{
                                    background: "#FEF3C7",
                                    borderRadius: "50%",
                                    padding: "10px",
                                    height: "150px",
                                    objectFit: "cover",
                                  }}
                                />
                                <h5 className="text-orange fw-bold">
                                  Workshop / CRT Program
                                </h5>
                              </div>
                            </a>
                          </div>
                        </ul>

                        <div className={`dropdown-btn ${collapsed && "open"}`}>
                          <span className="plus-line" />
                        </div>
                      </li>

                      <li>
                        <a href="/hire-with-us">Hire With us</a>
                      </li>

                      <li
                        className="menu-item-has-children"
                        onClick={() => setCollapsed1(!collapsed1)}
                      >
                        <a href="#">More</a>
                        <ul
                          className="sub-menu"
                          style={{ display: collapsed1 ? "block" : "none" }}
                        >
                          <li>
                            <a href="/contact">contact</a>
                          </li>
                          {/* <li>
      <a href="/enquiry-now">Enquiry now</a>
    </li> */}
    
                            <li>
                              <a
                                href="/webinar-form"
                                className={
                                  location?.pathname == "/webinar-form" && "active"
                                }
                              >
                                Webinar Form
                              </a>
                            </li>

                             <li>
                              <a
                                href="/careers"
                                className={
                                  location?.pathname == "/webinar-form" && "active"
                                }
                              >
                                Careers
                              </a>
                            </li>
                          <li>
                            <a href="/expert-help">Expert help</a>
                          </li>
                        </ul>

                        <div className={`dropdown-btn ${collapsed1 && "open"}`}>
                          <span className="plus-line" />
                        </div>
                      </li>

                      <li>
                        <a href="/contact">Contact</a>
                      </li>
                    </ul>
                    <div className="social-links">
                      <ul className="list-wrap">
                        <li>
                          <a href="#">
                            <i className="fab fa-facebook-f" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-twitter" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-instagram" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-linkedin-in" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fab fa-youtube" />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <Outlet />
      <footer className="footer__area" style={{ background: "black" }}>
        <div className="footer__top">
          <div className="container">
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6">
                <div className="footer__widget">
                  <div className="logo mb-2">
                    <a href="index-2.html">
                      <img
                        src="/logo.png"
                        alt="img"
                        style={{ height: "60px" }}
                      />
                    </a>
                  </div>
                  <div className="footer__content">
                    <ul className="list-wrap">
                      <li>
                        {" "}
                        Bus Stop, - 3rd Floor, <br />
                        Tower - A, Ardente Office One, beside Hoodi,
                        <br /> Whitefield, Hoodi, Bengaluru, Karnataka 560048
                      </li>
                      <li>8019836301</li>
                      <li>support@legacyaye.com</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="footer__widget">
                  <h4 className="footer__widget-title">Quick Links</h4>
                  <div className="footer__link">
                    <ul className="list-wrap">
                      
                      <li>
                        <a href="/about">About</a>
                      </li>
                      <li>
                        <a href="/courses">Courses</a>
                      </li>
                      <li>
                        <a href="/careers">Careers</a>
                      </li>
                      <li>
                        <a href="/careers">Alumni Portal</a>
                      </li>
                      <li>
                        <a href="/terms">Terms and Conditions</a>
                      </li>
                      <li>
                        <a href="/privacy">Privacy Policy</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6">
                <div className="footer__widget">
                  <h4 className="footer__widget-title">Programs</h4>
                  <div className="footer__link">
                    <ul className="list-wrap">
                      <li>
                        <a href="/self-learning-program">Self Learning Program</a>
                      </li>
                      <li>
                        <a href="/intensive-training-program">Intensive Training Program</a>
                      </li>
                      <li>
                        <a href="/job-readiness-program">Job Readiness Program</a>
                      </li>
                      <li>
                        <a href="/placement-guarantee-program">Placement Guarantee program</a>
                      </li>
                 
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-xl-3 col-lg-3 col-md-6">
                <div className="footer__widget">
                  <h4 className="footer__widget-title">Get In Touch</h4>
                  <div className="social-icons d-flex gap-3 justify-content-center  mb-35">
                    <a
                      href="https://instagram.com/legacyaye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-circle"
                    >
                      <FaInstagram size={24} style={{ color: "#E4405F" }} />
                    </a>
                    <a
                      href="https://x.com/legacyaye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-circle"
                    >
                      <FaTwitter size={24} style={{ color: "#1DA1F2" }} />
                    </a>
                    <a
                      href="https://in.pinterest.com/legacyaye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-circle"
                    >
                      <FaPinterestP size={24} style={{ color: "#E60023" }} />
                    </a>
                    <a
                      href="https://www.youtube.com/@LegacyAye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-circle"
                    >
                      <FaYoutube size={24} style={{ color: "#FF0000" }} />
                    </a>
                    <a
                      href="https://www.tumblr.com/legacyaye"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-circle"
                    >
                      <FaTumblr size={24} style={{ color: "#34526f" }} />
                    </a>
                    <a
                      href="https://www.linkedin.com/company/legacy-aye-learning?trk=blended-typeahead"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-circle"
                    >
                      <FaLinkedinIn size={24} style={{ color: "#0077B5" }} />
                    </a>
                    <a
                      href="https://m.facebook.com/profile.php?id=61570815917750"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="icon-circle"
                    >
                      <FaFacebookF size={24} style={{ color: "#1877F2" }} />
                    </a>
                  </div>
                  <div className="footer__contact-content">
                    <ul className="list-wrap footer__social">
                      <img src="/images/payment.png" alt="" />
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="pb-3">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-md-7">
                <div className="copy-right-text">
                  <p>© All rights reserved.</p>
                </div>
              </div>
              <div className="col-md-5">
                <div className="footer__bottom-menu">
                  <ul className="list-wrap">
                    <li>
                      <a href="/terms">Term of Use</a>
                    </li>
                    <li>
                      <a href="/privacy">Privacy Policy</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Modal
          open={isModalVisible}
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <CareerExpertModal />
          {/* <BookDemoForm  close={setIsModalVisible}/> */}
        </Modal>

        <FloatingWhatsAppButton />
      </footer>
      {isLoaderActive && (
        <div id="preloader">
          <div id="loader" className="loader">
            <div className="loader-container">
              <div className="loader-icon">
                <img src="/fav.png" alt="Preloader" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

const loaderStyles = `
  #preloader {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent overlay */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
  }
  .loader {
    text-align: center;
  }
  .loader-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loader-icon img {
    width: 100px; /* Adjust size as needed */
    animation: spin 1s linear infinite;
  }
  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;

// Add loader styles dynamically
const styleSheet = document.createElement("style");
styleSheet.type = "text/css";
styleSheet.innerText = loaderStyles;
document.head.appendChild(styleSheet);

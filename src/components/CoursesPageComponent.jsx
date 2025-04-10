 

import React, { useEffect, useState } from 'react';
import { useGetCoursesQuery } from '../redux/services/courseApi';
import { AiFillStar } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { Tooltip, Input, Pagination } from 'antd';
import { Link } from 'react-router-dom';
import { debounce } from 'lodash';
import { useAddToWishlistMutation } from '../redux/services/wishListApi';
import { toast } from 'react-toastify';

function CoursesPageComponent() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [page, setPage] = useState(1);
    
  const { data: courses, isLoading, isError } = useGetCoursesQuery({
      page,
      limit: 10,
      search: debouncedSearch,
  });

  const handleSearchChange = (e) => {
      setSearch(e.target.value);
  };
 const [addtoCart]=useAddToWishlistMutation()
  useEffect(() => {
      const handler = debounce(() => {
          setDebouncedSearch(search);
      }, 500);
      
      handler();
      return () => handler.cancel();
  }, [search]);

  const handlePageChange = (page) => {
      setPage(page);
  };

    return (
        <section className="courses-area section-pt-60 section-pb-90">
            <div className="mx-auto">
                <h2 className="text-center fw-bold text-dark mb-4">Programs</h2>
                <div className="mb-3 d-flex justify-content-center">
                    <Input
                        placeholder="Search courses..."
                        value={search}
                        onChange={handleSearchChange}
                        style={{ width: "300px" }}
                    />
                </div>
                {isLoading ? (
                    <p className="text-center">Loading courses...</p>
                ) : (
                    <div className="row g-4 mx-auto col-lg-12 col-md-12 col-sm-12">
                        {courses?.courses?.map((course, index) => (
                            <div
                                key={index}
                                className="col-lg-3 col-md-6 col-sm-12 d-flex align-items-stretch"
                            >
                                <div className="card shadow-sm border-0 h-100" style={{ width: '100%' }}>
                                    <div>
                                        <div className="card-header bg-transparent border-0 p-0 position-relative">
                                            <img
                                                src={course.thumbnail||"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTk_pSWv2pNwyER1AQ5DZwmCciBWhuZKnowUw&s"}
                                                alt={course.title}
                                                className="card-img-top rounded-top"
                                                style={{
                                                    height: "200px",
                                                    objectFit: "cover",
                                                }}
                                            />
                                            {/* <span
                                                className="badge bg-danger text-white position-absolute top-0 start-0 m-2"
                                                style={{ fontSize: "0.75rem", padding: "5px 10px" }}
                                            >
                                                Advance/Pro
                                            </span> */}
                                        </div>
                                        <div className="card-body d-flex flex-column">
                                            <h6 className="fw-bold d-flex justify-content-between">
                                                {course.title} <span>₹{course.offerPrice || course.price}</span>
                                            </h6>
                                            <div className="d-flex mb-3">
                                                {[...Array(4)].map((_, i) => (
                                                    <AiFillStar key={i} color="#FFD700" size={18} />
                                                ))}
                                            </div>
                                            <div className="mt-auto  " style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div  >
                      <Tooltip title="Add to Cart">

                      <FaCartPlus color="#1ca766" size={"26px"}  className='cursor-pointer'
                         onClick={async (event) => {
                                          event.stopPropagation();
                                          if(!localStorage.getItem("authToken")){
                                            toast.warn("please login to add course ")
                                            setTimeout(()=>{
                                              window.location.href = "/login";
                                            },[1500])
                                            return
                                          }
                                          const res = await addtoCart(course?._id);
                                          if (res) {
                                            window.location.href = "/cart";
                                          }
                                        }}
                      /> 
                      </Tooltip>
                    </div>
                    <h5 className="mt-3 text-dark fw-bold">
                 <Link to={`/course/${course?._id}`}>
                 
                  <button className="btn btn-info">view</button>    
                 </Link>
                    </h5>
                  </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                <div className="d-flex justify-content-center mt-4">
                    <Pagination
                        current={page}
                        total={courses?.totalCourses || 0}
                        pageSize={10}
                        onChange={handlePageChange}
                        showSizeChanger={false}
                    />
                </div>
            </div>
        </section>
    );
}

export default CoursesPageComponent;
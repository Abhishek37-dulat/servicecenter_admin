import React from 'react'
import { useGetCoursesQuery } from '../redux/services/courseApi';
import { AiFillStar } from 'react-icons/ai';
import { FaCartPlus } from 'react-icons/fa';
import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useAddToWishlistMutation } from '../redux/services/wishListApi';
import { toast } from 'react-toastify';

function Courses() {
    const { data: courses, isLoading, isError } = useGetCoursesQuery({
        page: 1,
        limit: 10,
      });
    console.log(courses)
    const [addtoCart]=useAddToWishlistMutation()
  return (
    <section className="courses-area section-pt-60 section-pb-90">
    <div className="  mx-auto">
      <h2 className="text-center fw-bold text-dark mb-4">Explore Programs</h2>
      {isLoading ? (
        <p className="text-center">Loading courses...</p>
      ) : (
        <div className="row g-4  mx-auto col-lg-8 col-md-12 col-sm-12">
          {courses?.courses?.map((course, index) => (
            <div
            key={index}
            className="col-lg-4 col-md-6 col-sm-12 d-flex align-items-stretch"
            >
              <div className="card shadow-sm border-0 h-100 " style={{width:'100%'}}>

              <div >
                <div className="card-header bg-transparent border-0 p-0 position-relative" style={{  height: "200px",}}>
                  <img
                    src={course?.thumbnail}
                    alt={course?.title}
                    className="card-img-top rounded-top"
                    style={{
                      height: "200px",
                      objectFit: "cover",
                    }}
                  />
         

                  <span
                    className="badge bg-danger text-white position-absolute top-0 start-0 m-2"
                    style={{ fontSize: "0.75rem", padding: "5px 10px" }}
                  >
                    Advance/Pro
                  </span>
                </div>
                <div className="card-body d-flex flex-column">
                  <h6 className=" fw-bold d-flex justify-content-between " >{course.title}  <span>₹{course.offerPrice || course.price}</span></h6>
                  
                  <div className="d-flex  mb-3">
                    <AiFillStar color="#FFD700" size={18} />
                    <AiFillStar color="#FFD700" size={18} />
                    <AiFillStar color="#FFD700" size={18} />
                    <AiFillStar color="#FFD700" size={18} />
                    <AiFillStar color="#FFD700" size={18} />
                    <span className="ms-2 text-muted">
                      {course.rating?.toFixed(1)}
                    </span>
                  </div>
                  <div className="mt-auto  " style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                    <div  >
                      <Tooltip title="Add to Cart">

                      <FaCartPlus color="#1ca766" size={"26px"} 
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
                    style={{cursor:'pointer'}}
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
      <div className="text-center mt-4">
        <button className="btn btn-primary px-4 py-2">Explore More Programs</button>
      </div>
    </div>
</section>
  )
}

export default Courses
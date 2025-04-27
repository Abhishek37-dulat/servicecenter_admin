import React from "react";

const BannerCourse = () => {
  return (
    <section
      className="d-flex align-items-center m-4"
      style={{
        backgroundImage: "url(/images/b1.png)",
        minHeight: "60vh",
        color: "#fff",
        borderRadius: "18px",
      }}
    >
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 mt-4 mt-lg-0 text-lg-start mb-4 mb-lg-0">
            <h1 className="fw-bold text-white ">Programs</h1>
             
          </div>

          {/* Right Image */}
          <div className="col-lg-6 text-center mt-4 mt-lg-0">
            <img
              src="/images/h3_hero_img.png" // Replace with the correct image path
              alt="Student working on laptop"
              className="img-fluid rounded"
              style={{ maxHeight: "400px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BannerCourse;

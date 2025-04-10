import React from "react";

const BannerSection = () => {
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
            <h1 className="fw-bold text-white ">Enroll. Engage. Excel.</h1>
            <div className="d-flex flex-column flex-lg-row gap-3 justify-content-center justify-content-lg-start">
              <a href="/courses">
              
              <button
                className="btn btn-outline-light btn-lg"
                style={{ width: "100%", maxWidth: "250px" }}
              >
                Explore Our Program
              </button>
              </a>


              <button
                className="btn btn-primary btn-lg"
                style={{
                  background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                  border: "none",
                  width: "100%",
                  maxWidth: "250px",
                }}
              >
                <a href="https://wa.me/918019836301" className="text-white">
                Enroll Now
              </a>
              </button>
            </div>
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

export default BannerSection;

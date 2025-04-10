import React from "react";

const FeatureSection = () => {
  const projects = [
    {
      image: "/images/core1.png",
      title: "Heart Disease Prediction",
    },
    {
      image: "/images/core2.png",
      title: "E-commerce Website",
    },
    {
      image: "/images/core3.png",
      title: "Auto Scaling",
    },
    {
      image: "/images/core4.png",
      title: "Credit Card Fraud Detection",
    },
    {
      image: "/images/core5.png",
      title: "Systematic Analysis",
    },
    {
      image: "/images/core6.png",
      title: "Digital Investigation-ANZ",
    },
  ];

  return (
    <section className="my-5 col-lg-8 mx-auto">
      <div className="container">
        <h2 className="text-center text-warning fw-bold mb-4">
          Work on real-world projects <br /> and gain industry-required skills
        </h2>
        <div className="row g-4">
          {projects.map((project, index) => (
            <div key={index} className="col-lg-4 col-md-6 col-sm-12">
              <div
                className="card border-0 shadow-sm"
                style={{ backgroundColor: "#fde4db", borderRadius: "10px" }}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="card-img-top"
                  style={{
                    height: "200px",
                     
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="fw-bold">{project.title}</h5>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureSection;

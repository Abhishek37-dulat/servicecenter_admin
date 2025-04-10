import React from "react";

const DynamicFeatureSection = ({ mainTitle, subTitle, features }) => {
  return (
    <section className="my-5">
      <div className="container mx-auto" >
        {/* Main Title */}
        <h2 className="text-center fw-bold" style={{ color: "#FF6F00" }}>
          {mainTitle}
        </h2>
        {/* Sub Title */}
        <h3 className="text-center fw-bold" style={{ color: "#003399", textDecoration: "underline" }}>
          {subTitle}
        </h3>

        {/* Features Grid */}
        <div className="row mt-5">
          {features.map((feature, index) => (
            <div key={index} className="col-md-6 mb-4">
              <div className="d-flex align-items-start">
                {/* Feature Image */}
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="me-3"
                  style={{
                    width: "60px",
                    height: "60px",
                  }}
                />
                {/* Feature Content */}
                <div>
                  <h5 className="fw-bold" style={{ color: "#00254d" }}>
                    {feature.title}
                  </h5>
                  <p style={{ color: "#4a4a4a" }}>{feature.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DynamicFeatureSection;

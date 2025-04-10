import React from "react";

const CategoriesSection = () => {
  const categories = [
    { icon: "/images/business.png", label: "Business" },
    { icon: "/images/development.png", label: "Development" },
    { icon: "/images/ai.png", label: "AI" },
    { icon: "/images/robot.png", label: "Robotics" },
    { icon: "/images/smart.png", label: "Automation" },
    { icon: "/images/marketing.png", label: "Marketing" },
    // { icon: "/images/finance.png", label: "Finance" },
    { icon: "/images/design.png", label: "Design" },
    { icon: "/images/hr.png", label: "HR" },
  ];

  return (
    <section className="py-5">
      <div className="container">
        {window.location.pathname!=="/courses"&&<h2 className="text-center mb-4">Explore Categories</h2>}
        <div className="row justify-content-between">
          {categories.map((category, index) => (
            <div
              key={index}
              className="col-6 col-sm-4 col-md-3 col-lg-1 text-center mb-4"
            >
              <div className="d-flex flex-column align-items-center">
                <img
                  src={category.icon}
                  alt={category.label}
                  className="img-fluid mb-2"
                  style={{ width: "60px", height: "60px" }}
                />
                <p className="mb-0">{category.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;

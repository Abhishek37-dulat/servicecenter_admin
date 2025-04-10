import React from "react";

const LearningPrograms = () => {
  const programs = [
    {
      title: "Self Learning Program",
      image: "/images/1.png", // Replace with the actual image path
      link: "/self-learning-program",
    },
    {
      title: "Intensive Training Program",
      image: "/images/2-2.png", // Replace with the actual image path
      link: "/intensive-training-program",
    },
    {
      title: "Job Assistance Program",
      image: "/images/3.png", // Replace with the actual image path
      link: "/job-assistance-program",
    },
    {
      title: "Placement Guarantee Program",
      image: "/images/4-2.png", // Replace with the actual image path
      link: "/placement-guarantee-program",
    },
  ];

  return (
    <section className="py-5">
      <div className="container">
        <h2 className="text-center fw-bold mb-3">
          Exciting Learning Programs & Classes for All 
          <span style={{ color: "#f97316" }}>{" "}Knowledge Seekers</span>
        </h2>
        <p className="text-center mb-4">
          Become lifelong learners with top mentors, engaging video training,
          & personalized learning journeys.
        </p>
        <div className="row g-4">
          {programs.map((program, index) => (
            <div key={index} className="col-lg-6 col-md-6">
              <div
                className="card shadow-sm border-0"
                style={{ borderRadius: "15px", overflow: "hidden" }}
              >
                <div
                  className="d-flex align-items-center"
                  style={{
                    background: index % 2 === 0 ? "#D9F0FF" : "#CDEDF0",
                  }}
                >
                  <div className="p-4">
                    <h4 className="fw-bold">{program.title}</h4>
                    <a href={program.link} className="text-primary fw-bold">
                      Read More
                    </a>
                  </div>
                  <div className="ms-auto">
                    <img
                      src={program.image}
                      alt={program.title}
                      style={{
                        maxHeight: "150px",
                        objectFit: "cover",
                        borderRadius: "0 15px 15px 0",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LearningPrograms;

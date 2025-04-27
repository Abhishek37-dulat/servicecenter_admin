import React from "react";

const BenefitsSection = () => {
  const benefits = [
    {
      icon: "fas fa-briefcase",
      color: "#f97316",
      title: "Industry-Relevant Skills",
      description:
        "Gain skills that are highly sought after in the technology job market.",
    },
    {
      icon: "fas fa-network-wired",
      color: "#1e3a8a",
      title: "Networking Opportunities",
      description:
        "Connect with industry experts, peers, and potential employers.",
    },
    {
      icon: "fas fa-hand-holding-heart",
      color: "#f97316",
      title: "Career Support",
      description:
        "Personalized career guidance, resume building, and mock interviews.",
    },
    {
      icon: "fas fa-graduation-cap",
      color: "#1e3a8a",
      title: "Legacyaye Alumni Network",
      description:
        "Join a vibrant community of learners and professionals for ongoing growth.",
    },
  ];

  return (
    <section className="container py-5">
      <div className="row align-items-center">
        {/* Left Side: Images */}
        <div className="col-md-6">
          <div
            className="position-relative p-3"
            style={{
              border: "2px dashed #9CA3AF",
              borderRadius: "20px",
              height: "400px",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gridGap: "15px",
            }}
          >
            <div
              className="rounded"
              style={{
                backgroundColor: "#f97316",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/s1.png"
                alt="Student 1"
                className="img-fluid w-100 h-100"
                style={{ objectFit:"contain" }}
              />
            </div>
            <div
              className="rounded"
              style={{
                backgroundColor: "#1e3a8a",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/s2.png"
                alt="Student 2"
                className="img-fluid w-100 h-100"
                style={{ objectFit:"contain" }}
              />
            </div>
            <div
              className="rounded"
              style={{
                backgroundColor: "#1e3a8a",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/s3.png"
                alt="Student 3"
                className="img-fluid w-100 h-100"
                style={{ objectFit:"contain" }}
              />
            </div>
            <div
              className="rounded"
              style={{
                backgroundColor: "#f97316",
                overflow: "hidden",
              }}
            >
              <img
                src="/images/s4.png"
                alt="Student 4"
                className="img-fluid w-100 h-100"
                style={{ objectFit:"contain" }}
              />
            </div>
          </div>
        </div>

        {/* Right Side: Benefits */}
        <div className="col-md-6">
          <h2 className="fw-bold">
            <span style={{ color: "#f97316" }}>BENEFITS</span> From Our Online
            Learning
          </h2>
          <ul className="list-unstyled mt-4">
            {benefits.map((benefit, index) => (
              <li className="d-flex align-items-start mb-4" key={index}>
                <div
                  className="d-flex justify-content-center align-items-center me-3"
                  style={{
                    backgroundColor: benefit.color,
                    borderRadius: "50%",
                    width: "50px",
                    height: "50px",
                  }}
                >
                  <i
                    className={`${benefit.icon} text-white`}
                    style={{ fontSize: "20px" }}
                  ></i>
                </div>
                <div>
                  <h5 className="fw-bold mb-1">{benefit.title}</h5>
                  <p className="mb-0 text-secondary">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;

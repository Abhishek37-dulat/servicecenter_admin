import React from "react";
import { FaAward, FaDoorOpen, FaMedal } from "react-icons/fa";

function Certificate() {
  return (
    <section className="certificate-section py-5">
      <div className="container">
        <div className="row align-items-center">
          {/* Left Content */}
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <h2 className="fw-bold mb-3">
              Get <span className="text-primary">Certified</span>
            </h2>
            <p className="text-muted mb-4">
              Upon completing the Intensive Training Program, you'll earn a
              prestigious certificate that highlights your commitment and
              expertise in cutting-edge technologies. These certifications will
              set you apart in the tech industry.
            </p>

            <div className="d-flex align-items-start mb-4">
              <div
                className="icon-wrapper me-3"
                style={{
                  backgroundColor: "#f0f8ff",
                  borderRadius: "50%",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaAward size={24} className="text-primary" />
              </div>
              <div>
                <h5 className="fw-bold text-dark">Industry-Endorsed Certification</h5>
                <p className="text-muted mb-0">
                  This certificate, backed by partnerships with top companies
                  like NASSCOM and Microsoft.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start mb-4">
              <div
                className="icon-wrapper me-3"
                style={{
                  backgroundColor: "#f0f8ff",
                  borderRadius: "50%",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaMedal size={24} className="text-primary" />
              </div>
              <div>
                <h5 className="fw-bold text-dark">A Recognized Badge of Expertise</h5>
                <p className="text-muted mb-0">
                  Showcase your certification on platforms such as LinkedIn,
                  Twitter, or your resume.
                </p>
              </div>
            </div>

            <div className="d-flex align-items-start">
              <div
                className="icon-wrapper me-3"
                style={{
                  backgroundColor: "#f0f8ff",
                  borderRadius: "50%",
                  padding: "10px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FaDoorOpen size={24} className="text-primary" />
              </div>
              <div>
                <h5 className="fw-bold text-dark">Open Doors to New Opportunities</h5>
                <p className="text-muted mb-0">
                  Your certification speaks volumes to employers, validating
                  your real-world training.
                </p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6 col-md-12 text-center">
            <img
              src="/images/certificate.png"
              alt="Certificate"
              style={{
                borderRadius: "10px",
                border: "2px solid orange",
                width: "100%",
                maxHeight: "350px",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Certificate;

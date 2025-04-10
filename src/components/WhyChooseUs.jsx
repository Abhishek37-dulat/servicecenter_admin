import { FaLightbulb, FaUserCheck, FaAward, FaCoins, FaChartLine, FaUsers } from "react-icons/fa";

const WhyChooseUs = () => {
  return (
    <section className="py-5 bg-light">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="fw-bold">Why Choose Legacy Aye?</h2>
          <p className="text-muted">
            Your trusted career partner for hands-on training, personalized mentorship, and real-world success.
          </p>
        </div>
        <div className="row">
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <FaLightbulb className="text-primary fs-1 mb-3" />
                <h5 className="card-title">Real-World Skills</h5>
                <p className="card-text">
                  Get equipped with the skills and hands-on training you need to excel in real-world scenarios.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <FaUserCheck className="text-success fs-1 mb-3" />
                <h5 className="card-title">Personalized Mentorship</h5>
                <p className="card-text">
                  Receive one-on-one guidance and mentorship to help you gain confidence and practical experience.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <FaAward className="text-warning fs-1 mb-3" />
                <h5 className="card-title">Recognized Certifications</h5>
                <p className="card-text">
                  Stand out with certifications from AICTE, IBM, ISO, and EURO that are valued by top employers.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <FaCoins className="text-danger fs-1 mb-3" />
                <h5 className="card-title">Stipends & Opportunities</h5>
                <p className="card-text">
                  Earn stipends from 15K to 40K and work on projects with leading multinational companies.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <FaChartLine className="text-info fs-1 mb-3" />
                <h5 className="card-title">Career Development</h5>
                <p className="card-text">
                  Access career support for up to two years after course completion and secure top industry jobs.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-6 col-lg-4 mb-4">
            <div className="card h-100 shadow border-0 text-center">
              <div className="card-body">
                <FaUsers className="text-secondary fs-1 mb-3" />
                <h5 className="card-title">Collaborative Environment</h5>
                <p className="card-text">
                  Learn in a unique environment that fosters growth, creativity, and teamwork for maximum success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;

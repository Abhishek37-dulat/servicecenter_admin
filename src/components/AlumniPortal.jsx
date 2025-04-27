import React from 'react';

function AlumniPortal() {
  return (
    <div className="container py-5">
      <h1 className="text-center mb-4">Alumni Portal</h1>
      <p className="text-center mb-5">
        Connect with our esteemed alumni and explore their journeys of success. 
        The alumni portal offers insights into their achievements, experiences, and contributions.
      </p>
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        <div className="col">
          <div className="card h-100">
            <img src="/images/alumni1.jpg" className="card-img-top" alt="Alumni 1" />
            <div className="card-body">
              <h5 className="card-title">John Doe</h5>
              <p className="card-text">
                John is a software engineer at a leading tech company, making strides in AI and machine learning.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <img src="/images/alumni2.jpg" className="card-img-top" alt="Alumni 2" />
            <div className="card-body">
              <h5 className="card-title">Jane Smith</h5>
              <p className="card-text">
                Jane has become a renowned entrepreneur, founding a successful e-commerce startup.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <img src="/images/alumni3.jpg" className="card-img-top" alt="Alumni 3" />
            <div className="card-body">
              <h5 className="card-title">Mark Johnson</h5>
              <p className="card-text">
                Mark is a financial analyst at a global investment firm, excelling in portfolio management.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <img src="/images/alumni4.jpg" className="card-img-top" alt="Alumni 4" />
            <div className="card-body">
              <h5 className="card-title">Emily Davis</h5>
              <p className="card-text">
                Emily works in healthcare, contributing to advancements in medical technology and patient care.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <img src="/images/alumni5.jpg" className="card-img-top" alt="Alumni 5" />
            <div className="card-body">
              <h5 className="card-title">Michael Brown</h5>
              <p className="card-text">
                Michael is a successful author and public speaker, inspiring others through his work.
              </p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="card h-100">
            <img src="/images/alumni6.jpg" className="card-img-top" alt="Alumni 6" />
            <div className="card-body">
              <h5 className="card-title">Sophia Wilson</h5>
              <p className="card-text">
                Sophia is a researcher in environmental science, driving sustainable solutions globally.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AlumniPortal;

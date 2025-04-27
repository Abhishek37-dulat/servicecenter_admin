import React from "react";

const CompanyLogos = () => {
  const images = Array.from({ length: 22 }, (_, i) => `/images/comp/${i + 1}.png`);
  const images1 = Array.from({ length: 40 }, (_, i) => `/images/comp/${i + 20}.png`);
  const images2 = Array.from({ length: 40 }, (_, i) => `/images/comp/${i + 10}.png`);

  return (
    <section className="py-5">
      <div className="container text-center p-2 rounded" style={{background:'white'}}>
        <h1 className="fw-bold">2000+ Companies Hired Legacy Aye Learners</h1>
        <p className="text-muted mb-4">Top companies hiring from our platform</p>
 
        {/* First Row */}
        <div className="marquee " >
          <div className="marquee-content my-3">
            {images.map((src, index) => (
              <img
                key={`first-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo"
                style={{objectFit:'contain', height:'60px', width:"80px"}}
              />
            ))}
          </div>
        </div>

        {/* Second Row (Reversed) */}
        <div className="marquee marquee-reverse">
          <div className="marquee-content">
            {images1.map((src, index) => (
              <img
                key={`second-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo"
                style={{objectFit:'contain', height:'60px', width:"80px"}}

              />
            ))}
          </div>
        </div>

        <div className="marquee " >
          <div className="marquee-content my-3">
            {images2.map((src, index) => (
              <img
                key={`first-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo"
                style={{objectFit:'contain', height:'60px', width:"80px"}}
              />
            ))}
          </div>
        </div>

        <div className="marquee marquee-reverse">
          <div className="marquee-content">
            {images.map((src, index) => (
              <img
                key={`second-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo"
                style={{objectFit:'contain', height:'60px', width:"80px"}}

              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;

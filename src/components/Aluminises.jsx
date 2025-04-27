import React from "react";

const Aluminies = () => {
  const images = Array.from({ length: 10 }, (_, i) => `/images/comp/${i + 1}.png`);
  const images1 = Array.from({ length: 20 }, (_, i) => `/images/comp/${i + 10}.png`);
  const images2 = Array.from({ length: 30 }, (_, i) => `/images/comp/${i + 20}.png`);

  return (
    <section className="py-5">
      <div className="container text-center bg-white p-2 rounded">
        <h1 className="fw-bold">LEARN THE BEST FROM THE ALUMNI OF</h1>

        {/* First Row */}
        <div className="marquee">
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
        <div className="marquee marquee-reverse">
          <div className="marquee-content my-3">
            {images1.map((src, index) => (
              <img
                key={`first-row-${index}`}
                style={{objectFit:'contain', height:'60px', width:"80px"}}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo"
              />
            ))}
          </div>
        </div>
        <div className="marquee">
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
      </div>
    </section>
  );
};

export default Aluminies;

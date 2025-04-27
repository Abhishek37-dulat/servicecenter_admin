import React from "react";

const MentorCommunity = () => {

  const images = Array.from({ length: 19 }, (_, i) => {
    const num = i + 1;
    return num <= 11 && num % 2 !== 0  
      ? `/images/mentor/${num}.jpg`
      : `/images/mentor/${num}.png`;  
  });
  return (
    <section className="py-5 bg-white">
      <div className="container text-center">
        <h1 className="fw-bold text-dark mb-3">Mentor Community</h1>

        <p className="text-success fs-5 fw-semibold fst-italic mx-auto mb-4" style={{ maxWidth: "700px" }}>
          We collaborate with professionals from great companies to guide you on an exciting journey. <br />
          Our Mentor Community strongly believes in the power of sharing!
        </p>

 
    <div className="container d-flex justify-content-center">
  <div className="row justify-content-center text-center w-100" style={{ maxWidth: "70%" }}>
    {images.map((src, index) => (
      <div key={index} className="col-6 col-md-4 col-lg-2 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center justify-content-center">
          <img 
            src={src} 
            alt={`Mentor logo ${index + 1}`} 
            className="img-fluid rounded"
            style={{ width: "80px", height: "80px", objectFit: "contain" }} 
          />
        </div>
      </div>
    ))}
  </div>
</div>


      </div>
    </section>
  );
};

export default MentorCommunity;

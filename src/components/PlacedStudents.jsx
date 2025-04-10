import React from "react";

const PlacedStudents = () => {
  const totalImages = 10;  
  // const images = Array.from({ length: totalImages }, (_, i) => `/images/IQschool/${i + 1}.png`);
  
  const imageGroups = [
    [   "/images/IQschool/3.png", "/images/IQschool/5.png","/images/IQschool/11.png", "/images/IQschool/6.png",   "/images/IQschool/8.png", "/images/IQschool/9.png", "/images/IQschool/10.png",
     "/images/IQschool/12.png", "/images/IQschool/13.png", "/images/IQschool/14.png", "/images/IQschool/15.png", "/images/IQschool/16.png", "/images/IQschool/17.png", "/images/IQschool/18.png", "/images/IQschool/19.png", "/images/IQschool/20.png"],
    ["/images/IQschool/21.png", "/images/IQschool/22.png", "/images/IQschool/23.png", "/images/IQschool/24.png", "/images/IQschool/25.png", "/images/IQschool/26.png", "/images/IQschool/27.png", "/images/IQschool/28.png", "/images/IQschool/29.png", "/images/IQschool/30.png"
    ,"/images/IQschool/31.png", "/images/IQschool/32.png", "/images/IQschool/33.png", "/images/IQschool/34.png", "/images/IQschool/35.png", "/images/IQschool/36.png", "/images/IQschool/37.png", "/images/IQschool/38.png", "/images/IQschool/39.png", "/images/IQschool/40.png"],
    ["/images/IQschool/41.png", "/images/IQschool/42.png", "/images/IQschool/43.png", "/images/IQschool/44.png", "/images/IQschool/45.png", "/images/IQschool/46.png", "/images/IQschool/47.png", "/images/IQschool/48.png", "/images/IQschool/49.png", "/images/IQschool/50.png",
    "/images/IQschool/51.png", "/images/IQschool/52.png", "/images/IQschool/53.png", "/images/IQschool/54.png", "/images/IQschool/55.png", "/images/IQschool/56.png", "/images/IQschool/57.png", "/images/IQschool/58.png", "/images/IQschool/59.png", "/images/IQschool/60.png"],
    ["/images/IQschool/61.png", "/images/IQschool/62.png", "/images/IQschool/63.png", "/images/IQschool/64.png", "/images/IQschool/65.png", "/images/IQschool/66.png", "/images/IQschool/67.png", "/images/IQschool/68.png", "/images/IQschool/69.png", "/images/IQschool/70.png",
    "/images/IQschool/71.png", "/images/IQschool/72.png", "/images/IQschool/73.png", "/images/IQschool/74.png", "/images/IQschool/75.png", "/images/IQschool/76.png", "/images/IQschool/77.png", "/images/IQschool/78.png", "/images/IQschool/79.png", "/images/IQschool/80.png",
    "/images/IQschool/81.png", "/images/IQschool/82.png", "/images/IQschool/83.png", "/images/IQschool/84.png", "/images/IQschool/85.png", "/images/IQschool/86.png", "/images/IQschool/87.png", "/images/IQschool/88.png", "/images/IQschool/89.png"]
  ];
  
  const marqueeLines = 9; // Number of lines

  return (
    <section className="py-5">
      <div className="container text-center">
        <h2 className="fw-bold">Our Placed Students</h2>
        <p className="text-muted mb-4">Meet the achievers who are making us proud</p>

        <div className="marquee">
          <div className="marquee-content my-3">
            {imageGroups[0].map((src, index) => (
              <img
                key={`first-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo rounded "
                style={{height:'240px'}}
              />
            ))}
          </div>
        </div>

    
        <div className="marquee marquee-reverse">
          <div className="marquee-content">
            {imageGroups[1].map((src, index) => (
              <img
                key={`second-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo rounded "
                style={{height:'240px'}}
              />
            ))}
          </div>
        </div>
        <div className="marquee">
          <div className="marquee-content my-3">
            {imageGroups[2].map((src, index) => (
              <img
                key={`first-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo rounded "
                style={{height:'240px'}}
              />
            ))}
          </div>
        </div>

    
        <div className="marquee marquee-reverse">
          <div className="marquee-content">
            {imageGroups[3].map((src, index) => (
              <img
                key={`second-row-${index}`}
                src={src}
                alt={`Company logo ${index + 1}`}
                className="company-logo rounded "
                style={{height:'240px'}}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlacedStudents;

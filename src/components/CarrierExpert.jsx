import React from "react";

const CareerExpertModal = () => {
  return (
    <div
      className="p-4 m-3 position-relative rounded text-center"
      style={{
        backgroundImage: "url(/images/call.png)", // Replace with your image path
        backgroundPosition: "center",
        backgroundSize: "cover",
      }}
    >
           <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // Black transparent overlay
          zIndex: 1,
          borderRadius: "inherit", // Matches the parent border-radius
        }}
      ></div>
   <div
        className="position-relative text-white"
        style={{
          zIndex: 2,
        }}
      >
      {/* <div className="mb-4"> */}
        <h2 className=" fw-bold mb-2 text-white">Talk to Our Career Expert</h2>
        <p className="text-white">We'd love to hear from you</p>
      {/* </div> */}

      {/* Buttons */}
      <div className="d-flex flex-column gap-3">
        {/* WhatsApp Button */}
        <a
          href="https://wa.me/918019836301" // Replace with your WhatsApp link
          className="btn btn-success  shadow-sm text-white"
        >
          WhatsApp Us
        </a>

        {/* Divider */}
        <div className="text-muted my-2 " style={{fontWeight:'bold'}}>OR</div>

        {/* Call Back Button */}
        <a
          href="tel:8019836301"
          className="btn btn-secondary  shadow-sm"
        //   onClick={() => alert("Requesting a callback!")}
        >
          Request A Call Back
        </a>
      </div>
      </div>
    </div>
  );
};

export default CareerExpertModal;

import React from "react";
import { FaWhatsapp } from "react-icons/fa";

const FloatingWhatsAppButton = () => {
  return (
    <a
      href="https://wa.me/918019836301" 
      target="_blank"
      rel="noopener noreferrer"
      className="btn btn-success d-flex align-items-center justify-content-center"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        width: "60px",
        height: "60px",
        borderRadius: "50%",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        zIndex: 1000,
      }}
    >
      <FaWhatsapp size={30} />
    </a>
  );
};

export default FloatingWhatsAppButton;

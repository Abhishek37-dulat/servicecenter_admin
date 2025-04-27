import React, { useState } from "react";
import BusinessContact from "./BusinessContact";

const ParentComponent = () => {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    whatsapp: "",
    website: "",
    altEmail: "",
    altPhone: "",
  });

  const handleChange = (field, value) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSave = (data) => {
    console.log("Save data:", data);
    // Here you would call an API to save the data
  };

  const handleCancel = () => {
    console.log("Cancel changes");
  };

  return (
    <div>
      <BusinessContact
        formData={formData}
        handleChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default ParentComponent;

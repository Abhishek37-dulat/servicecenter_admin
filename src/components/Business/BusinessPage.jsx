import React, { useState } from "react";
import BusinessLocation from "./BusinessLocation";

export default function BusinessPage() {
  const [formData, setFormData] = useState({
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    latitude: "",
    longitude: "",
    googleMapUrl: "",
    landmark: "",
  });

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Business Location</h2>
      <BusinessLocation formData={formData} setFormData={setFormData} />
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { Input, Button, message } from "antd";
import { useUpdateBusinessMutation } from "../../redux/services/businessApi";

const BusinessContact = ({ data, businessId, onCancel }) => {
  const [contactData, setContactData] = useState({
    email: "",
    altEmail: "",
    phone: "",
    altPhone: "",
    whatsapp: "",
    website: "",
  });

  const [updateBusiness, { isLoading }] = useUpdateBusinessMutation(); // Update business mutation
  // Prefill form data when the component mounts or when data changes
  useEffect(() => {
    if (data?.data && data?.success) {
      setContactData({
        email: data?.data?.email || "",
        altEmail: data?.data?.altEmail || "",
        phone: data?.data?.phone || "",
        altPhone: data?.data?.altPhone || "",
        whatsapp: data?.data?.whatsapp || "",
        website: data?.data?.website || "",
      });
    }
  }, [data]); // Re-run this effect whenever the data prop changes

  // Handle input field changes
  const handleInputChange = (field) => (e) => {
    const { value } = e.target;
    setContactData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  // Handle save button click
  const handleSave = async () => {
    if (!businessId) {
      message.error("Business ID is missing!");
      return;
    }

    try {
      const updatedData = {
        email: contactData.email,
        altEmail: contactData.altEmail,
        phone: contactData.phone,
        altPhone: contactData.altPhone,
        whatsapp: contactData.whatsapp,
        website: contactData.website,
      };

      // Call the updateBusiness mutation with business ID and updated data
      const response = await updateBusiness({
        id: businessId, // business ID passed as prop
        updatedData, // updated contact data
      }).unwrap();

      console.log("Business updated successfully:", response);
      message.success("Business contact details updated successfully!");

      // Call onCancel to close the form or handle post-save actions
      if (onCancel) onCancel();
    } catch (error) {
      console.error("Error updating business:", error);
      message.error(
        error?.data?.message || "Failed to update business details"
      );
    }
  };

  const handleCancel = () => {
    if (onCancel) onCancel();
  };

  return (
    <div className="space-y-6">
      {/* Contact Form Fields */}
      <div className="space-y-4">
        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <Input
            placeholder="business@example.com"
            value={contactData.email || ""}
            onChange={handleInputChange("email")}
          />
        </div>

        {/* Alternate Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alternate Email (Optional)
          </label>
          <Input
            placeholder="alternate@example.com"
            value={contactData.altEmail || ""}
            onChange={handleInputChange("altEmail")}
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Phone Number
          </label>
          <Input
            placeholder="Primary contact number"
            value={contactData.phone || ""}
            onChange={handleInputChange("phone")}
          />
        </div>

        {/* Alternate Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alternate Phone (Optional)
          </label>
          <Input
            placeholder="Alternate number"
            value={contactData.altPhone || ""}
            onChange={handleInputChange("altPhone")}
          />
        </div>

        {/* WhatsApp */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            WhatsApp Number
          </label>
          <Input
            placeholder="e.g., +91 9876543210"
            value={contactData.whatsapp || ""}
            onChange={handleInputChange("whatsapp")}
          />
        </div>

        {/* Website */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Website (Optional)
          </label>
          <Input
            placeholder="https://www.example.com"
            value={contactData.website || ""}
            onChange={handleInputChange("website")}
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex space-x-4 pt-6">
        <Button type="primary" onClick={handleSave} loading={isLoading}>
          Save
        </Button>
        <Button onClick={handleCancel}>Cancel</Button>
      </div>
    </div>
  );
};

export default BusinessContact;

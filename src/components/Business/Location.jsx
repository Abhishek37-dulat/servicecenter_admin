import React, { useState, useEffect } from "react";
import { Input, Select, Button, message } from "antd";
import { useUpdateBusinessMutation } from "../../redux/services/businessApi";

const { Option } = Select;

export default function Location({ businessId, data, onSave, onCancel }) {
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

  const [updateBusiness, { isLoading: isUpdating }] =
    useUpdateBusinessMutation();

  // Set form data if businessId and data exist
  useEffect(() => {
    if (data?.success && data?.data) {
      setFormData({
        address1: data.data.address1 || "",
        address2: data.data.address2 || "",
        city: data.data.city || "",
        state: data.data.state || "",
        zip: data.data.zip || "",
        country: data.data.country || "",
        latitude: data.data.latitude || "",
        longitude: data.data.longitude || "",
        googleMapUrl: data.data.googleMapUrl || "",
        landmark: data.data.landmark || "",
      });
    }
  }, [data]);

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSave = async () => {
    // Ensure businessId and formData fields are properly populated
    if (!businessId) {
      message.error("Business ID is missing or invalid.");
      return;
    }

    const updatedData = {
      businessId,
      address1: formData.address1 || data?.data.address1,
      address2: formData.address2 || data?.data.address2,
      city: formData.city || data?.data.city,
      state: formData.state || data?.data.state,
      zip: formData.zip || data?.data.zip,
      country: formData.country || data?.data.country,
      latitude: formData.latitude || data?.data.latitude,
      longitude: formData.longitude || data?.data.longitude,
      googleMapUrl: formData.googleMapUrl || data?.data.googleMapUrl,
      landmark: formData.landmark || data?.data.landmark,
    };

    try {
      // Validate fields
      if (
        !updatedData.address1 ||
        !updatedData.city ||
        !updatedData.state ||
        !updatedData.zip
      ) {
        message.error("Address fields are required.");
        return;
      }

      // Update existing business
      const res = await updateBusiness({
        id: businessId,
        updatedData,
      }).unwrap();

      // Handle the successful update response
      console.log("Business updated successfully:", res);
      message.success("Business updated successfully!");

      // Close the form after successful save
      if (onCancel) {
        onCancel(); // Close the form after successful save
      }
    } catch (err) {
      // Handle errors and display appropriate message
      console.error("Error updating business:", err);
      message.error(err?.message || "Failed to update business.");
    }
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Call parent onCancel function
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold mb-6">Business Location</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Address Line 1 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 1
          </label>
          <Input
            placeholder="123 Main St"
            value={formData.address1}
            onChange={(e) => handleChange("address1", e.target.value)}
          />
        </div>

        {/* Address Line 2 */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Address Line 2
          </label>
          <Input
            placeholder="Apartment, Suite, etc."
            value={formData.address2}
            onChange={(e) => handleChange("address2", e.target.value)}
          />
        </div>

        {/* City */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City
          </label>
          <Input
            placeholder="City"
            value={formData.city}
            onChange={(e) => handleChange("city", e.target.value)}
          />
        </div>

        {/* State */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State / Province
          </label>
          <Input
            placeholder="State"
            value={formData.state}
            onChange={(e) => handleChange("state", e.target.value)}
          />
        </div>

        {/* Zip */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <Input
            placeholder="ZIP / Postal Code"
            value={formData.zip}
            onChange={(e) => handleChange("zip", e.target.value)}
          />
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <Select
            showSearch
            placeholder="Select Country"
            value={formData.country}
            onChange={(value) => handleChange("country", value)}
            className="w-full"
          >
            <Option value="India">India</Option>
            <Option value="USA">USA</Option>
            <Option value="UK">UK</Option>
            <Option value="Australia">Australia</Option>
            {/* Add more countries */}
          </Select>
        </div>

        {/* Latitude */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Latitude
          </label>
          <Input
            placeholder="Latitude"
            value={formData.latitude}
            onChange={(e) => handleChange("latitude", e.target.value)}
          />
        </div>

        {/* Longitude */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Longitude
          </label>
          <Input
            placeholder="Longitude"
            value={formData.longitude}
            onChange={(e) => handleChange("longitude", e.target.value)}
          />
        </div>

        {/* Google Maps URL */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Maps URL
          </label>
          <Input
            placeholder="https://maps.google.com/..."
            value={formData.googleMapUrl}
            onChange={(e) => handleChange("googleMapUrl", e.target.value)}
          />
        </div>

        {/* Landmark */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Landmark
          </label>
          <Input
            placeholder="Near metro station, mall etc."
            value={formData.landmark}
            onChange={(e) => handleChange("landmark", e.target.value)}
          />
        </div>
      </div>

      {/* Save and Cancel buttons */}
      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="primary"
          onClick={handleSave}
          loading={isUpdating}
          disabled={isUpdating}
        >
          Save
        </Button>
        <Button onClick={handleCancel} className="bg-gray-300 text-gray-700">
          Cancel
        </Button>
      </div>
    </div>
  );
}

import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateLeadMutation } from "../redux/services/leadApi";

const BookDemoForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    qualification: "",
    state: "",
  });

  const [errors, setErrors] = useState({});
  const [createLead, { isLoading }] = useCreateLeadMutation();

  const validateFields = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required.";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.qualification.trim())
      newErrors.qualification = "Qualification is required.";
    if (!formData.state.trim()) newErrors.state = "State is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateFields()) {
      try {
       const res= await createLead(formData).unwrap();
        toast.success("Demo booked successfully!");

        // Reset form
        setFormData({
          name: "",
          mobile: "",
          qualification: "",
          state: "",
        });
        setErrors({});
      } catch (error) {
        toast.error(error?.data?.message || "Failed to book demo.");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const qualifications = [
    "Graduation (Completed)",
    "Graduation (Ongoing)",
    "Post Graduation (Completed)",
    "Post Graduation (Ongoing)",
    "12th / Intermediate",
    "Diploma",
  ];

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];

  return (
    <div className="container my-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "500px", borderRadius: "15px" }}>
        <div className="card-body p-4">
          <h3 className="text-center mb-4">
            Book a Live Demo For <span className="text-primary">Free!</span>
          </h3>
          <form onSubmit={handleSubmit}>
            {/* Name Field */}
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter Your Name"
              />
              <div className="invalid-feedback">{errors.name}</div>
            </div>

            {/* Mobile Field */}
            <div className="mb-3">
              <label className="form-label">Mobile Number (WhatsApp Number)</label>
              <div className="input-group">
                <span className="input-group-text">IN +91</span>
                <input
                  type="text"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                  placeholder="Enter Mobile Number"
                />
              </div>
              <div className="invalid-feedback">{errors.mobile}</div>
            </div>

            {/* Qualification Field */}
            <div className="mb-3">
              <label className="form-label">Highest Qualification</label>
              <select
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                className={`form-select ${errors.qualification ? "is-invalid" : ""}`}
              >
                <option value="">Select Highest Qualification</option>
                {qualifications.map((qualification, index) => (
                  <option key={index} value={qualification}>
                    {qualification}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.qualification}</div>
            </div>

            {/* State Field */}
            <div className="mb-3">
              <label className="form-label">Native State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className={`form-select ${errors.state ? "is-invalid" : ""}`}
              >
                <option value="">Select Your State</option>
                {states.map((state, index) => (
                  <option key={index} value={state}>
                    {state}
                  </option>
                ))}
              </select>
              <div className="invalid-feedback">{errors.state}</div>
            </div>

            {/* Terms and Conditions */}
            <p className="text-muted small">
              By proceeding further, I agree to the{" "}
              <a href="/terms" className="text-primary">
                Terms & Conditions
              </a>{" "}
              and{" "}
              <a href="/privacy" className="text-primary">
                Privacy Policy
              </a>{" "}
              of Legacyaye.
            </p>

            {/* Submit Button */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={isLoading}
              style={{
                background: "linear-gradient(to right, #ff7e5f, #feb47b)",
                border: "none",
              }}
            >
              {isLoading ? "Booking..." : "Book My Demo"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookDemoForm;

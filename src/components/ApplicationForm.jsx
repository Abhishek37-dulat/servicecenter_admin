import React, { useState } from "react";
import { toast } from "react-toastify";
import { useAddApplicationMutation } from "../redux/services/hireWithUs";
import { useUploadResumeMutation } from "../redux/services/leadApi";

const ApplicationForm = () => {
  const [sendApplication] = useAddApplicationMutation();
  const [uploadResume, { isLoading: isUploading }] = useUploadResumeMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    education: "",
    location: "",
    jobPosition: "",
    resume: "",
    coverLetter: "",
    linkedInProfile: "",
    agreePrivacyPolicy: false,
  });

  const [errors, setErrors] = useState({});

  const clearFieldError = (name) => {
    if (errors[name]) {
      setErrors((prevErrors) => ({ ...prevErrors, [name]: null }));
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors((prevErrors) => ({ ...prevErrors, resume: "File size must be less than 2MB" }));
        return;
      }
      if (!["application/pdf"].includes(file.type)) {
        setErrors((prevErrors) => ({ ...prevErrors, resume: "Only PDF files are allowed" }));
        return;
      }
      try {
        const formData = new FormData();
        formData.append("resume", file);
        const { url } = await uploadResume(formData).unwrap();
        setFormData((prev) => ({ ...prev, resume: url }));
        clearFieldError("resume");
        toast.success("Resume uploaded successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } catch (error) {
        toast.error("Failed to upload resume. Please try again.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.agreePrivacyPolicy ) {
      toast.error("You must agree to the Privacy Policy and Equal Opportunity Disclaimer.");
      return;
    }
    const applicationData = {
      ...formData,
      agreePrivacyPolicy: formData.agreePrivacyPolicy ? true : false,
    };
    try {
      await sendApplication(applicationData).unwrap();
      toast.success("Application submitted successfully!");

      setFormData({
        fullName: "",
        age: "",
        education: "",
        location: "",
        jobPosition: "",
        resume: "",
        coverLetter: "",
        linkedInProfile: "",
        agreePrivacyPolicy: false,
        agreeEqualOpportunity: false,
      });
      setErrors({});
    } catch (error) {
      toast.error(error?.data?.message || "An error occurred while submitting the application.", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    clearFieldError(name);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="card p-2">
        <div className="mb-3">
          <input type="text" className="form-control" placeholder="Full Name" id="fullName" name="fullName" value={formData.fullName} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="number" className="form-control" placeholder="Age" id="age" name="age" value={formData.age} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="education" placeholder="Education" name="education" value={formData.education} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="location" placeholder="Location" name="location" value={formData.location} onChange={handleChange} required />
        </div>
        <div className="mb-3">
          <input type="text" className="form-control" id="jobPosition" placeholder="Job Position" name="jobPosition" value={formData.jobPosition} onChange={handleChange} required />
        </div>

        <div className="mb-3">
          <input
            type="file"
            className="form-control"
            id="resume"
            name="resume"
            onChange={handleFileChange}
            accept=".pdf"
            required
          />
          {errors.resume && <div className="invalid-feedback d-block">{errors.resume}</div>}
        </div>

        <div className="mb-3">
          <textarea className="form-control" id="coverLetter" placeholder="Cover Letter" name="coverLetter" value={formData.coverLetter} onChange={handleChange} rows="3"></textarea>
        </div>

        <div className="mb-3">
          <input type="text" className="form-control" id="linkedInProfile" placeholder="LinkedIn Profile" name="linkedInProfile" value={formData.linkedInProfile} onChange={handleChange} />
        </div>

        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" id="agreePrivacyPolicy" name="agreePrivacyPolicy" checked={formData.agreePrivacyPolicy} onChange={handleChange} required />
          <label htmlFor="agreePrivacyPolicy">I agree to the Privacy Policy.</label>
        </div>
 

        <button type="submit" className="btn btn-primary" disabled={isUploading}>
          {isUploading ? "Uploading Resume..." : "Submit Application"}
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;

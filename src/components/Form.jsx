import React, { useState } from "react";
import { toast } from "react-toastify";
import { useCreateLeadMutation, useUploadResumeMutation } from "../redux/services/leadApi";

const Form1 = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    preferredCourse: "",
    education: "",
    reasonForApplying: "",
    howDidYouHearAboutUs: "",
    resume: "",
    scholarshipReason: "",
  });

  const [errors, setErrors] = useState({});
  const [createLead, { isLoading: isCreating }] = useCreateLeadMutation();
  const [uploadResume, { isLoading: isUploading }] = useUploadResumeMutation();

  const validateStep1 = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Enter a valid email address";
    if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Enter a valid 10-digit mobile number";
    if (!formData.preferredCourse.trim())
      newErrors.preferredCourse = "Preferred course is required";
    if (!formData.reasonForApplying.trim())
      newErrors.reasonForApplying = "Reason for applying is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors = {};
    if (!formData.education.trim())
      newErrors.education = "Education level is required";
    if (!formData.howDidYouHearAboutUs.trim())
      newErrors.howDidYouHearAboutUs = "This field is required";
    if (!formData.scholarshipReason.trim())
      newErrors.scholarshipReason = "Scholarship reason is required";
    if (!formData.resume) newErrors.resume = "Please upload your resume";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clearFieldError = (name) => {
    if (errors[name]) {
      setErrors({ ...errors, [name]: null });
    }
  };

  const handleNext = () => {
    if (step === 1 && validateStep1()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep((prevStep) => prevStep - 1);
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setErrors({ ...errors, resume: "File size must be less than 2MB" });
        return;
      }
      if (!["application/pdf"].includes(file.type)) {
        setErrors({ ...errors, resume: "Only PDF files are allowed" });
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
    if (step === 2 && validateStep2()) {
      try {
        await createLead(formData).unwrap();
        toast.success("Form submitted successfully!", {
          position: toast.POSITION.TOP_RIGHT,
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          mobile: "",
          preferredCourse: "",
          education: "",
          reasonForApplying: "",
          howDidYouHearAboutUs: "",
          resume: "",
          scholarshipReason: "",
        });
        setErrors({});
        setStep(1);
      } catch (error) {
        toast.error(error?.data?.message || "An error occurred while submitting the form.", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
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
    <div className="container mt-5">
      <div className="card shadow-lg mx-auto" style={{ maxWidth: "600px", borderRadius: "15px" }}>
        <div className="card-body">
          <h4 className="text-center mb-4">Scholarship Application</h4>
          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-control ${errors.name ? "is-invalid" : ""}`}
                    placeholder="Full Name"
                  />
                  <div className="invalid-feedback">{errors.name}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-control ${errors.email ? "is-invalid" : ""}`}
                    placeholder="Email Address"
                  />
                  <div className="invalid-feedback">{errors.email}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="mobile"
                    value={formData.mobile}
                    onChange={handleChange}
                    className={`form-control ${errors.mobile ? "is-invalid" : ""}`}
                    placeholder="Phone Number"
                  />
                  <div className="invalid-feedback">{errors.mobile}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="preferredCourse"
                    value={formData.preferredCourse}
                    onChange={handleChange}
                    className={`form-control ${errors.preferredCourse ? "is-invalid" : ""}`}
                    placeholder="Preferred Course"
                  />
                  <div className="invalid-feedback">{errors.preferredCourse}</div>
                </div>
                <div className="mb-3">
                  <textarea
                    name="reasonForApplying"
                    value={formData.reasonForApplying}
                    onChange={handleChange}
                    className={`form-control ${errors.reasonForApplying ? "is-invalid" : ""}`}
                    rows="3"
                    placeholder="Reason for Applying"
                  ></textarea>
                  <div className="invalid-feedback">{errors.reasonForApplying}</div>
                </div>
              </>
            )}

            {step === 2 && (
              <>
                <div className="mb-3">
                  <input
                    type="text"
                    name="education"
                    value={formData.education}
                    onChange={handleChange}
                    className={`form-control ${errors.education ? "is-invalid" : ""}`}
                    placeholder="Current Level of Education"
                  />
                  <div className="invalid-feedback">{errors.education}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    name="howDidYouHearAboutUs"
                    value={formData.howDidYouHearAboutUs}
                    onChange={handleChange}
                    className={`form-control ${errors.howDidYouHearAboutUs ? "is-invalid" : ""}`}
                    placeholder="How Did You Hear About Us?"
                  />
                  <div className="invalid-feedback">{errors.howDidYouHearAboutUs}</div>
                </div>
                <div className="mb-3">
                  <input
                    type="file"
                    name="resume"
                    onChange={handleFileChange}
                    className={`form-control ${errors.resume ? "is-invalid" : ""}`}
                    accept=".pdf"
                  />
                  <div className="invalid-feedback">{errors.resume}</div>
                </div>
                <div className="mb-3">
                  <textarea
                    name="scholarshipReason"
                    value={formData.scholarshipReason}
                    onChange={handleChange}
                    className={`form-control ${errors.scholarshipReason ? "is-invalid" : ""}`}
                    rows="3"
                    placeholder="Why Do You Need This Scholarship?"
                  ></textarea>
                  <div className="invalid-feedback">{errors.scholarshipReason}</div>
                </div>
              </>
            )}

            <div className="d-flex justify-content-between">
              {step > 1 && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
              )}
              {step === 1 ? (
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-success"
                  disabled={isCreating || isUploading}
                >
                  {isCreating ? "Submitting..." : "Submit"}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Form1;

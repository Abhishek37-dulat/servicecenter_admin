import React, { useState } from "react";
import { useAddWebinarRequestMutation } from "../redux/services/hireWithUs";
import { toast } from "react-toastify";

const WebinarRequestForm = () => {
  const [addWebinar, { isLoading }] = useAddWebinarRequestMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    college: "",
    currentYear: "",
    course: "",
    reasonForRequest: "",
    webinarTopic: "",
    webinarDateTime: "",
    participantCount: "",
    contactPerson: "",
    howDidYouHear: "",
    agreeTerms: false,
    agreeCommunications: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast.error("You must agree to the Terms & Conditions to proceed.");
      return;
    }

    try {
      await addWebinar(formData).unwrap();
      toast.success("Webinar Request Submitted Successfully!");
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        college: "",
        currentYear: "",
        course: "",
        reasonForRequest: "",
        webinarTopic: "",
        webinarDateTime: "",
        participantCount: "",
        contactPerson: "",
        howDidYouHear: "",
        agreeTerms: false,
        agreeCommunications: false,
      });
    } catch (error) {
      toast.error(error?.data?.message || "Failed to submit webinar request. Please try again.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Webinar Request Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="fullName" className="form-label">Full Name</label>
          <input
            type="text"
            id="fullName"
            name="fullName"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="phone" className="form-label">Phone Number (Optional)</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            className="form-control"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="college" className="form-label">College/University Name</label>
          <input
            type="text"
            id="college"
            name="college"
            className="form-control"
            value={formData.college}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="currentYear" className="form-label">Current Year of Study</label>
          <input
            type="text"
            id="currentYear"
            name="currentYear"
            className="form-control"
            value={formData.currentYear}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="course" className="form-label">Course/Program of Study</label>
          <input
            type="text"
            id="course"
            name="course"
            className="form-control"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="reasonForRequest" className="form-label">Reason for Requesting Webinar</label>
          <textarea
            id="reasonForRequest"
            name="reasonForRequest"
            className="form-control"
            rows="3"
            value={formData.reasonForRequest}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="webinarTopic" className="form-label">Preferred Webinar Topic/Area</label>
          <input
            type="text"
            id="webinarTopic"
            name="webinarTopic"
            className="form-control"
            value={formData.webinarTopic}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="webinarDateTime" className="form-label">Preferred Webinar Date/Time</label>
          <input
            type="datetime-local"
            id="webinarDateTime"
            name="webinarDateTime"
            className="form-control"
            value={formData.webinarDateTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="participantCount" className="form-label">Estimated Number of Participants</label>
          <input
            type="number"
            id="participantCount"
            name="participantCount"
            className="form-control"
            value={formData.participantCount}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="contactPerson" className="form-label">College/University Contact Person (If applicable)</label>
          <input
            type="text"
            id="contactPerson"
            name="contactPerson"
            className="form-control"
            value={formData.contactPerson}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="howDidYouHear" className="form-label">How Did You Hear About Us?</label>
          <input
            type="text"
            id="howDidYouHear"
            name="howDidYouHear"
            className="form-control"
            value={formData.howDidYouHear}
            onChange={handleChange}
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="agreeTerms"
            name="agreeTerms"
            className="form-check-input"
            checked={formData.agreeTerms}
            onChange={handleChange}
            required
          />
          <label htmlFor="agreeTerms" className="form-check-label">
            I agree to the Terms & Conditions of this webinar request and understand the terms outlined for participation.
          </label>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            id="agreeCommunications"
            name="agreeCommunications"
            className="form-check-input"
            checked={formData.agreeCommunications}
            onChange={handleChange}
          />
          <label htmlFor="agreeCommunications" className="form-check-label">
            I agree to receive communications regarding the webinar and future updates.
          </label>
        </div>

        <button type="submit" className="btn btn-primary" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit Webinar Request"}
        </button>
      </form>
    </div>
  );
};

export default WebinarRequestForm;

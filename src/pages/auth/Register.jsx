import React, { useState } from "react";
import { useGoogleAuthCallbackMutation, useRegisterUserMutation } from "../../redux/services/authApi";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [registerUser] = useRegisterUserMutation();
  const [googleAuthCallback] = useGoogleAuthCallbackMutation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [id]: "",
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, phone, password, confirmPassword } = formData;
    const newErrors = {};

    if (!firstName.trim()) newErrors.firstName = "First name is required";
    if (!lastName.trim()) newErrors.lastName = "Last name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    if (!phone.trim()) newErrors.phone = "Phone number is required";
    else if (!/^\d{10}$/.test(phone)) newErrors.phone = "Phone number must be 10 digits";
    if (!password.trim()) newErrors.password = "Password is required";
    if (password !== confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await registerUser({
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      }).unwrap();

      toast.success("Registration successful!");
      console.log("Registration Response:", response);

      // Save the token and redirect to dashboard
      localStorage.setItem("authToken", response.token);
      navigate("/student/dashboard");

      // Reset form data
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      toast.error(error?.data?.error+" please login" || "Registration failed!");
      console.error("Registration Error:", error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;
      const response = await googleAuthCallback({ tokenId }).unwrap();

      toast.success("Google Registration successful!");
      console.log("Google Registration Response:", response);

      // Save the token and redirect to dashboard
      localStorage.setItem("authToken", response.token);
      navigate("/student/dashboard");
    } catch (error) {
      toast.error(error?.data?.message || "Google Registration failed!");
      console.error("Google Registration Error:", error);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Authentication failed!");
  };

  return (
    // <GoogleOAuthProvider clientId="820235427210-mo2p06hvtu8gaimp2hsdm7ht2b1fq86c.apps.googleusercontent.com">
      <main className="main-area fix">
        <section className="singUp-area section-py-120" style={{ backgroundImage: "url(/images/b1.png)", backgroundRepeat: 'no-repeat', backgroundSize: 'cover' }}>
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="singUp-wrap">
                  <h2 className="title">Create Your Account</h2>
                  <p>Ready to join? Fill in the details below or sign up using Google.</p>
                  <div className="account__social mb-3">
                    <div       className="text-center border p-3 rounded "              onClick={()=>window.location.href="https://lmslegacy.onrender.com/api/auth/google"}
 >
  Sign Up with Google 
 </div>
                  </div>
                  <div className="account__divider">
                    <span>or</span>
                  </div>
                  <form className="account__form" onSubmit={handleFormSubmit}>
                    <div className="form-grp">
                      <label htmlFor="firstName">First Name</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="First Name"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                      {errors.firstName && <span className="error-text">{errors.firstName}</span>}
                    </div>
                    <div className="form-grp">
                      <label htmlFor="lastName">Last Name</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Last Name"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                      {errors.lastName && <span className="error-text">{errors.lastName}</span>}
                    </div>
                    <div className="form-grp">
                      <label htmlFor="email">Email</label>
                      <input
                        type="email"
                        id="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
                    </div>
                    <div className="form-grp">
                      <label htmlFor="phone">Phone</label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="Phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                      />
                      {errors.phone && <span className="error-text">{errors.phone}</span>}
                    </div>
                    <div className="form-grp">
                      <label htmlFor="password">Password</label>
                      <input
                        type="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                      {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <div className="form-grp">
                      <label htmlFor="confirmPassword">Confirm Password</label>
                      <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                      />
                      {errors.confirmPassword && <span className="error-text">{errors.confirmPassword}</span>}
                    </div>
                    <button type="submit" className="btn btn-primary">Sign Up</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    // </GoogleOAuthProvider>
  );
}

export default Register;

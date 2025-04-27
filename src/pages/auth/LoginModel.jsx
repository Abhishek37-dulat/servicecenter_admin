import React, { useState } from "react";
import { useLoginUserMutation } from "../../redux/services/authApi";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setStudent } from "../../redux/slices/studentSlice";

export default function Login({ close }) {
  const [loginUser] = useLoginUserMutation();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

  const dispatch = useDispatch();

  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};

    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await loginUser(formData).unwrap();

      toast.success("Login successful!");

      if (response) {
        dispatch(setStudent(response.data));
        localStorage.setItem("authToken", response.token);
        close();
      }
      console.log("Login Response:", response);
    } catch (error) {
      toast.error(error?.data?.message || "Login failed!");
      console.error("Login Error:", error);
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const tokenId = credentialResponse.credential;
      toast.success("Google Login successful!");
      console.log("Google Login Response:", tokenId);
    } catch (error) {
      toast.error("Google Login failed!");
      console.error("Google Login Error:", error);
    }
  };

  const handleGoogleError = () => {
    toast.error("Google Authentication failed!");
  };

  return (
    <GoogleOAuthProvider clientId="820235427210-mo2p06hvtu8gaimp2hsdm7ht2b1fq86c.apps.googleusercontent.com">
      <main className="main-area fix">
        <section className="singUp-area pt-3">
          <div className="container">
            <div className="row justify-content-center">
              <div className="singUp-wrap">
                <div className="account__social">
                  <GoogleLogin
                                        onClick={()=>window.location.href="https://lmslegacy.onrender.com/api/auth/google"}

                  />
                </div>
                <div className="account__divider">
                  <span>or</span>
                </div>
                <form className="account__form" onSubmit={handleFormSubmit}>
                  <div className="form-grp">
                    <label  htmlFor="email" >Email</label>
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                    {errors.email && (
                      <span className="error-text">{errors.email}</span>
                    )}
                  </div>
                  <div className="form-grp">
                    <label htmlFor="password">Password</label>
                    <input
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                    {errors.password && (
                      <span className="error-text">{errors.password}</span>
                    )}
                  </div>
                  <div className="account__check">
                    <div className="account__check-remember">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        id="terms-check"
                      />
                      <label htmlFor="terms-check" className="form-check-label">
                        Remember me
                      </label>
                    </div>
                    <div className="account__check-forgot">
                      <a href="forgot-password.html">Forgot Password?</a>
                    </div>
                  </div>
                  <button type="submit" className="btn  btn-primary">
                    Sign In
                  </button>
                </form>
                <div className="account__switch">
                  <p>
                    Don't have an account? <a href="/register">Sign Up</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </GoogleOAuthProvider>
  );
}

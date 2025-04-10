import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../redux/services/authApi";
import { useDispatch } from "react-redux";
import { setStudent } from "../../redux/slices/studentSlice";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loginUser] = useLoginUserMutation();
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [id]: value }));
    setErrors((prevErrors) => ({ ...prevErrors, [id]: "" }));
  };
  const dispatch=useDispatch()
  const validateForm = () => {
    const { email, password } = formData;
    const newErrors = {};
    if (!email) newErrors.email = "Email is required";
    if (!password) newErrors.password = "Password is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handlePaymentTest = async () => {
    try {
      const response = await axios.post("https://lmslegacy.onrender.com/api/v1/pay", {
        user_id: "12345",
        price: 1, // Rs. 1 for testing
        phone: "9999999999",
        name: "Test User",
      });
console.log(response)
      if (response.data.success && response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl; // Redirect user to PhonePe
      } else {
        toast.error(response.data.message || "Failed to initiate payment.");
      }
    } catch (error) {
      console.error("Payment initiation error:", error.response || error.message);
      toast.error("Failed to initiate payment.");
    }
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await loginUser(formData).unwrap();
      
   
      toast.success("Login successful!");

if(response){
    dispatch(setStudent(response.data))
  localStorage.setItem("authToken",response.token)
  window.location.href='/student/profile'
 close()
}
      console.log("Login Response:", response);

    } catch (error) {
      toast.error(error?.data?.message || "Login failed!");
      console.error("Login Error:", error);
    }
  };

  return (
    // <GoogleOAuthProvider clientId="820235427210-mo2p06hvtu8gaimp2hsdm7ht2b1fq86c.apps.googleusercontent.com">
      <main className="main-area fix" style={{ backgroundImage: "url(/images/b1.png)", backgroundRepeat: "no-repeat", backgroundSize: "cover" }}>
        <section className="singUp-area section-py-120">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-6 col-lg-8">
                <div className="singUp-wrap">
                  <h2 className="title">Welcome back!</h2>
                  <p>Enter your email and password below to log in. Or use Google login for quick access!</p>
                  <div className="account__social">
                  <div       className="text-center border p-3 rounded "              onClick={()=>window.location.href="https://lmslegacy.onrender.com/api/auth/google"}
 >
  Sign Up with Google 
 </div>
                  </div>
                  <div className="account__divider"><span>or</span></div>
                  <form className="account__form" onSubmit={(e) => e.preventDefault()}>
                    <div className="form-grp">
                      <label htmlFor="email">Email</label>
                      <input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                      {errors.email && <span className="error-text">{errors.email}</span>}
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
                      {errors.password && <span className="error-text">{errors.password}</span>}
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleFormSubmit}>
                      Sign In
                    </button>
                  </form>
                  <div className="account__switch">
                    <p>Don't have an account? <a href="/register">Sign Up</a></p>
                  </div>
                  {/* <button onClick={handlePaymentTest} className="btn btn-secondary mt-3">
                    Test Payment
                  </button> */}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    // </GoogleOAuthProvider>
  );
}

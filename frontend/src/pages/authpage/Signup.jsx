import React, { useState } from "react";
import {Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import axios from "axios";
const Signup = () => {
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [loadingOtp, setLoadingOtp] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPass, setShowPass] = useState(false);
  const [showCPass, setShowCPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const validateField = (name, value) => {
    let error = "";
    if (name === "name") {
      if (!value.trim()) error = "Full Name is required";
      else if (value.trim().length < 3)
        error = "Name must be at least 3 characters";
    }
    if (name === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value))
        error = "Invalid email format";
    }
    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(value))
        error = "8+ chars with upper, lower & number";
    }
    if (name === "cpassword") {
      if (value !== form.password)
        error = "Passwords do not match";
    }
    setErrors((prev) => ({ ...prev, [name]: error }));
  };
  const verifySignupOtp = async () => {
  if (!otp.trim()) return toast.error("Enter OTP");
  try {
    setLoadingOtp(true);
    const res = await axios.post(
      "http://localhost:3000/sign-up/verify-signup-otp",
      {
        email: form.email,
        otp,
      }
    );
    toast.success(res.data.message);
    setShowOtpModal(false);
    navigate("/login");
  } catch (err) {
    toast.error(err.response?.data?.message || "OTP failed");
  } finally {
    setLoadingOtp(false);
  }
};
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (touched[name]) {
      validateField(name, value);
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({
    ...prev,
    [name]: true
  }));
  if (value.trim() !== "") {
    validateField(name, value);
  }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    let hasError = false;
    Object.keys(form).forEach((key) => {
      validateField(key, form[key]);
      if (!form[key]) hasError = true;
    });
    if (hasError) {
      setLoading(false);
      return;
    }
    try {
      const res = await axios.post(
        "http://localhost:3000/sign-up", 
        {
          name: form.name,
          email: form.email,
          password: form.password,
        }
      );
      toast.success(res.data.message);
      setShowOtpModal(true);
    } catch (err) {
      toast.error(err.response?.data?.message || "Signup failed");
    }
  };
  return (<>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-xl shadow-lg w-120"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Create Account
        </h2>
        <div className="mb-4">
          <label id="signupl">Full Name</label>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg text-lg"
          />
          <p className="text-red-500 text-sm">{errors.name}</p>
        </div>
        <div className="mb-4">
          <label id="signupl">Email</label>
          <input
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg text-lg"
          />
          <p className="text-red-500 text-sm">{errors.email}</p>
        </div>
        <div className="mb-4 relative">
          <label id="signupl">Password</label>
          <input
            type={showPass ? "text" : "password"}
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg text-lg"
          />
          <button
            type="button"
            onClick={() => setShowPass(!showPass)}
            className="absolute right-3 top-9"
          >
            {showPass ? "👁️" : "🙈"}
          </button>
          <p className="text-red-500 text-sm">{errors.password}</p>
        </div>
        <div className="mb-4 relative">
          <label id="signupl">Confirm Password</label>
          <input
            type={showCPass ? "text" : "password"}
            name="cpassword"
            placeholder="Confirm Password"
            value={form.cpassword}
            onChange={handleChange}
            onBlur={handleBlur}
            className="w-full p-3 border rounded-lg text-lg"
          />
          <button
            type="button"
            onClick={() => setShowCPass(!showCPass)}
            className="absolute right-3 top-9"
          >
            {showCPass ? "👁️" : "🙈"}
          </button>
          <p className="text-red-500 text-sm">{errors.cpassword}</p>
        </div>
        <button
  type="submit"
  disabled={loading}
  className={`w-full p-3 mb-5 rounded-lg text-lg font-semibold text-white 
  ${loading 
    ? "bg-gray-400 cursor-not-allowed" 
    : "bg-blue-500 hover:bg-blue-600"
  }`}
>
  {loading ? "Creating User..." : "Sign Up"}
</button>
<div className="flex justify-center gap-5">
<p>Already have an account.</p>
<Link className="loginlink  text-blue-700" to="/login"> Sign in.</Link>
      </div>
      </form>
      {showOtpModal && (
  <div className="fixed inset-0 flex items-center justify-center bg-black/20  z-50">
    
    <div className="bg-white p-8 rounded-xl shadow-lg w-96 relative">
      
      <h2 className="text-xl font-semibold text-center mb-4">
        Verify OTP
      </h2>

      <p className="text-sm text-gray-500 text-center mb-4">
        OTP sent to <span className="font-medium">{form.email}</span>
      </p>

      <input
        type="text"
        placeholder="Enter 6-digit OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        onClick={verifySignupOtp}
        disabled={loadingOtp}
        className={`w-full p-3 rounded-lg text-white font-semibold
          ${loadingOtp ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"}
        `}
      >
        {loadingOtp ? "Geting verified..." : "Verify Otp"}
      </button>

      <button
        onClick={() => setShowOtpModal(false)}
        className="absolute top-3 right-3 text-gray-500"
      >
        ✕
      </button> 
    </div>
  </div>
)}
    </div>
  </>
  );
};

export default Signup;




// import React, { useState } from "react";
// import SignupForm from "../../components/Signup page/SignupForm";
// import SignupOtpModal from "../../components/Signup page/SignupOtpModal";

// const Signup = () => {
//   const [showOtpModal, setShowOtpModal] = useState(false);
//   const [emailForOtp, setEmailForOtp] = useState("");

//   return (
//     <div className="flex justify-center items-center min-h-screen bg-gray-100">

//       <SignupForm
//         onOtpSent={(email) => {
//           setEmailForOtp(email);
//           setShowOtpModal(true);
//         }}
//       />

//       <SignupOtpModal
//         show={showOtpModal}
//         email={emailForOtp}
//         onClose={() => setShowOtpModal(false)}
//       />

//     </div>
//   );
// };

// export default Signup;

import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const VerifyOtp = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const verifyOtp = async () => {
    if (!otp.trim()) return toast.error("Please enter OTP");

    setLoading(true);

    try {
      const res = await axios.post(
        "http://localhost:3000/sign-up/verify-signup-otp",
        {
          email: state.email,
          otp: otp,
        }
      );

      toast.success(res.data.message);
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "OTP failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-8 w-96">
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-700">
          Verify OTP
        </h2>
        <p className="text-sm text-gray-500 mb-6 text-center">
          OTP sent to <span className="font-semibold">{state?.email}</span>
        </p>
        <input
          type="text"
          placeholder="Enter 6-digit OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="w-full border border-gray-300 rounded-lg p-3 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={verifyOtp}
          disabled={loading}
          className={`w-full p-3 rounded-lg text-white font-semibold transition duration-200
            ${loading 
              ? "bg-gray-400 cursor-not-allowed" 
              : "bg-blue-500 hover:bg-blue-600"
            }`}>
          {loading ? "Verifying..." : "Verify OTP"}
        </button>
      </div>
    </div>
  );
};
export default VerifyOtp;

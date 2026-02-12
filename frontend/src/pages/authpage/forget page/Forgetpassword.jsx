import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


const ForgetPassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const sendOtp = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);

      await axios.post("http://localhost:3000/login/forget-password", {
        email,
      });

      toast.success("OTP sent to email");
      setShowModal(true);

    } catch (err) {
    toast.error(err.response?.data?.message || "Error sending OTP");
    }
    finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    try {
      await axios.post("http://localhost:3000/login/verify-otp", {
        email,
        otp,
      });
      toast.success("OTP verified");
      setShowModal(false);
      navigate("/login/reset-password", { state: { email } });
    }catch (err) {
    toast.error(err.response?.data?.message || "Invalid OTP");
  }
  };
  return (
    <div className="flex justify-center items-center min-h-screen">
      <form
  onSubmit={sendOtp}
  className="w-96 p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
>
  <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">
    Forgot Password
  </h2>
  <div className="mb-5">
    <label className="block text-sm font-medium text-gray-600 mb-2">
      Email Address
    </label>
    <input
      type="email"
      placeholder="Enter your email"
      className="w-full px-4 py-3 rounded-lg border border-gray-300
                focus:outline-none focus:ring-2 focus:ring-blue-400
              focus:border-blue-400 transition duration-200"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
    />
  </div>
  <button
    disabled={loading}
    className={`w-full py-3 rounded-lg font-semibold text-white transition duration-200
      ${
        loading
          ? "bg-gray-400 cursor-not-allowed"
          : "bg-blue-500 hover:bg-blue-600 active:scale-95"
      }`}
  >
    {loading ? "Sending..." : "Send OTP"}
  </button>
</form>

      {showModal && (
  <div className="fixed inset-0 flex justify-center items-center 
                  bg-black/30 backdrop-blur-sm z-50">
    <div className="relative w-96 p-8 rounded-2xl 
                    bg-white/10 backdrop-blur-lg 
                    border border-white/20 
                    shadow-2xl text-white">
      {/* Back Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 left-4 text-white hover:text-gray-300"
      >
        ← Back
      </button>
      <h3 className="text-2xl font-semibold text-center mb-6">
        Enter OTP
      </h3>
      <input
        type="text"
        placeholder="Enter OTP"
        className="w-full p-3 rounded-lg 
                  bg-white/20 text-white 
                  placeholder-white/70 
                  border border-white/30 
                  focus:outline-none focus:ring-2 focus:ring-white/50 mb-4"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button
        onClick={verifyOtp}
        className="w-full py-3 rounded-lg bg-green-400 
                  hover:scale-105 transition-transform duration-200 
                  font-semibold"
      >
        Verify OTP
      </button>
    </div>
  </div>
)}
    </div>
  );
};

export default ForgetPassword;

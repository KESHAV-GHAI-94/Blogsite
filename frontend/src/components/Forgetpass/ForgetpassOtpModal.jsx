import React from "react";
const ForgetpassOtpModal = ({ otp, setOtp, setShowModal, verifyOtp }) => {
  return (
    <div>
      <div
        className="fixed inset-0 flex justify-center items-center 
                  bg-black/30 backdrop-blur-sm z-50"
      >
        <div
          className="relative w-96 p-8 rounded-2xl 
                    bg-white/10 backdrop-blur-lg 
                    border border-white/20 
                    shadow-2xl text-white"
        >
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 left-4 text-white hover:text-gray-300"
          >
            ← Back
          </button>
          <h3 className="text-2xl font-semibold text-center mb-6">Enter OTP</h3>
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
    </div>
  );
};

export default ForgetpassOtpModal;

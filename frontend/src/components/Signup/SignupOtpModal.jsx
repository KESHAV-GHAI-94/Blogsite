import React from "react";
const SignupOtpModal = ({
  setOtp,
  loadingOtp,
  verifySignupOtp,
  form,
  setShowOtpModal,
  otp,
}) => {
  return (
    <div>
      <div className="fixed inset-0 flex items-center justify-center bg-black/20  z-50">
        <div className="bg-white p-8 rounded-xl shadow-lg w-96 relative">
          <h2 className="text-xl font-semibold text-center mb-4">Verify OTP</h2>
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
    </div>
  );
};

export default SignupOtpModal;

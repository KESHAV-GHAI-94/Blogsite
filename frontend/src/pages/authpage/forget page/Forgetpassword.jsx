import { ForgetpassHandler } from "../../../hooks/Auth/Forgetpass/ForgetpassHandler";
import OtpModal from "../../../components/Modals/OtpModal";

const ForgetPassword = () => {
  const {
    email,
    setEmail,
    otp,
    setOtp,
    showModal,
    setShowModal,
    loading,
    sendOtp,
    verifyOtp,
  } = ForgetpassHandler();

  return (
    <div className="flex justify-center items-center min-h-screen">

      <form
        onSubmit={sendOtp}
        className="w-full max-w-[400px] p-6 sm:p-8 bg-white rounded-2xl shadow-xl border border-gray-100"
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
            className="
              w-full px-4 py-3 rounded-lg border border-gray-300
              focus:outline-none focus:ring-2 focus:ring-blue-400
            "
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold text-white transition
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600 active:scale-95"
            }
          `}
        >
          {loading ? "Sending..." : "Send OTP"}
        </button>
      </form>
      {showModal && (
        <OtpModal
          otp={otp}
          setOtp={setOtp}
          onVerify={verifyOtp}
          onClose={() => setShowModal(false)}
          loading={loading}
          email={email}
          title="Verify Reset OTP"
          buttonText="Verify OTP"
        />
      )}
    </div>
  );
};

export default ForgetPassword;

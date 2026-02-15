import { ForgetpassHandler } from "../../../hooks/AuthHook/Forgetpass/ForgetpassHandler";
import ForgetpassOtpModal from "../../../components/Forgetpass/ForgetpassOtpModal";
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
        <ForgetpassOtpModal
          otp={otp}
          setOtp={setOtp}
          setShowModal={setShowModal}
          verifyOtp={verifyOtp}
        />
      )}
    </div>
  );
};

export default ForgetPassword;

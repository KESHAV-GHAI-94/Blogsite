import React from "react";
import { SignupFormHandler } from "../../hooks/AuthHook/SignupFormHandler";
import { Link } from "react-router-dom";
import SignupOtpModal from "../../components/Signup/SignupOtpModal";
const Signup = () => {
  const {
    showOtpModal,
    setOtp,
    loadingOtp,
    errors,
    showPass,
    setShowPass,
    showCPass,
    setShowCPass,
    verifySignupOtp,
    handleChange,
    handleBlur,
    handleSubmit,
    form,
    setShowOtpModal,
    loading,
    otp,
  } = SignupFormHandler();

  return (
    <>
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
  ${
    loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
  }`}
          >
            {loading ? "Creating User..." : "Sign Up"}
          </button>
          <div className="flex justify-center gap-5">
            <p>Already have an account.</p>
            <Link className="loginlink  text-blue-700" to="/login">
              {" "}
              Sign in.
            </Link>
          </div>
        </form>
        {showOtpModal && (
          <SignupOtpModal
            otp={otp}
            setOtp={setOtp}
            loadingOtp={loadingOtp}
            verifySignupOtp={verifySignupOtp}
            form={form}
            setShowOtpModal={setShowOtpModal}
          />
        )}
      </div>
    </>
  );
};

export default Signup;

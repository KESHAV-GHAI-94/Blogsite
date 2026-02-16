import React from "react";
import { LoginHandler } from "../../hooks/Auth/LoginHandler";
import { Link } from "react-router-dom";
const Login = () => {
  const {
    errors,
    showPass,
    setShowPass,
    handleChange,
    handleBlur,
    handleSubmit,
    form,
    touched,
    loading,
  } = LoginHandler();
  return (
    <>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md"
        >
          <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
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
            {touched.email && errors.email && (
              <p className="text-red-500 text-sm">{errors.email}</p>
            )}
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
            {touched.password && errors.password && (
              <p className="text-red-500 text-sm">{errors.password}</p>
            )}
          </div>
          <button
            type="submit"
            disabled={loading}
            className={`w-full p-3 mb-5 rounded-lg text-lg font-semibold text-white 
            ${
              loading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
          <div className="flex flex-col items-center gap-3 mt-4">
            <div className="flex gap-2">
              <p>Not Having an account?</p>
              <Link className="text-blue-700" to="/sign-up">
                Sign up
              </Link>
            </div>
            <Link
              className="text-blue-600 hover:underline"
              to="/login/forget-password"
            >
              Forgot Password?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};
export default Login;

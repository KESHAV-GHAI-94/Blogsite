import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});


  useEffect(() => {
    if (!email) {
      navigate("/login");
    }
  }, [email, navigate]);
  const validate = () => {
    let newErrors = {};
    if (!password) {
      newErrors.password = "Password is required";
    } else if (password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleReset = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    try {
      await axios.post("http://localhost:3000/login/reset-password", {
        email,
        newPassword:password,
      });
      toast.success("Password updated successfully");
      navigate("/login");
    } catch (err) {
      toast.error(err.response?.data?.message || "Error resetting password");
    }
  };
  const handleBlur = (e) => {
  const { name, value } = e.target;
  setTouched((prev) => ({
    ...prev,
    [name]: true,
  }));
  if (!value.trim()) return;
  let error = "";
  if (name === "password") {
    if (!value) {
      error = "Password is required";
    } else if (value.length < 6) {
      error = "Password must be at least 6 characters";
    }
  }
  if (name === "confirmPassword") {
    if (!value) {
      error = "Confirm password is required";
    } else if (value !== password) {
      error = "Passwords do not match";
    }
  }
  setErrors((prev) => ({
    ...prev,
    [name]: error,
  }));
};

return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
    <form
        onSubmit={handleReset}
        className="p-8 bg-white shadow-xl rounded-xl w-96">
        <h2 className="text-2xl font-semibold mb-2 text-center">
        Reset Password
        </h2>
        <p className="text-center text-sm text-gray-600 mb-6">
        Resetting password for: 
        <span className="font-medium text-black"> {email}</span>
        </p>
        <input
        type="password"
        name="password"
        placeholder="Enter new password"
        className="border p-3 w-full mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        onBlur={handleBlur}
        />
        {touched.password && errors.password && (
        <p className="text-red-500 text-sm mb-2">{errors.password}</p>
        )}
        <input
        type="password"
        name="confirmPassword"
        placeholder="Confirm new password"
        className="border p-3 w-full mb-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
        value={confirmPassword}
        onChange={(e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        let error = "";
        if (value && value !== password) {
            error = "Passwords do not match";
        }
        setErrors((prev) => ({
            ...prev,
            confirmPassword: error,
        }));
        }}
        onBlur={handleBlur}
        />
        {touched.confirmPassword && errors.confirmPassword && (
        <p className="text-red-500 text-sm mb-4">
            {errors.confirmPassword}
        </p>
        )}
        <button
        className="bg-green-500 hover:bg-green-600 transition text-white px-4 py-3 w-full rounded-lg font-semibold"
        >
        Update Password
        </button>
    </form>
    </div>
);
};

export default ResetPassword;

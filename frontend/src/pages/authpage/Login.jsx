import React, { useState } from "react";
import {Link,useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [errors, setErrors] = useState({});
    const [touched, setTouched] = useState({});
    const [showPass, setShowPass] = useState(false);
    const [loading, setLoading] = useState(false);
        const validateField = (name, value) => {
    let error = "";
    if (name === "email") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!value) {
        error = "Email is required";
        } else if (!emailRegex.test(value)) {
        error = "Invalid email format";
        }
    }
    if (name === "password") {
        if (!value) {
        error = "Password is required";
        } else if (value.length < 6) {
        error = "Password must be at least 6 characters";
        }
    }
    setErrors((prev) => ({
        ...prev,
        [name]: error,
    }));
    return error;
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
    let newErrors = {};
    Object.keys(form).forEach((key) => {
        const error = validateField(key, form[key]);
        if (error) newErrors[key] = error;
    });
    if (Object.keys(newErrors).length > 0) return;
    try{
        setLoading(true);
        const res = await axios.post(
        "http://localhost:3000/login", 
        {
            email: form.email,
            password: form.password,
        },
        {
            withCredentials:true
        }
    );
    toast.success(res.data.message);
    navigate("/posts"   , { state: { email: form.email } });
    window.location.reload();
}
    catch (err) {
    toast.error(err.response?.data?.message || "login failed");
    }
    finally{
        setLoading(false);
    }
}
return(
    <>
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <form
            onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-lg w-[25%]">
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
            ${loading 
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
            <Link className="text-blue-600 hover:underline" to="/login/forget-password">Forgot Password?</Link>
            </div>
        </form>
    </div>
    </>
)
}
export default Login;
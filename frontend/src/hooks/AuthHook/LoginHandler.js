import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
export function LoginHandler() {
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
      if (!value) error = "Email is required";
      else if (!emailRegex.test(value)) error = "Invalid email format";
    }
    if (name === "password") {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
      if (!passwordRegex.test(value))
        error = "8+ chars with upper, lower & number";
    }
    return error;
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({
      ...prev,
      [name]: true,
    }));
    const error = validateField(name, value);
    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    let newErrors = {};
    Object.keys(form).forEach((key) => {
      const error = validateField(key, form[key]);
      if (error) newErrors[key] = error;
    });
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;
    try {
      setLoading(true);
      const res = await axios.post(
        "http://localhost:3000/login",
        {
          email: form.email,
          password: form.password,
        },
        {
          withCredentials: true,
        },
      );
      toast.success(res.data.message);
      navigate("/posts", { state: { email: form.email } });
      window.location.reload();
    } catch (err) {
      toast.error(err.response?.data?.message || "login failed");
    } finally {
      setLoading(false);
    }
  };
  return {
    errors,
    showPass,
    setShowPass,
    handleChange,
    handleBlur,
    handleSubmit,
    form,
    touched,
    loading,
  };
}

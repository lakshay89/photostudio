"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./auth.css";
import Image from "next/image";
import pic1 from '@/app/Assets/Images/login.webp'

export default function Signup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required!");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const userExists = users.find((user) => user.email === email);
    if (userExists) {
      setError("Email already registered!");
      return;
    }

    users.push({ name, email, password });
    localStorage.setItem("users", JSON.stringify(users));

    alert("Signup successful! Please login.");
    router.push("/login");
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Form Section */}
        <div className="signup-form-section">
          <div className="form-box">
            <h1 className="text-center">Sign Up</h1>
            <p className="subtitle text-center">Create your account and join us today!</p>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="auth-input"
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="auth-input"
              />

              <button type="submit" className="signup-btn">Sign Up Now</button>
            </form>

            <p className="signup-link">
              Already have an account?{" "}
              <span onClick={() => router.push("/login")}>Login</span>
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="signup-image-section">
          <div className="image-box">
            <Image src={pic1} alt="Signup" height={500} width={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

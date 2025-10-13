"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "../signup/auth.css";
import pic1 from '@/app/Assets/Images/login.webp'
import Image from "next/image";

export default function Login() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = formData;

    if (!email || !password) {
      setError("Both fields are required!");
      return;
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      setError("Invalid email or password!");
      return;
    }

    localStorage.setItem("currentUser", JSON.stringify(user));
    alert("Login successful!");
    router.push("/dashboard"); // Redirect after login
  };

  return (
    <div className="signup-page">
      <div className="signup-container">
        {/* Left Form Section */}
        <div className="signup-form-section">
          <div className="form-box">
            <h1>Login</h1>
            <p className="subtitle">Welcome back! Please login to your account.</p>

            {error && <p className="error">{error}</p>}

            <form onSubmit={handleSubmit}>
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

              <button type="submit" className="signup-btn">Login Now</button>
            </form>

            <p className="signup-link">
              Do not have an account?{" "}
              <span onClick={() => router.push("/signup")}>Sign Up</span>
            </p>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="signup-image-section">
          <div className="image-box">
            <Image src={pic1} alt="Login"  height={500} width={300} />
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";
import React from "react";
import { FaCartShopping } from "react-icons/fa6";
import "./navbar.css";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg custom-navbar">
      <div className="container d-flex justify-content-between align-items-center">
        {/* Left: Logo */}
        <a className="navbar-brand fw-bold logo" href="/">
          Studio
        </a>

        {/* Center: Nav Links */}
        <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul className="navbar-nav gap-4">
            <li className="nav-item">
              <a className="nav-link active" href="/">
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/products">
                Products
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/about-us">
                About
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="/contact-us">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Cart + Login */}
        <div className="d-flex align-items-center gap-3">
        <Link href="/addtocart">  <FaCartShopping className="fs-4 cart-icon" /></Link>
          <Link href="/login"><button className="loginBtn">Login</button></Link>
        </div>

        {/* Toggler (Mobile) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
      </div>
    </nav>
  );
}

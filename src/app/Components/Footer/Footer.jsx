// components/Footer.js
import React from 'react';
import { FaFacebookF, FaTwitter, FaWhatsapp, FaPinterestP } from 'react-icons/fa';
import './footer.css'

const Footer = () => {
  return (
    <footer className="footer-section py-5 mt-5">
      <div className="container">
        <div className="row text-white footerRow">
          {/* Logo and Description */}
          <div className="col-md-4 mb-4">
            <h2 className="footer-logo">𝕏tyle</h2>
            <p>
              Subscribe Easy Tutorials Youtube channel to watch more videos on website development
              and Press the bell icon to get immediate notification of latest videos.
            </p>
          </div>

          {/* Office Details */}
          <div className="col-md-3 mb-4">
            <h5 className="footer-heading">Office</h5>
            <p>ITR Road<br />Whitefield, Bangalore<br />Karnataka, PIN 560066, India</p>
            <p>Email: <a href="mailto:aviorshm@outlook.com">aviorshm@outlook.com</a></p>
            <p>Phone: +91-0123466789</p>
          </div>

          {/* Links */}
          <div className="col-md-2 mb-4">
            <h5 className="footer-heading">Links</h5>
            <ul className="list-unstyled">
              <li><a href="#">Home</a></li>
              <li><a href="#">Services</a></li>
              <li><a href="#">About Us</a></li>
              <li><a href="#">Features</a></li>
              <li><a href="#">Contact</a></li>
            </ul>
          </div>

          {/* Newsletter & Social */}
          <div className="col-md-3">
            <h5 className="footer-heading">Newsletter</h5>
            <div className="newsletter-form d-flex mb-3">
              <input type="email" placeholder="Enter your email id" className="form-control me-2" />
              <button className="btn btn-light">→</button>
            </div>
            <div className="social-icons">
              <a href="#"><FaFacebookF /></a>
              <a href="#"><FaTwitter /></a>
              <a href="#"><FaWhatsapp /></a>
              <a href="#"><FaPinterestP /></a>
            </div>
          </div>
        </div>

        <hr className="text-white mt-4" />
        <p className="text-center text-white m-0">Easy Tutorials © 2021 - All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default Footer;

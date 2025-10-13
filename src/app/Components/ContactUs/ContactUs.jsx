"use client";
import React from "react";
import "./contactus.css";

export default function ContactUs() {
  return (
    <section className="contact-section py-5">
      <div className="container">
       

        <div className="row align-items-start">
          {/* LEFT INFO */}

          <div className="col-lg-6 col-md-12 mb-4">
            <div className="contact-info">
                <div className="my-5">
                <h2 className="contact-title mb-3">Get in touch with us</h2>
        <p className="contact-subtext ">
          Thanks for stopping by! Whether you have a question, comment, or just
          want to say hi, dont be a stranger. We re here to help, and we love
          connecting with our community. Drop us a line or use the contact form
          below to get in touch.
        </p>
                </div>
                  <div className=" container my-4 d-flex gap-3">
                  <div className="info-item mb-4">
                <h6>Call us</h6>
                <p>toll-free call</p>
                <a href="tel:7827433992">7827433992</a>
              </div>

              <div className="info-item mb-4">
                <h6>Visit us</h6>
                <p>
                  Come say hello at our office <br />
                  6000 J Center 1520, Sacramento, 
                  CA 95819, United States
                </p>
              </div>
              <div className="info-item">
                <h6>Hours</h6>
                <p>Monday–Friday 9am–5pm</p>
              </div>

             
                  </div>
                 
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="col-lg-6 col-md-12">
            <div className="contact-form p-4">
              <div className="formSection">
              <form>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Name*"
                    />
                  </div>
                  <div className="col-md-6 mb-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Last name*"
                    />
                  </div>
                </div>

                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email*"
                  />
                </div>

                <div className="mb-4">
                  <textarea
                    className="form-control"
                    rows="4"
                    placeholder="Your message*"
                  ></textarea>
                </div>

                <button type="submit" className="btn send-btn w-100">
                  Send message
                </button>
              </form>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="row mt-5">
          <div className="col-md-6 contactColSec mb-4">
            <div className="download-box p-4">
              <h5 className="">Unlock Efficiency: <br />
                Download Survey</h5>
              <p className="mb-3">
                Get our survey to learn how companies increased their efficiency
                with Calmerry
              </p>
              <button className="btn download-btn">Download</button>
            </div>
            <div className="download-box p-4">
              <h5 className="">Unlock Efficiency: <br />
                Download Survey</h5>
              <p className="mb-3">
                Get our survey to learn how companies increased their efficiency
                with Calmerry
              </p>
              <button className="btn download-btn">Download</button>
            </div>
          </div>

          <div className="col-md-6">
            <div className="footer-box p-4">
              <h5 className="fw-bold mb-3">Calmerry</h5>
              <p className="mb-1">1 (844) 740-2144 | toll-free</p>
              <p className="mb-3">team@calmerry.com</p>
{/* 
              <div className="social-icons mb-3">
                <i className="bi bi-instagram"></i>
                <i className="bi bi-facebook"></i>
                <i className="bi bi-twitter"></i>
                <i className="bi bi-linkedin"></i>
                <i className="bi bi-tiktok"></i>
              </div> */}

              <ul className="footer-links list-unstyled d-flex flex-wrap gap-3 mb-0">
                <li>About us</li>
                <li>Pricing</li>
                <li>Contacts</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>Privacy Policy</li>
              </ul>

              <p className="small mt-3 mb-0">
                If you are in a life-threatening situation, dont use this site.
                Call 1 (800) 273-8255 to get immediate help.
              </p>
            </div>
          </div>
        </div>

        <div className="my-4"> 
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3496.146975124509!2d77.02816907496313!3d28.80469367624279!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390da9a64c892eaf%3A0x8d9ce3b17efe4153!2sNaveen%20Dahiya%20shooting%20academy!5e0!3m2!1sen!2sin!4v1759676842591!5m2!1sen!2sin" width="1300" height="450" style={{border:"0"}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </div>
      </div>
    </section>
  );
}

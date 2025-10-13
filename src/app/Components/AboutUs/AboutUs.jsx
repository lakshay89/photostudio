"use client";
import React from "react";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import "./aboutus.css";
import { GiCheckMark } from "react-icons/gi";

import meeting from "@/app/Assets/Images/feature1.jpg"; // replace with your actual image

export default function AboutUs() {
  return (
   <>
   <div className="HeroSection">
    <div className="overlayTextSection">
    
        <div className="container">
          <h3 className="heroHeading"> About Us</h3>
          <p className="heroPara">OMGS® is a retail company that specializes in offering a diverse range of unique and captivating products with a “wow factor.” These items are designed to pique customers interest, stand out from the crowd, and create an unforgettable impression. By providing a constantly evolving inventory of innovative and eye-catching merchandise, OMGS ® aims to spark joy and excitement in every shopping experience.</p>

        </div>
    </div>
       
   </div>
   
   <div className="aboutus-page py-5">
      {/* Hero Section */}
      <section className="hero-section container py-3">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 text-section">
            <h1>
         
              Who we <span className="highlight">are</span>,
            </h1>
            <p className="mt-3">
              OMGS® is a retail company that specializes in offering a diverse range of unique and captivating products with a “wow factor.” These items are designed to pique customers interest, stand out from the crowd, and create an unforgettable impression. By providing a constantly evolving inventory of innovative and eye-catching merchandise, OMGS ® aims to spark joy and excitement in every shopping experience.


            </p>
            <div className="mt-4">
              <button className="btn btn-primary me-3">OUR COURSES</button>
              <button className="btn btn-outline-success">ABOUT US</button>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 mt-4 mt-lg-0 text-center">
            <Image
              src={meeting}
              alt="meeting"
              className="img-fluid hero-img rounded-3"
            />
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="companies-section text-center py-5">
        <p className="small-text">OUR TEAMS WORK WITH COMPANIES SUCH AS</p>
        <div className="d-flex justify-content-center flex-wrap gap-4 mt-3">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="company-logo">
              <i className="bi bi-building"></i> Company
            </div>
          ))}
        </div>
      </section>

      {/* About Academy Section */}
      <section className="about-academy container py-5">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-12 mb-4 mb-lg-0">
            <Image
              src={meeting}
              alt="academy"
              className="img-fluid rounded-3 shadow-sm"
            />
          </div>
          <div className="col-lg-6 col-md-12">
            <h3> FACTS WE ARE PROUD OF </h3>

            <div className="p-4">
              <ul className="list-group list-unstyled ">
                <li> <GiCheckMark className="fs-3 listcheck mb-3" />Completed 5 years of providing quality products to end customers..</li>
                <li> <GiCheckMark className="fs-3 listcheck mb-2" /> Delivered 3 million products since 2016.</li>
                <li> <GiCheckMark className="fs-3 listcheck mb-2" /> Providing premium product at best price.</li>
                <li> <GiCheckMark className="fs-3 listcheck mb-2" /> Completely secure and fast shopping experience.</li>
                <li> <GiCheckMark className="fs-3 listcheck mb-2" /> 24 × 7 customer support via Email, FB, Instagram and WhatsApp</li>
            
              </ul>
            </div>
            <button className="btn btn-primary mt-3">LEARN MORE</button>
          </div>
        </div>
      </section>
    </div>
   
   </>
  );
}

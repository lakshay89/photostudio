"use client";
import React from "react";
import Image from "next/image";
import "./testimonial.css"; // external CSS
import pic1 from '@/app/Assets/Images/testimonial1.jpg'
import pic2 from '@/app/Assets/Images/testimonial1.jpg'
import pic3 from '@/app/Assets/Images/testimonial1.jpg'

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    location: "New York, NY",
    rating: 5,
    text: "The quality is absolutely stunning! My family photo looks incredible on acrylic. The colors are so vibrant and the clarity is amazing. Highly recommend!",
    image: pic1,
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "San Francisco, CA",
    rating: 5,
    text: "Ordered multiple prints for my office. The process was seamless and the results exceeded my expectations. The acrylic gives such a modern, professional look.",
    image:pic2,
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    location: "Austin, TX",
    rating: 5,
    text: "Perfect for my home gallery wall! The customer service was excellent and shipping was fast. The acrylic print has become the centerpiece of my living room.",
    image: pic3,
  },
  {
    id: 4,
    name: "David Thompson",
    location: "Chicago, IL",
    rating: 5,
    text: "As a photographer, I'm very particular about print quality. These acrylic prints are museum-quality. The depth and richness of colors is unmatched.",
    image: pic1,
  },
];

export default function Testimonial() {
  return (
    <section className="testimonial-section py-5">
      <div className="container text-center">
        <h2 className="mb-3">What Our Customers Say</h2>
        <p className="mb-5">
          Join thousands of satisfied customers who have transformed their memories
          into beautiful acrylic art
        </p>

        <div className="row g-4">
          {testimonials.map((t) => (
            <div key={t.id} className="col-12 col-md-6 col-lg-3">
              <div className="testimonial-card p-4 h-100 shadow-sm">
                <div className="rating mb-2">
                  {"⭐".repeat(t.rating)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="d-flex align-items-center mt-3">
                  <Image
                    src={t.image}
                    alt={t.name}
                    width={50}
                    height={50}
                    className="rounded-circle"
                  />
                  <div className="ms-3 text-start">
                    <h6 className="mb-0">{t.name}</h6>
                    <small className="text-muted">{t.location}</small>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="row text-center mt-5 stats">
          <div className="col-6 col-md-3 mb-3">
            <h4>50,000+</h4>
            <p>Happy Customers</p>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h4>4.9/5</h4>
            <p>Average Rating</p>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h4>99.8%</h4>
            <p>Quality Guarantee</p>
          </div>
          <div className="col-6 col-md-3 mb-3">
            <h4>3-5</h4>
            <p>Days Delivery</p>
          </div>
        </div>
      </div>
    </section>
  );
}

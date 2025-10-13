'use client';

import React, { useState } from 'react';
import './checkout.css';
import Image from 'next/image';
import productImg from '@/app/Assets/Images/feature1.jpg';
import productImg1 from '@/app/Assets/Images/feature2.jpg';
import Swal from 'sweetalert2';
import { useRouter } from 'next/navigation';

     

export default function Checkout() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [coupon, setCoupon] = useState('');
  const [selectedPayment, setSelectedPayment] = useState('');
  const [giftWrap, setGiftWrap] = useState(false);
  const [billingSameAsShipping, setBillingSameAsShipping] = useState(true);
 
 

  const cartItems = [
    {
      id: 1,
      title: 'Kumkumadi Glow Serum',
      image: productImg,
      size: '30ml',
      qty: 1,
      price: 799
    },
    {
      id: 2,
      title: 'Herbal Face Wash',
      image: productImg1,
      size: '100ml',
      qty: 2,
      price: 299
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gst = 40;
  const wrapFee = giftWrap ? 49 : 0;
  const total = subtotal + gst + wrapFee;

  const steps = ['Cart', 'Address', 'Payment', 'Review'];

  const   handlePlaceOrder = (e) => {
    e.preventDefault();
    Swal.fire({
      title: 'Thank You!',
      text: 'Your order has been placed successfully.',
      icon: 'success',
      confirmButtonColor: '#08566e',
      confirmButtonText: 'Continue Shopping',
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/');
      }
    });
  };

  return (
    <div className="container py-5 checkout-page">
      {/* Step Navigation */}
      <ul className="nav nav-pills justify-content-center mb-5 step-tracker">
        {steps.map((label, index) => (
          <li className="nav-item" key={index}>
            <button
              className={`nav-link ${step === index + 1 ? 'active' : ''}`}
              onClick={() => setStep(index + 1)}
            >
              {index + 1}. {label}
            </button>
          </li>
        ))}
      </ul>

      <div className="row">
        {/* Left Column */}
        <div className="col-lg-7 mb-4">
          {/* Step 1: Cart */}
          {step === 1 && (
            <div className="card shadow-sm p-4 mb-4">
              <h4 className="mb-4">Your Cart</h4>
              {cartItems.map(item => (
                <div key={item.id} className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
                  <div className="d-flex align-items-center">
                    <Image src={item.image} alt={item.title} width={70} height={70} className="rounded me-3" />
                    <div>
                      <h6 className="mb-1">{item.title}</h6>
                      <small>{item.size} · Qty: {item.qty}</small>
                    </div>
                  </div>
                  <div className="fw-bold">₹{item.price * item.qty}</div>
                </div>
              ))}
              <div className="d-flex justify-content-between fw-bold">
                <span>Total</span> 
                <span>₹{subtotal}</span>
              </div>
            </div>
          )}

          {/* Step 2: Address */}
          {step === 2 && (
            <>
              <div className="card shadow-sm p-4 mb-4">
                <h4 className="mb-4">Shipping Address</h4>
                <form className="row g-3">
                  <input className="form-control" placeholder="Full Name" required />
                  <input className="form-control" placeholder="Mobile Number" required />
                  <input className="form-control" placeholder="Email Address" required />
                  <input className="form-control" placeholder="Street Address" required />
                  <div className="col-md-6">
                    <input className="form-control" placeholder="City" required />
                  </div>
                  <div className="col-md-3">
                    <input className="form-control" placeholder="State" required />
                  </div>
                  <div className="col-md-3">
                    <input className="form-control" placeholder="Pincode" required />
                  </div>
                  <div className="form-check mt-3">
                    <input className="form-check-input" type="checkbox" checked={billingSameAsShipping} onChange={() => setBillingSameAsShipping(!billingSameAsShipping)} />
                    <label className="form-check-label">Billing address same as shipping</label>
                  </div>
                </form>
              </div>

              {!billingSameAsShipping && (
                <div className="card shadow-sm p-4 mb-4">
                  <h4 className="mb-3">Billing Address</h4>
                  <form className="row g-3">
                    <input className="form-control" placeholder="Full Name" required />
                    <input className="form-control" placeholder="Mobile Number" required />
                    <input className="form-control" placeholder="Street Address" required />
                    <input className="form-control" placeholder="City" required />
                    <input className="form-control" placeholder="State" required />
                    <input className="form-control" placeholder="Pincode" required />
                  </form>
                </div>
              )}
            </>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div className="card shadow-sm p-4 mb-4">
              <h4 className="mb-3">Payment Method</h4>
              <div className="d-flex gap-4 mb-3 flex-wrap">
                {['upi', 'card', 'cod'].map(method => (
                  <div className="form-check" key={method}>
                    <input
                      type="radio"
                      id={method}
                      className="form-check-input"
                      checked={selectedPayment === method}
                      onChange={() => setSelectedPayment(method)}
                    />
                    <label htmlFor={method} className="form-check-label">
                      {method === 'upi' && 'UPI'}
                      {method === 'card' && 'Credit/Debit Card'}
                      {method === 'cod' && 'Cash on Delivery'}
                    </label>
                  </div>
                ))}
              </div>

              {selectedPayment === 'upi' && (
                <input className="form-control" placeholder="Enter UPI ID" />
              )}
              {selectedPayment === 'card' && (
                <div className="row g-2 mt-2">
                  <input className="form-control" placeholder="Card Number" />
                  <div className="col-6">
                    <input className="form-control" placeholder="MM/YY" />
                  </div>
                  <div className="col-6">
                    <input className="form-control" placeholder="CVV" />
                  </div>
                </div>
              )}
              {selectedPayment === 'cod' && (
                <p className="text-muted mt-3">Cash will be collected upon delivery.</p>
              )}
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div className="card shadow-sm p-4 mb-4">
              <h4 className="mb-3">Review Order</h4>
              <div className="mb-3">
                <strong>Shipping To:</strong>
                <p>John Doe, Mumbai, Maharashtra, 400001</p>
              </div>
              <div>
                <strong>Payment Method:</strong>
                <p>{selectedPayment.toUpperCase()}</p>
              </div>
            </div>
          )}

          {/* Coupon & Gift Option */}
          {(step === 2 || step === 3) && (
            <div className="card shadow-sm p-4 mb-4">
              <h4 className="mb-3">Coupon & Gift Options</h4>
              <div className="input-group mb-3">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter coupon code"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                />
                <button className="btn btn-dark">Apply</button>
              </div>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" checked={giftWrap} onChange={() => setGiftWrap(!giftWrap)} />
                <label className="form-check-label">Add gift wrap for ₹49</label>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Order Summary */}
        <div className="col-lg-5">
          <div className="card shadow-sm p-4 order-summary sticky-top">
            <h4 className="mb-4">Order Summary</h4>
            {cartItems.map(item => (
              <div key={item.id} className="d-flex align-items-center mb-3">
                <Image src={item.image} alt={item.title} width={80} height={80} className="rounded me-3" />
                <div>
                  <h6 className="mb-1">{item.title}</h6>
                  <small>{item.size} · Qty: {item.qty}</small>
                </div>
                <div className="ms-auto fw-bold">₹{item.price * item.qty}</div>
              </div>
            ))}
            <hr />
            <div className="d-flex justify-content-between mb-2"><span>Subtotal</span><span>₹{subtotal}</span></div>
            {giftWrap && <div className="d-flex justify-content-between mb-2"><span>Gift Wrap</span><span>₹49</span></div>}
            <div className="d-flex justify-content-between mb-2"><span>Shipping</span><span>Free</span></div>
            <div className="d-flex justify-content-between mb-2"><span>GST</span><span>₹{gst}</span></div>
            <hr />
            <div className="d-flex justify-content-between fw-bold fs-5">
              <span>Total</span><span>₹{total}</span>
            </div>
            {step === 4 && (
              <button className="btn button-success w-100 mt-4" onClick={handlePlaceOrder}>
                Place Order
              </button>
            )}
            <p className="text-muted small text-center mt-3">🔒 100% Secure Payments | 🚚 Free Shipping | 💄 Dermatologist Approved</p>
          </div>
        </div>
      </div>
    </div>
  );
}

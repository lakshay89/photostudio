"use client";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

// ✅ CardSlider for image rotation with fade + hover pause
function CardSlider({ images, defaultImage, alt }) {
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef(null);
  const delayRef = useRef(null);

  // Preload slider images
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // Show default for 2s, then start sliding
  useEffect(() => {
    setIdx(0);
    setSliding(false);
    if (delayRef.current) clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => setSliding(true), 2000);
    return () => clearTimeout(delayRef.current);
  }, [images, defaultImage]);

  // Rotate every 1s
  useEffect(() => {
    if (!sliding || hovered || images.length < 1) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [sliding, hovered, images]);

  const showDefault = !sliding;

  return (
    <div
      className="position-relative w-100"
      style={{
        aspectRatio: "1 / 1",
        overflow: "hidden",
        cursor: images.length > 0 ? "pointer" : "default",
        borderRadius: alt.includes("Circle") ? "50%" : "0.25rem", // ✅ Circle crop if circle product
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default image */}
      <Image
        src={defaultImage}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{
          objectFit: "cover",
          transition: "opacity 1s cubic-bezier(0.4,0,0.2,1)",
          opacity: showDefault ? 1 : 0,
          zIndex: 2,
          position: "absolute",
          borderRadius: alt.includes("Circle") ? "50%" : "0.25rem",
        }}
        priority
      />
      {/* Fading slider images */}
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: "cover",
            transition: "opacity 1s cubic-bezier(0.4,0,0.2,1)",
            opacity: sliding && idx === i ? 1 : 0,
            zIndex: 3,
            position: "absolute",
            borderRadius: alt.includes("Circle") ? "50%" : "0.25rem",
          }}
          priority={i === 0}
        />
      ))}
    </div>
  );
}

// ✅ ProductCard component
const ProductCard = ({ product, onBuyClick }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow-sm h-100 border-0">
      <CardSlider
        images={product.images}
        defaultImage={product.defaultImage}
        alt={product.name}
      />
      <div className="card-body text-center d-flex flex-column">
        <h5 className="card-title mb-3">{product.name}</h5>
        <button
          className="btn btn-primary mt-auto"
          onClick={() => onBuyClick(product)}
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;

"use client";
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import ProductEditor from '../Components/ProductEditor/ProductEditor';
import './page.css'

// CardSlider: unique default, 2s delay, 1s fade, pause on hover, preload, cleanup
function CardSlider({ images, defaultImage, alt }) {
  const [idx, setIdx] = useState(0);
  const [sliding, setSliding] = useState(false);
  const [hovered, setHovered] = useState(false);
  const intervalRef = useRef(null);
  const delayRef = useRef(null);

  // Preload all slider images
  useEffect(() => {
    images.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, [images]);

  // Start slider after 2s, reset on images/defaultImage change
  useEffect(() => {
    setIdx(0);
    setSliding(false);
    if (delayRef.current) clearTimeout(delayRef.current);
    delayRef.current = setTimeout(() => setSliding(true), 2000);
    return () => {
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, [images, defaultImage]);

  // Slider interval (1s) with fade, pause on hover
  useEffect(() => {
    if (!sliding || images.length < 1 || hovered) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % images.length);
    }, 1000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sliding, images, hovered]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, []);

  // Show default image for 2s, then slider
  const showDefault = !sliding;

  return (
    <div
      className="position-relative w-100"
      style={{ aspectRatio: '1 / 1', overflow: 'hidden', cursor: images.length > 0 ? 'pointer' : 'default' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Default image (fades out) */}
      <Image
        src={defaultImage}
        alt={alt}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        style={{
          objectFit: 'cover',
          borderRadius: '0.25rem',
          transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)',
          opacity: showDefault ? 1 : 0,
          zIndex: 2,
          position: 'absolute',
        }}
        priority
      />
      {/* Slider images (fade in/out) */}
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt={alt}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          style={{
            objectFit: 'cover',
            borderRadius: '0.25rem',
            transition: 'opacity 1s cubic-bezier(0.4,0,0.2,1)',
            opacity: sliding && idx === i ? 1 : 0,
            zIndex: 3,
            position: 'absolute',
          }}
          priority={i === 0}
        />
      ))}
    </div>
  );
}
export default function Page() {
  const [showEditor, setShowEditor] = useState(false);

  // Unique default images for each card
  // Unique default images for each card (not used in any other slider)
  const defaultImages = [
    '/mockup/Portrait-Acrylic-Wall-Photo-min-500x500.jpg',
    '/mockup/Portrait-Acrylic-Wall-Photo-Dual-Border-min-500x500.jpg',
    '/mockup/Landscape-min-500x500.jpg',
  ];
  // Each card's slider images (do not include any other card's default)
  const sliderImages = [
    [
      // Card 1: exclude Card 2 and 3 defaults
      '/mockup/1-500x500.jpg',
      '/mockup/4-500x500.jpg',
      '/mockup/3-500x500.jpg',
    ],
    [
      // Card 2: exclude Card 1 and 3 defaults
      '/mockup/b1.jpg',
      '/mockup/b2.jpg',
      '/mockup/b3.jpg',
      
    ],
    [
      // Card 3: exclude Card 1 and 2 defaults
      '/mockup/l1.jpg',
      '/mockup/l2.jpg',
      '/mockup/l3.jpg',
      ],
  ];
  // Example: add your own unique images for each slider below, e.g. '/mockup/Portrait-Alt1.jpg'
  // For demo, we'll just use empty arrays (no slider images)
  const products = [
    {
      id: 1,
      title: 'Portrait Acrylic Wall Photo',
      defaultImage: defaultImages[0],
      images: sliderImages[0],
    },
    {
      id: 2,
      title: 'Portrait Acrylic Wall Photo Dual Border',
      defaultImage: defaultImages[1],
      images: sliderImages[1],
    },
    {
      id: 3,
      title: 'Landscape Acrylic Wall Photo',
      defaultImage: defaultImages[2],
      images: sliderImages[2],
    },
  ];

  return (
    <div className="container py-4">
      <div className="row g-4">
        {products.map((product) => (
          <div className="col-12 col-sm-6 col-md-4" key={product.id}>
            <div className="card h-100 border-0 shadow-sm">
              {/* Slider replaces static Image */}
              <CardSlider images={product.images} defaultImage={product.defaultImage} alt={product.title} interval={2000} />
              <div className="card-body text-center d-flex flex-column">
                <h5 className="card-title mb-3">{product.title}</h5>
                <button
                  className="btn mt-auto button-89"
                  // style={{backgroundColor:'#20c997', color:'white'}}
                  onClick={() => setShowEditor(true)}
                >
                  Customise
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ProductEditor show={showEditor} onClose={() => setShowEditor(false)} />
    </div>
  );
}

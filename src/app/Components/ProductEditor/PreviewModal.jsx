"use client";
import { useEffect, useState, useMemo } from "react";
import Image from "next/image";

const LANDSCAPE = [
  { label: "12×9", w: 12, h: 9, price: 699 },
  { label: "16×12", w: 16, h: 12, price: 1099 },
  { label: "18×12", w: 18, h: 12, price: 1499 },
  { label: "21×15", w: 21, h: 15, price: 1999 },
  { label: "30×20", w: 30, h: 20, price: 3499 },
  { label: "35×23", w: 33, h: 23, price: 4499 },
  { label: "48×36", w: 37, h: 27, price: 5999 },
];

const PORTRAIT = LANDSCAPE.map((s) => ({
  label: `${s.h}×${s.w}`,
  w: s.h,
  h: s.w,
  price: s.price,
}));

const FRAME_RECT_PCT = { left: 35, top: 7, width: 22, height: 33 };

function sizeScale(selected, base) {
  return Math.sqrt((selected.w * selected.h) / (base.w * base.h));
}

export default function PreviewModal({ show, onClose, uploadedImage }) {
  const [photoUrl, setPhotoUrl] = useState(null);
  const [orientation, setOrientation] = useState("portrait"); // ✅ Default vertical only
  const [selected, setSelected] = useState(PORTRAIT[0]);
  const [thickness, setThickness] = useState("3mm");

  const sizes = PORTRAIT; // ✅ Only vertical sizes
  const base = sizes[0];
  const scale = sizeScale(selected, base);

  // Handle uploaded image
  useEffect(() => {
    if (!uploadedImage) return setPhotoUrl(null);

    let url;
    if (typeof uploadedImage === "string") url = uploadedImage;
    else if (uploadedImage instanceof File) url = URL.createObjectURL(uploadedImage);

    setPhotoUrl(url);

  const img = new window.Image();
    img.onload = () => {
      // ✅ Always vertical orientation only
      setOrientation("portrait");
      setSelected(PORTRAIT[0]);
    };
    img.src = url;

    return () => {
      if (uploadedImage instanceof File) URL.revokeObjectURL(url);
    };
  }, [uploadedImage]);

  // === DYNAMIC PRICE LOGIC ===
  const total = useMemo(() => {
    let price = selected.price;
    if (thickness === "5mm") price += 500;
    else if (thickness === "8mm") price += 1000;
    return price;
  }, [selected, thickness]);

  // === DYNAMIC SHADOW INTENSITY ===
  const getShadow = () => {
    switch (thickness) {
      case "3mm":
        return "0 4px 12px rgba(0,0,0,0.35)";
      case "5mm":
        return "0 8px 20px rgba(0,0,0,0.45)";
      case "8mm":
        return "0 12px 28px rgba(0,0,0,0.55)";
      default:
        return "0 6px 16px rgba(0,0,0,0.4)";
    }
  };

  if (!show) return null;

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      role="dialog"
      style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered" role="document">
        <div className="modal-content border-0 rounded-4 shadow-lg overflow-hidden">
          {/* HEADER */}
          <div className="modal-header" style={{ borderBottom: "2px solid #20c997" }}>
            <h5 className="modal-title fw-semibold text-dark">OMGS® Wall Preview</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row g-4 flex-wrap">
              {/* LEFT SIDE */}
              <div className="col-lg-7 col-md-12">
                {/* Orientation toggle */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="btn-group w-100">
                    <button
                      className={`btn ${orientation === "portrait" ? "btn-success" : "btn-outline-success"}`}
                      style={{
                        backgroundColor: orientation === "portrait" ? "#20c997" : "transparent",
                        color: orientation === "portrait" ? "#fff" : "#20c997",
                        borderColor: "#20c997",
                        fontWeight: "600",
                      }}
                      onClick={() => {
                        setOrientation("portrait");
                        setSelected(PORTRAIT[0]);
                      }}
                      disabled={!photoUrl}
                    >
                      Vertical
                    </button>

                    {/* ❌ Commented Horizontal button */}
                    {/*
                    <button
                      className={`btn btn-outline-primary ${
                        orientation === "landscape" ? "active" : ""
                      }`}
                      onClick={() => {
                        setOrientation("landscape");
                        setSelected(LANDSCAPE[0]);
                      }}
                      disabled={!photoUrl}
                    >
                      Horizontal
                    </button>
                    */}
                  </div>
                </div>

                {/* Wall Mockup */}
                <div
                  className="position-relative w-100 rounded shadow-sm"
                  style={{
                    aspectRatio: "4/3",
                    backgroundImage: "url('/mockup/wall-frame.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    overflow: "hidden",
                  }}
                >
                  {/* Centered upload button background (visible when no photo) */}
                  {!photoUrl && (
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "grid",
                        placeItems: "center",
                        pointerEvents: "none",
                        zIndex: 2,
                      }}
                    >
                      <div style={{ width: "40%", height: "40%", position: "relative" }}>
                        <Image
                          src="/mockup/upload-button.png"
                          alt="Upload"
                          fill
                          unoptimized
                          crossOrigin="anonymous"
                          style={{ objectFit: "contain", zIndex: 2 }}
                        />
                      </div>
                    </div>
                  )}

                  {photoUrl && (
                    <>
                      {/* Dimension Labels */}
                      <div
                        style={{
                          position: "absolute",
                          top: "40px",
                          left: `${FRAME_RECT_PCT.left + FRAME_RECT_PCT.width / 2}%`,
                          transform: "translate(-50%, -100%)",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "small",
                        }}
                      >
                        {selected.w} inches ({(selected.w * 2.54).toFixed(2)} cm)
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          top: "300px",
                          left: `${FRAME_RECT_PCT.left - 13}%`,
                          transform: "translate(-100%, -50%) rotate(-90deg)",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "small",
                        }}
                      >
                        {selected.h} inches ({(selected.h * 2.54).toFixed(2)} cm)
                      </div>

                      <div
                        style={{
                          position: "absolute",
                          top: "450px",
                          left: `${FRAME_RECT_PCT.left + FRAME_RECT_PCT.width / 2}%`,
                          transform: "translate(-50%, 0)",
                          color: "black",
                          fontWeight: "bold",
                          fontSize: "small",
                        }}
                      >
                        Thickness: {thickness}
                      </div>

                      {/* Uploaded Image */}
                      <div
                        className="position-absolute"
                        style={{
                          left: `${FRAME_RECT_PCT.left}%`,
                          // top: `${FRAME_RECT_PCT.top}%`,
                          top: `34%`,
                          width: `${FRAME_RECT_PCT.width}%`,
                          height: `${FRAME_RECT_PCT.height}%`,
                          transform: `scale(${scale * 0.75})`,
                          transformOrigin: "center",
                          transition: "transform .25s ease",
                          display: "grid",
                          placeItems: "center",
                        }}
                      >
                        <div
                          className="w-100 h-100"
                          style={{
                            backgroundImage: `url(${photoUrl})`,
                            backgroundSize: "cover", // ✅ Cover full area
                            backgroundPosition: "center",
                            borderRadius: "6px",
                            boxShadow: getShadow(),
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-5 col-md-12">
                <h4 className="fw-semibold mb-2 text-dark">₹ {total}</h4>
                <p className="text-success small mb-3">Only 8 Acrylic's left!</p>

                {/* SIZE OPTIONS */}
                <div className="mb-3">
                  <h6 className="fw-semibold mb-2 text-dark">Acrylic Size (Inch)</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.label}
                        className={`btn btn-sm ${
                          selected.label === s.label ? "btn-success" : "btn-outline-success"
                        }`}
                        onClick={() => setSelected(s)}
                        style={{
                          borderColor: "#20c997",
                          backgroundColor: selected.label === s.label ? "#20c997" : "transparent",
                          color: selected.label === s.label ? "#fff" : "#20c997",
                          fontWeight: 600,
                        }}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* THICKNESS OPTIONS */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2 text-dark">Acrylic Thickness</h6>
                  <div className="btn-group flex-wrap">
                    {["3mm", "5mm", "8mm"].map((t) => (
                      <button
                        key={t}
                        className={`btn ${thickness === t ? "btn-success" : "btn-outline-success"}`}
                        onClick={() => setThickness(t)}
                        style={{
                          borderColor: "#20c997",
                          backgroundColor: thickness === t ? "#20c997" : "transparent",
                          color: thickness === t ? "#fff" : "#20c997",
                          fontWeight: 600,
                          marginRight: 6,
                          marginBottom: 6,
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-success btn-lg w-100 fw-semibold"
                  disabled={!photoUrl}
                  style={{
                    backgroundColor: "#20c997",
                    borderColor: "#20c997",
                    transition: "all 0.2s",
                  }}
                >
                  Buy it now
                </button>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div
            className="modal-footer border-0"
            style={{ backgroundColor: "#f9f9f9" }}
          >
            <button
              className="btn btn-outline-success px-4 fw-semibold"
              onClick={onClose}
              style={{
                borderColor: "#20c997",
                color: "#20c997",
              }}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

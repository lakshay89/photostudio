"use client";
import { useEffect, useState, useMemo } from "react";

const LANDSCAPE = [
  { label: "12×9", w: 12, h: 9, price: 699 },
  { label: "16×12", w: 16, h: 12, price: 1099 },
  { label: "18×12", w: 18, h: 12, price: 1499 },
  { label: "21×15", w: 21, h: 15, price: 1999 },
  { label: "30×20", w: 30, h: 20, price: 3499 },
  { label: "35×23", w: 33, h: 23, price: 4499 },
  { label: "48×36", w: 41, h: 30, price: 5999 },
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
  const [orientation, setOrientation] = useState("landscape");
  const [selected, setSelected] = useState(LANDSCAPE[0]);
  const [thickness, setThickness] = useState("3mm");

  const sizes = orientation === "landscape" ? LANDSCAPE : PORTRAIT;
  const base = sizes[0];
  const scale = sizeScale(selected, base);

  // Handle uploaded image and auto orientation
  useEffect(() => {
    if (!uploadedImage) return setPhotoUrl(null);

    let url;
    if (typeof uploadedImage === "string") url = uploadedImage;
    else if (uploadedImage instanceof File) url = URL.createObjectURL(uploadedImage);

    setPhotoUrl(url);

    const img = new Image();
    img.onload = () => {
      if (img.naturalWidth > img.naturalHeight) {
        setOrientation("landscape");
        setSelected(LANDSCAPE[0]);
      } else {
        setOrientation("portrait");
        setSelected(PORTRAIT[0]);
      }
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
        <div className="modal-content">
          {/* HEADER */}
          <div className="modal-header">
            <h5 className="modal-title fw-semibold">OMGS® Wall Preview</h5>
            <button type="button" className="btn-close" onClick={onClose}></button>
          </div>

          {/* BODY */}
          <div className="modal-body">
            <div className="row g-4">
              {/* LEFT SIDE */}
              <div className="col-lg-7">
                {/* Orientation toggle */}
                <div className="d-flex align-items-center gap-2 mb-3">
                  <div className="btn-group">
                    <button
                      className={`btn btn-outline-primary ${
                        orientation === "portrait" ? "active" : ""
                      }`}
                      onClick={() => {
                        setOrientation("portrait");
                        setSelected(PORTRAIT[0]);
                      }}
                      disabled={!photoUrl}
                    >
                      Vertical
                    </button>
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
                  </div>
                </div>

                {/* Wall Mockup */}
                <div
                  className="position-relative w-100 rounded shadow"
                  style={{
                    aspectRatio: "4/3",
                    backgroundImage: "url('/mockup/wall-frame.png')",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    overflow: "hidden",
                  }}
                >
                  {/* Dimension Labels */}
                  {photoUrl && (
                    <>
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
                    </>
                  )}

                  {/* Uploaded Image */}
                  <div
                    className="position-absolute"
                    style={{
                      marginTop: "67px",
                      left: `${FRAME_RECT_PCT.left}%`,
                      top: `${FRAME_RECT_PCT.top}%`,
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
                      className="w-100 h-100 mt-5"
                      style={{
                        backgroundImage: `url(${photoUrl})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        boxShadow: getShadow(),
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-lg-5">
                {/* PRICE */}
                <h4 className="fw-semibold mb-2">₹ {total}</h4>
                <p className="text-success small mb-3">Only 8 Acrylic's left!</p>

                {/* SIZE OPTIONS */}
                <div className="mb-3">
                  <h6 className="fw-semibold mb-2">Acrylic Size (Inch)</h6>
                  <div className="d-flex flex-wrap gap-2">
                    {sizes.map((s) => (
                      <button
                        key={s.label}
                        className={`btn btn-sm ${
                          selected.label === s.label
                            ? "btn-dark"
                            : "btn-outline-dark"
                        }`}
                        onClick={() => setSelected(s)}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* THICKNESS OPTIONS */}
                <div className="mb-4">
                  <h6 className="fw-semibold mb-2">Acrylic Thickness</h6>
                  <div className="btn-group">
                    {["3mm", "5mm", "8mm"].map((t) => (
                      <button
                        key={t}
                        className={`btn btn-outline-dark ${
                          thickness === t ? "active" : ""
                        }`}
                        onClick={() => setThickness(t)}
                        style={{
                          border:
                            thickness === t
                              ? "2px solid #000"
                              : "1px solid #ccc",
                          background: thickness === t ? "#111" : "#fff",
                          color: thickness === t ? "#fff" : "#111",
                          marginRight: 8,
                          padding: "8px 18px",
                          borderRadius: 20,
                          fontWeight: 600,
                          cursor: "pointer",
                          transition: "all 0.2s",
                        }}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  className="btn btn-danger btn-lg w-100"
                  disabled={!photoUrl}
                >
                  Buy it now
                </button>
              </div>
            </div>
          </div>

          {/* FOOTER */}
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

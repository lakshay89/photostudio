"use client";
import React, { useState, useMemo } from "react";

const THICKNESS_OPTIONS = [
  { label: "3mm", key: "3mm" },
  { label: "5mm", key: "5mm" },
  { label: "8mm", key: "8mm" },
];

const THICKNESS_MULTIPLIERS = {
  "3mm": 1.0,
  "5mm": 1.15,
  "8mm": 1.3,
};

const BALLOON_PATH = `M312,165.5c3.4,45.9-9.7,90.9-40.6,118.2c-30.9,27.3-79.4,36.8-122.8,33.6c-43.4-3.3-81.6-19.4-103.8-49.4
c-22.2-30-28.3-73.8-18.6-113.7c9.7-39.9,35.3-75.8,70.9-94.5C133.7,41,178.4,37.5,220,44.8c41.6,7.3,80.9,25.3,104.9,53.1
C349,125.7,308.6,119.6,312,165.5z`;

const ProductModal1 = ({ product, onClose }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [thickness, setThickness] = useState("3mm");

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const computedPrice = useMemo(() => {
    const base = Number(selectedSize.price) || 0;
    const mult = THICKNESS_MULTIPLIERS[thickness] ?? 1;
    return (base * mult).toFixed(2);
  }, [selectedSize, thickness]);

  // Only plain "Portrait Acrylic Wall Photo" is vertical
  const isPortrait =
    product.name.includes("Portrait Acrylic Wall Photo") &&
    !product.name.includes("Rounded Rect Portrait Acrylic Wall Photo");

  // Rounded corners for rectangle-rounded
  const hasRoundedBorders = product.orientation === "rectangle-rounded";

  return (
    <div
      className="modal show fade d-block"
      tabIndex="-1"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(3px)",
      }}
    >
      <div
        className="modal-dialog modal-xl modal-dialog-centered"
        style={{ maxWidth: "1100px" }}
      >
        <div
          className="modal-content border-0 rounded-4 shadow-lg"
          style={{
            minHeight: "75vh",
            maxHeight: "92vh",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
          }}
        >
          {/* Header */}
          <div className="modal-header border-0 px-4 pt-4 pb-0">
            <h4 className="fw-bold mb-0">{product.name}</h4>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div
            className="modal-body px-4 pb-4 pt-2"
            style={{ overflow: "auto" }}
          >
            <div className="row g-4 align-items-stretch">
              {/* LEFT SIDE */}
              <div className="col-md-6 d-flex flex-column">
                {/* Upload */}
                <div
                  className="border rounded-4 flex-grow-1 d-flex flex-column justify-content-center align-items-center"
                  style={{
                    borderStyle: "dashed",
                    borderWidth: "2px",
                    borderColor: "#dcdcdc",
                    backgroundColor: "#fafafa",
                    minHeight: "260px",
                    maxHeight: "48vh",
                    overflow: "hidden",
                    padding: "28px",
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="d-none"
                    id="photo-upload"
                  />
                  <label
                    htmlFor="photo-upload"
                    style={{ cursor: "pointer" }}
                    className="text-center w-100"
                  >
                    <div
                      className="rounded-circle bg-light d-inline-flex align-items-center justify-content-center mb-3"
                      style={{ width: "70px", height: "70px" }}
                    >
                      <i className="bi bi-cloud-upload fs-3 text-secondary"></i>
                    </div>
                    <div>
                      <p className="fw-semibold mb-1">Upload Your Photo</p>
                      <p className="small text-muted mb-1">
                        Drag and drop or click to browse
                      </p>
                      <p className="small text-muted">
                        Supports JPG, PNG, HEIC up to 50MB
                      </p>
                    </div>
                  </label>
                </div>

                {/* Size Selector */}
                <div className="mt-4">
                  <h6 className="fw-semibold mb-3">Select Size</h6>
                  <div className="d-flex flex-wrap gap-3">
                    {product.sizes.map((size, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedSize(size)}
                        className={`btn border rounded-3 px-4 py-3 ${
                          selectedSize.label === size.label
                            ? "border-success bg-success bg-opacity-10"
                            : "border-secondary-subtle"
                        }`}
                        style={{ minWidth: "110px" }}
                      >
                        <div
                          className={`fw-semibold ${
                            selectedSize.label === size.label
                              ? "text-success"
                              : "text-dark"
                          }`}
                        >
                          {size.label}
                        </div>
                        <div className="small text-muted">
                          ${Number(size.price).toFixed(2)}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Thickness Selector */}
                <div className="mt-4">
                  <h6 className="fw-semibold mb-2">Acrylic Thickness</h6>
                  <div className="d-flex gap-2">
                    {THICKNESS_OPTIONS.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setThickness(t.key)}
                        className={`btn rounded-pill px-3 py-2 ${
                          thickness === t.key
                            ? "btn-outline-success border-success"
                            : "btn-outline-secondary"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                  <p className="small text-muted mt-2">
                    Thickness affects finish & price.
                  </p>
                </div>
              </div>

              {/* RIGHT SIDE */}
              <div className="col-md-6 d-flex flex-column">
                {/* Preview */}
                <div
                  className="border rounded-4 bg-light d-flex align-items-center justify-content-center"
                  style={{
                    minHeight: isPortrait ? "380px" : "260px",
                    maxHeight: "50vh",
                    overflow: "hidden",
                    backgroundColor: "#f8f9fa",
                    padding: "18px",
                  }}
                >
                  {uploadedImage ? (
                    product.name.includes("Balloon Shape Acrylic Wall Photo") ? (
                      <svg
                        width="360"
                        height="360"
                        viewBox="0 0 360 360"
                        style={{
                          display: "block",
                          margin: "0 auto",
                          boxShadow:
                            "0 6px 20px rgba(0,0,0,0.15)",
                          borderRadius: "30px",
                          // optional: match the reference modal
                        }}
                      >
                        <defs>
                          <clipPath id="balloon-clip">
                            <path d={BALLOON_PATH} />
                          </clipPath>
                        </defs>
                        <image
                          href={uploadedImage}
                          width="360"
                          height="360"
                          style={{
                            clipPath: "url(#balloon-clip)"
                          }}
                          preserveAspectRatio="xMidYMid slice"
                        />
                      </svg>
                    ) : product.orientation === "circle" ? (
                      <div
                        className="mx-auto position-relative"
                        style={{
                          width: "320px",
                          height: "320px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          boxShadow:
                            "0 6px 20px rgba(0,0,0,0.12)",
                        }}
                      >
                        <img
                          src={uploadedImage}
                          alt="preview"
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </div>
                    ) : (
                      <img
                        src={uploadedImage}
                        alt="preview"
                        style={{
                          width: isPortrait ? "auto" : "100%",
                          height: isPortrait ? "100%" : "auto",
                          aspectRatio: isPortrait ? "3 / 4" : "4 / 3",
                          objectFit: "cover",
                          borderRadius: hasRoundedBorders ? "20px" : "0px",
                          maxHeight: "100%",
                        }}
                      />
                    )
                  ) : (
                    <div className="text-muted small text-center">
                      Upload a photo to see preview
                    </div>
                  )}
                </div>

                {/* Price */}
                <div className="mt-4 border rounded-4 p-4 bg-white shadow-sm">
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <div>
                      <h6 className="mb-1 fw-semibold">
                        {product.name}
                      </h6>
                      <p className="small text-muted mb-0">
                        {selectedSize.label} • {thickness}
                      </p>
                    </div>
                    <h5 className="fw-bold text-success mb-0">
                      ${computedPrice}
                    </h5>
                  </div>

                  <button
                    className="btn btn-success w-100 rounded-3 fw-semibold py-2 mt-3"
                    disabled={!uploadedImage}
                    style={{
                      opacity: uploadedImage ? 1 : 0.7,
                      cursor: uploadedImage ? "pointer" : "not-allowed",
                    }}
                  >
                    {uploadedImage ? "Add to Cart" : "Upload Photo First"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal1;

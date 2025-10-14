"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Rnd } from "react-rnd";
import html2canvas from "html2canvas";
import PreviewModal from "./PreviewModal";

export default function ProductEditor({ show, onClose }) {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [mergedImage, setMergedImage] = useState(null);
  const [orientation] = useState("vertical"); // ✅ locked vertical only
  const [showPreview, setShowPreview] = useState(false);
  const [scale, setScale] = useState(1); // ✅ for zoom in/out

  const [imageSize, setImageSize] = useState({ width: 200, height: 200 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const pointerDownRef = useRef({ down: false, x: 0, y: 0 });

  // ✅ Upload image (only vertical allowed)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      const img = new window.Image();
      img.src = url;
      img.onload = () => {
        if (img.width > img.height) {
          alert("Please upload a vertical (portrait) image only.");
          return;
        }

        setUploadedImage(url);
        if (containerRef.current) {
          const { offsetWidth, offsetHeight } = containerRef.current;
          const imgRatio = img.width / img.height;
          const boxRatio = offsetWidth / offsetHeight;

          let newWidth, newHeight;
          if (imgRatio < boxRatio) {
            newWidth = offsetWidth;
            newHeight = offsetWidth / imgRatio;
          } else {
            newHeight = offsetHeight;
            newWidth = offsetHeight * imgRatio;
          }

          setImageSize({ width: newWidth, height: newHeight });
          setImagePosition({
            x: (offsetWidth - newWidth) / 2,
            y: (offsetHeight - newHeight) / 2,
          });
        }
      };
    }
  };

  // ✅ Zoom handlers
  const handleZoomIn = () => setScale((prev) => Math.min(prev + 0.1, 3));
  const handleZoomOut = () => setScale((prev) => Math.max(prev - 0.1, 0.5));

  // ✅ Save merged image
  const handleSave = async () => {
    if (!containerRef.current) {
      alert("Please upload your image first!");
      return;
    }

    try {
      const canvas = await html2canvas(containerRef.current, {
        backgroundColor: null,
        useCORS: true,
        scale: 2,
      });
      const dataUrl = canvas.toDataURL("image/png");
      setMergedImage(dataUrl);
      onClose();
      setTimeout(() => setShowPreview(true), 300);
    } catch (err) {
      console.error("Error generating preview:", err);
    }
  };

  return (
    <>
      {show && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
        >
          <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
            <div className="modal-content">
              {/* HEADER */}
              <div className="modal-header">
                <h5 className="modal-title fw-semibold">Customise Product</h5>
                <button type="button" className="btn-close" onClick={onClose}></button>
              </div>

              {/* BODY */}
              <div className="modal-body">
                {/* Hidden file input (we trigger it via clicks on the upload area) */}
                <div className="mb-3" style={{ display: "none" }}>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                </div>

                {/* Editor Canvas */}
                <div
                  ref={containerRef}
                  className="border rounded position-relative mx-auto bg-light"
                  style={{
                    width: "350px",
                    height: "500px",
                    overflow: "hidden",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  // detect simple clicks (no drag) to open file picker
                  onMouseDown={(e) => {
                    pointerDownRef.current = { down: true, x: e.clientX, y: e.clientY };
                  }}
                  onMouseUp={(e) => {
                    const pd = pointerDownRef.current;
                    pointerDownRef.current.down = false;
                    if (!pd) return;
                    const dx = e.clientX - pd.x;
                    const dy = e.clientY - pd.y;
                    if (Math.hypot(dx, dy) < 6) {
                      // treat as click, open file picker
                      fileInputRef.current?.click();
                    }
                  }}
                  onTouchStart={(e) => {
                    const t = e.touches[0];
                    pointerDownRef.current = { down: true, x: t.clientX, y: t.clientY };
                  }}
                  onTouchEnd={(e) => {
                    const pd = pointerDownRef.current;
                    pointerDownRef.current.down = false;
                    // touchend has no coordinates; use changedTouches if available
                    const t = e.changedTouches && e.changedTouches[0];
                    if (!pd || !t) return;
                    const dx = t.clientX - pd.x;
                    const dy = t.clientY - pd.y;
                    if (Math.hypot(dx, dy) < 6) {
                      fileInputRef.current?.click();
                    }
                  }}
                >
                  {/* Centered upload button visible only when no image uploaded */}
                  {!uploadedImage && (
                    <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none", zIndex: 1 }}>
                      <div style={{ width: "50%", height: "50%", position: "relative" }}>
                        <Image
                          src="/mockup/upload-button.png"
                          alt="Upload button"
                          fill
                          unoptimized
                          crossOrigin="anonymous"
                          style={{ objectFit: "contain", zIndex: 1 }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Uploaded Image */}
                  {uploadedImage && (
                    <Rnd
                      size={{
                        width: imageSize.width * scale,
                        height: imageSize.height * scale,
                      }}
                      position={imagePosition}
                      onDragStop={(e, d) => setImagePosition({ x: d.x, y: d.y })}
                      onResizeStop={(e, direction, ref, delta, position) => {
                        setImageSize({
                          width: ref.offsetWidth / scale,
                          height: ref.offsetHeight / scale,
                        });
                        setImagePosition(position);
                      }}
                      lockAspectRatio
                      dragGrid={[1, 1]}
                      style={{
                        border: "1px dashed #00aaff",
                        background: "transparent",
                        zIndex: 10,
                      }}
                    >
                      <Image
                        src={uploadedImage}
                        alt="Uploaded"
                        fill
                        unoptimized
                        crossOrigin="anonymous"
                        style={{ objectFit: "cover" }}
                      />
                    </Rnd>
                  )}
                </div>
              </div>

              {/* FOOTER */}
              <div className="modal-footer d-flex justify-content-between align-items-center">
                <div>
                  {/* ✅ Zoom Controls */}
                  <button className="btn btn-outline-secondary me-2" onClick={handleZoomOut}>
                    -
                  </button>
                  <button className="btn btn-outline-secondary" onClick={handleZoomIn}>
                    +
                  </button>
                </div>
                <div>
                  <button className="btn btn-secondary me-2" onClick={onClose}>
                    Close
                  </button>
                  <button className="btn btn-primary" onClick={handleSave}>
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      <PreviewModal
        show={showPreview}
        onClose={() => setShowPreview(false)}
        uploadedImage={mergedImage}
      />
    </>
  );
}

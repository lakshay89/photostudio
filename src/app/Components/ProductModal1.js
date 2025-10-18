import React, { useState } from "react";
import Image from "next/image";

const ProductModal = ({ product, onClose }) => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [scale, setScale] = useState(1);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) setUploadedImage(URL.createObjectURL(file));
  };

  const handleSizeChange = (size) => {
    setSelectedSize(size);
    setScale(scale + 0.05); // 5% increase on each size change
  };

  return (
    <div className="modal show d-block" tabIndex="-1">
      <div className="modal-dialog modal-lg modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{product.name}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6 text-center">
                {uploadedImage ? (
                  <div
                    className={`border p-3 mx-auto d-flex align-items-center justify-content-center`}
                    style={{
                      width: "100%",
                      height: "350px",
                      overflow: "hidden",
                      borderRadius:
                        product.orientation === "circle"
                          ? "50%"
                          : product.orientation === "oval"
                          ? "50% / 40%"
                          : "10px",
                    }}
                  >
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      style={{
                        transform: `scale(${scale})`,
                        width: "100%",
                        height: "auto",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                ) : (
                  <div className="upload-box p-5 border rounded text-center">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="form-control"
                    />
                    <p className="mt-3 text-muted">Upload your photo</p>
                  </div>
                )}
              </div>
              <div className="col-md-6">
                <h6>Select Size</h6>
                <div className="d-flex flex-wrap gap-2 mb-3">
                  {product.sizes.map((size, idx) => (
                    <button
                      key={idx}
                      className={`btn btn-outline-primary ${
                        selectedSize.label === size.label ? "active" : ""
                      }`}
                      onClick={() => handleSizeChange(size)}
                    >
                      {size.label}
                    </button>
                  ))}
                </div>

                <h5 className="text-success mb-3">${selectedSize.price}</h5>

                <button className="btn btn-success w-100">
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;

import React from "react";

const ProductCard = ({ product, onBuyClick }) => (
  <div className="col-md-4 mb-4">
    <div className="card shadow-sm">
      <img src={product.image} className="card-img-top" alt={product.name} />
      <div className="card-body text-center">
        <h5 className="card-title">{product.name}</h5>
        <button
          className="btn btn-primary"
          onClick={() => onBuyClick(product)}
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
);

export default ProductCard;

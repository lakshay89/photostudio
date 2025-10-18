"use client"
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard1";
import ProductModal from "../components/ProductModal1";

const View = () => {
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5">Choose Your Portrait Style</h2>
      <div className="row">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onBuyClick={setSelectedProduct}
          />
        ))}
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </div>
  );
};

export default View;

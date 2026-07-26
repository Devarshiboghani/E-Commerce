"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "@/redux/actions/productAction";
import "./product-details.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { product, isLoading } = useSelector((state) => state.productStore);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <div className="product-details-loading">Loading product details...</div>;
  }

  if (!product) {
    return <div className="product-details-loading">Product not found.</div>;
  }

  return (
    <section className="product-details-page">
      <div className="product-details-card">
        <div className="product-details-image">
          <img src={product.images?.[0] || product.image} alt={product.title} />
        </div>

        <div className="product-details-content">
          <p className="product-details-category">{product.category}</p>
          <h1>{product.title}</h1>
          <p className="product-details-description">{product.description}</p>

          <div className="product-details-meta">
            <span className="product-details-price">₹{product.price}</span>
            <span className="product-details-stock">In stock: {product.quantity}</span>
          </div>

          <div className="product-details-actions">
            <button className="product-details-btn primary">Add to Cart</button>
            <button className="product-details-btn secondary">Buy Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}

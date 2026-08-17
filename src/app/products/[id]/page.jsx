"use client";

import { useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleProduct } from "@/redux/actions/productAction";
import { addToCart } from "@/redux/actions/cartAction";
import "./product-details.css";

export default function ProductDetailsPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();

  const { product, isLoading } = useSelector((state) => state.productStore);
  const { user } = useSelector((state) => state.authStore);

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleProduct(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    dispatch(addToCart({ userId: user._id, productId: product._id, quantity: 1 })).then((res) => {
      if (!res.error) {
        alert("Added to cart successfully! 🛒");
      } else {
        alert("Failed to add to cart: " + res.payload);
      }
    });
  };

  const handleBuyNow = () => {
    if (!user) {
      router.push("/signin");
      return;
    }
    dispatch(addToCart({ userId: user._id, productId: product._id, quantity: 1 })).then((res) => {
      if (!res.error) {
        router.push("/checkout");
      } else {
        alert("Failed to add to cart: " + res.payload);
      }
    });
  };

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
          <img 
            src={product.images?.[0] || product.image || "https://placehold.co/600x600/f8f9fa/a0aec0?text=No+Image"} 
            alt={product.title} 
            onError={(e) => { e.target.src = "https://placehold.co/600x600/f8f9fa/a0aec0?text=No+Image"; }}
          />
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
            <button className="product-details-btn primary" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="product-details-btn secondary" onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

import React from "react";
import { FiTrash2, FiMinus, FiPlus } from "react-icons/fi";
import "./CartCard.css";

const CartCard = ({ item, onUpdateQuantity }) => {
  const { product, quantity } = item;

  if (!product) return null;

  return (
    <div className="cart-card">
      <div className="cart-card-image">
        <img 
          src={product.images?.[0] || product.image || "https://placehold.co/400x400/f8f9fa/a0aec0?text=No+Image"} 
          alt={product.title || "Product"} 
          onError={(e) => { e.target.src = "https://placehold.co/400x400/f8f9fa/a0aec0?text=No+Image"; }}
        />
      </div>
      <div className="cart-card-details">
        <h4 className="cart-card-title">{product.title}</h4>
        <p className="cart-card-category">{product.category}</p>
        <div className="cart-card-price">₹{product.price}</div>
      </div>
      <div className="cart-card-actions">
        <div className="quantity-controls">
          <button 
            className="qty-btn" 
            onClick={() => onUpdateQuantity(product._id, "decrement")}
            disabled={quantity <= 1}
          >
            <FiMinus />
          </button>
          <span className="qty-display">{quantity}</span>
          <button 
            className="qty-btn" 
            onClick={() => onUpdateQuantity(product._id, "increment")}
          >
            <FiPlus />
          </button>
        </div>
        <div className="cart-card-total">
          ₹{(product.price * quantity).toFixed(2)}
        </div>
        <button 
          className="remove-btn" 
          onClick={() => onUpdateQuantity(product._id, "remove")}
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
};

export default CartCard;
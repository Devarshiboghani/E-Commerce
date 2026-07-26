"use client";

import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  removeWishlist,
  getWishlist,
} from "@/redux/actions/wishlistAction";

import "./WishlistCard.css";

const WishlistCard = ({ item }) => {

  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore);

  // 👇 YAHAN RAKHNA HAI
  const handleRemoveWishlist = () => {
    console.log(item);
    
    dispatch(removeWishlist(item._id)).then(() => {
      dispatch(getWishlist(user._id));
    });
  };

  return (
    <div className="wishlist-card">

      <div className="wishlist-image">

        <button
          className="wishlist-heart-btn"
          onClick={handleRemoveWishlist}
        >
          <FaHeart />
        </button>

        <img
          src={item.product.image}
          alt={item.product.title}
        />

      </div>

      {/* baki card */}
      <div className="wishlist-body">
        <p className="wishlist-category">{item.product.category}</p>

        <h3 className="wishlist-title">{item.product.title}</h3>

        <div className="wishlist-price">₹{item.product.price}</div>

        <div className="wishlist-buttons">
          <button className="move-cart-btn">Move To Cart</button>

          {/* <button
            className="remove-btn"
            onClick={() => dispatch(removeWishlist(item._id))}
          >
            Remove
          </button> */}
        </div>
      </div>

    </div>
  );
};

export default WishlistCard;

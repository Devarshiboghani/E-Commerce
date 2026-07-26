"use client";

import { useRouter } from "next/navigation";
// import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  FaHeart,
  FaRegHeart,
  FaStar,
  FaRegStar,
  FaStarHalfAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "@/redux/actions/wishlistAction";
import "./ProductCard.css";

const ProductCard = ({ item }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore);
  const { wishlist } = useSelector((state) => state.wishlistStore);

  const isWishlist = wishlist.some((w) => w.product?._id === item._id);

  const handleWishlist = () => {
    if (!user) {
      router.push("/signin");
      return;
    }

    if (isWishlist) {
      const wish = wishlist.find((w) => w.product._id === item._id);

      dispatch(removeWishlist(wish._id)).then(() => {
        dispatch(getWishlist(user._id));
      });

      return;
    }

    dispatch(
      addWishlist({
        user: user._id,
        product: item._id,
      }),
    ).then(() => {
      dispatch(getWishlist(user._id));
    });
  };

  const renderStars = (rating) => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} />);
      } else {
        stars.push(<FaRegStar key={i} />);
      }
    }

    return stars;
  };

  return (
    <div
      className="product-card-item"
      onClick={() => router.push(`/products/${item._id}`)}
    >
      <div className="product-card-image">
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.stopPropagation();
            handleWishlist();
          }}
        >
          {isWishlist ? (
            <FaHeart className="wishlist-active" />
          ) : (
            <FaRegHeart />
          )}
        </button>

        <img src={item.images?.[0] || item.image} alt={item.title} />
      </div>

      {/* Product Details */}

      <div className="product-card-details">
        <p className="product-card-category">{item.category}</p>

        <h3>{item.title}</h3>

        {/* <div className="product-card-meta">

          <span className="product-card-price">
            ₹{item.price}
          </span> */}

        <div className="rating-box">
          <div className="stars">{renderStars(item.rating)}</div>

          <span>({item.rating})</span>
        </div>

        <div className="product-card-meta">
          <span className="product-card-price">₹{item.price}</span>

          <button
            className="product-card-btn"
            onClick={(e) => {
              e.stopPropagation();
              alert("Add To Cart");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;

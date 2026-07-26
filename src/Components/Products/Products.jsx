"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { fetchAllProducts } from "@/redux/actions/productAction";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import {
  addWishlist,
  removeWishlist,
  getWishlist,
} from "@/redux/actions/wishlistAction";
import "./Products.css";

const Products = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const scrollRef = useRef(null);

  const { products, isLoading } = useSelector((state) => state.productStore);
  const { search } = useSelector((state) => state.searchStore);
  const { user } = useSelector((state) => state.authStore);
  const { wishlist } = useSelector((state) => state.wishlistStore);

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  useEffect(() => {
    if (user?._id) {
      dispatch(getWishlist(user._id));
    }
  }, [dispatch, user]);

  const filteredProducts = products.filter((item) => {
    const keyword = search.toLowerCase();

    return (
      item.title?.toLowerCase().includes(keyword) ||
      item.description?.toLowerCase().includes(keyword) ||
      item.category?.toLowerCase().includes(keyword)
    );
  });

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 320,
      behavior: "smooth",
    });
  };

  const isWishlist = (productId) => {
    return wishlist.some((item) => item.product._id === productId);
  };

  const handleWishlist = (item) => {
    if (!user) {
      router.push("/signin");
      return;
    }

    if (isWishlist(item._id)) {
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

  if (isLoading) {
    return <h2 className="text-center py-5">Loading...</h2>;
  }

  return (
    <section className="featured-section">
      {/* Header */}
      <div className="featured-header">
        <h2>Featured Products</h2>

        <button
          className="view-all-btn"
          onClick={() => router.push("/products")}
        >
          View All <FaArrowRight />
        </button>
      </div>

      {/* Slider */}
      <div className="featured-wrapper">
        <div className="featured-scroll" ref={scrollRef}>
          {filteredProducts.map((item) => (
            <div
              className="product-card"
              key={item._id}
              onClick={() => router.push(`/products/${item._id}`)}
            >
              <div className="product-image-box">
                <button
                  className="wishlist-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(item);
                  }}
                >
                  {isWishlist(item._id) ? (
                    <FaHeart className="wishlist-active" />
                  ) : (
                    <FaRegHeart />
                  )}
                </button>

                <img src={item.images?.[0] || item.image} alt={item.title} />

                {/* <img src={item.images?.[0] || item.image} alt={item.title} /> */}
              </div>

              <div className="product-content">
                <h5 className="product-title">{item.title}</h5>

                <h4 className="product-price">₹{item.price}</h4>

                <div className="rating-box">
                  <div className="stars">{renderStars(item.rating)}</div>

                  <span>({item.rating})</span>
                </div>

                <button
                  className="cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Add To Cart");
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>

        <button className="slider-arrow" onClick={scrollRight}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Products;

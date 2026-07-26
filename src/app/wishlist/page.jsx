"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWishlist } from "@/redux/actions/wishlistAction";
import WishlistCard from "@/Components/WishlistCard/WishlistCard";

export default function WishlistPage() {
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore);
  const { wishlist, isLoading } = useSelector((state) => state.wishlistStore);

  useEffect(() => {
    if (user) {
      dispatch(getWishlist(user._id));
    }
  }, [dispatch, user]);

  if (!user) {
  return <h2>Please Login First</h2>;
}

  if (isLoading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="wishlist-page">
      <div className="wishlist-header">
        <h1>My Wishlist ❤️</h1>
        <p>Your favourite products in one place.</p>
      </div>

      <div className="wishlist-grid">
        {wishlist.map((item) => (
          <WishlistCard key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

"use client";

import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/redux/actions/categoryAction";
import { useRouter } from "next/navigation";
import { FaArrowRight } from "react-icons/fa";
import "./Categories.css";

const Categories = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const scrollRef = useRef(null);

  const { categories, loading } = useSelector((state) => state.categoryStore);
  const { search } = useSelector((state) => state.searchStore);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const filteredCategories = categories.filter((item) =>
    item.categoryName.toLowerCase().includes(search.toLowerCase()),
  );

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 250,
      behavior: "smooth",
    });
  };

  const handleAllClick = () => {
    router.push("/categories");
  };

  // Naya Handler: Category Card click par uski custom products page par bhejne k liye
  const handleCategoryClick = (categoryId) => {
    router.push(`/categories/${categoryId}`);
  };

  if (loading) {
    return <h2 className="text-center py-5">Loading...</h2>;
  }

  return (
    <section className="categories-section">
      <div className="section-header">
        <h2>Top Categories</h2>

        <button className="view-all-btn" onClick={handleAllClick}>
          View All <FaArrowRight />
        </button>
      </div>

      <div className="categories-wrapper">
        {/* SCROLLABLE LIST */}
        <div className="categories-scroll" ref={scrollRef}>
          {filteredCategories.map((item) => (
            <div
              className="category-card"
              key={item._id}
              onClick={() => handleCategoryClick(item._id)} // Click Handler Added
            >
              <img
                src={item.categoryImage || "https://placehold.co/400x400/f8f9fa/a0aec0?text=No+Image"}
                alt={item.categoryName}
                className="category-image"
                onError={(e) => { e.target.src = "https://placehold.co/400x400/f8f9fa/a0aec0?text=No+Image"; }}
              />
              <h5>{item.categoryName}</h5>
            </div>
          ))}
        </div>

        {/* ARROW */}
        <button className="arrow-btn" onClick={scrollRight}>
          <FaArrowRight />
        </button>
      </div>
    </section>
  );
};

export default Categories;

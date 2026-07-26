"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "@/redux/actions/categoryAction";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import FilterSort from "@/Components/FilterSort/FilterSort";
import Pagination from "@/Components/Pagination/Pagination";
import "./all-categories.css";

const ITEMS_PER_PAGE = 6;

export default function AllCategoriesPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { categories = [], loading } = useSelector((state) => state.categoryStore);
  const { search } = useSelector((state) => state.searchStore);

  // const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [sortValue, setSortValue] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const filteredCategories = useMemo(() => {
    let data = [...categories];

     // Header Search
  if (search.trim() !== "") {
    const keyword = search.toLowerCase();

    data = data.filter((item) =>
      item.categoryName?.toLowerCase().includes(keyword)
    );
  }


    if (filterValue !== "All") {
      data = data.filter((item) => item.categoryName === filterValue);
    }

    data.sort((a, b) => {
      if (sortValue === "za") return b.categoryName.localeCompare(a.categoryName);
      return a.categoryName.localeCompare(b.categoryName);
    });

    return data;
  }, [categories, search, filterValue, sortValue]);

  const totalPages = Math.max(1, Math.ceil(filteredCategories.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterValue, sortValue]);

  if (loading) {
    return <div className="loader-container"><h2>Loading Categories...</h2></div>;
  }

  return (
    <div className="all-categories-container">
      {/* HEADER WITH BACK BUTTON AND TITLE */}
      <div className="all-categories-top-header">
        <button
          className="all-categories-back-btn"
          onClick={() => router.push("/")}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="all-categories-header">
          <h1>Explore All Categories</h1>
          <p>Find the best premium products curated just for you.</p>
        </div>
      </div>

      {/* FILTER & SORT CONTROLS */}
      <FilterSort
        // search={search}
        // setSearch={setSearch}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
        categories={categories}
      />

      <div className="all-categories-grid">
        {paginatedCategories.length > 0 ? (
          paginatedCategories.map((item) => (
            <div
              className="full-category-card"
              key={item._id}
              onClick={() => router.push(`/categories/${item._id}`)}
            >
              <div className="img-wrapper">
                <img src={item.categoryImage} alt={item.categoryName} />
              </div>
              <h3>{item.categoryName}</h3>
            </div>
          ))
        ) : (
          <div className="products-empty">No categories found.</div>
        )}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
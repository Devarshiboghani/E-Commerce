"use client";

import { useMemo, useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, deleteCategory } from "@/redux/actions/categoryAction";
import { useRouter } from "next/navigation";
import { FaEdit, FaTrash, FaArrowLeft } from "react-icons/fa";
import FilterSort from "@/Components/FilterSort/FilterSort";
import "./categories.css";

export default function CategoriesPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { categories, loading } = useSelector((state) => state.categoryStore);
  const { search } = useSelector((state) => state.searchStore);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [sortValue, setSortValue] = useState("az");

  const filteredCategories = useMemo(() => {
    let data = [...categories];

    // Header Search
    if (search.trim() !== "") {
      const keyword = search.toLowerCase();

      data = data.filter((item) =>
        // item.title?.toLowerCase().includes(keyword) ||
        // item.description?.toLowerCase().includes(keyword) ||
        item.categoryName?.toLowerCase().includes(keyword),
      );
    }

    // Filter
    if (filterValue !== "All") {
      data = data.filter((item) => item.categoryName === filterValue);
    }

    // Sort
    switch (sortValue) {
      case "az":
        data.sort((a, b) => a.categoryName.localeCompare(b.categoryName));
        break;

      case "za":
        data.sort((a, b) => b.categoryName.localeCompare(a.categoryName));
        break;

      case "newest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;

      default:
        break;
    }

    return data;
  }, [categories, search, filterValue, sortValue]);

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?",
    );

    if (confirmDelete) {
      dispatch(deleteCategory(id));
    }
  };

  if (loading) {
    return <h2 className="text-center py-5">Loading...</h2>;
  }

  return (
    <section className="admin-category-page">
      {/* HEADER WITH BACK BUTTON AND TITLE */}
      <div className="admin-header">
        <button
          className="back-btn"
          onClick={() => router.push("/admin/dashboard")}
        >
          <FaArrowLeft /> Back
        </button>

        <div className="all-categories-header">
          <h2>Explore All Categories</h2>
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

      {/* CATEGORIES GRID */}
      <div className="category-grid">
        {filteredCategories.map((item) => (
          <div className="category-card" key={item._id}>
            <img src={item.categoryImage} alt={item.categoryName} />

            <h4>{item.categoryName}</h4>

            <div className="category-actions">
              <button
                className="edit-btn"
                onClick={() => router.push(`/admin/edit-category/${item._id}`)}
              >
                <FaEdit /> Edit
              </button>

              <button
                className="delete-btn"
                onClick={() => handleDelete(item._id)}
              >
                <FaTrash /> Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

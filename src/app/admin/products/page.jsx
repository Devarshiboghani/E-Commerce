"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts, deleteProduct } from "@/redux/actions/productAction";
import { useRouter } from "next/navigation";
import { FaArrowLeft, FaEdit, FaTrash } from "react-icons/fa";
import FilterSort from "@/Components/FilterSort/FilterSort";
import Pagination from "@/Components/Pagination/Pagination";
import { getCategories } from "@/redux/actions/categoryAction";
import "./products.css";

const ITEMS_PER_PAGE = 8;

export default function ProductsPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { products, loading } = useSelector((state) => state.productStore);
  const { search } = useSelector((state) => state.searchStore);
  const { categories } = useSelector((state) => state.categoryStore);

  // const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [sortValue, setSortValue] = useState("az");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const filteredProducts = useMemo(() => {
    let data = [...products];

    // Header Search
  if (search.trim() !== "") {
    const keyword = search.toLowerCase();

    data = data.filter(
      (item) =>
        item.title?.toLowerCase().includes(keyword) ||
        item.description?.toLowerCase().includes(keyword) ||
        item.category?.toLowerCase().includes(keyword)
    );
  }

    // Filter
    if (filterValue !== "All") {
      data = data.filter((item) => item.category === filterValue);
    }

    // Sort
    switch (sortValue) {
      case "az":
        data.sort((a, b) => a.category.localeCompare(b.category));
        break;

      case "za":
        data.sort((a, b) => b.category.localeCompare(a.category));
        break;

      case "newest":
        data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;

      case "oldest":
        data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        break;
    }

    return data;
  }, [products, search, filterValue, sortValue]);

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const start = (currentPage - 1) * ITEMS_PER_PAGE;

  const pageData = filteredProducts.slice(start, start + ITEMS_PER_PAGE);

  const handleDelete = (id) => {
    if (window.confirm("Delete Product?")) {
      dispatch(deleteProduct(id));
    }
  };

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <section className="admin-product-page">
      <div className="admin-header">
        <button
          className="back-btn"
          onClick={() => router.push("/admin/dashboard")}
        >
          <FaArrowLeft />
          Back
        </button>

        <div className="page-title">
          <h2>Explore All Products</h2>

          <p>Manage all products easily.</p>
        </div>
      </div>

      <FilterSort
  //       search={search}
  // setSearch={() => {}}   
        showSearch={false}
        filterValue={filterValue}
        setFilterValue={setFilterValue}
        sortValue={sortValue}
        setSortValue={setSortValue}
        categories={categories}
      />

      <div className="product-grid">
        {pageData.map((item) => (
          <div className="product-card" key={item._id}>
          <div className="product-image-box">
            <img src={item.images?.[0]} alt={item.title} />
          </div>

            <div className="product-content">

  <h5 className="product-title">
    {item.title}
  </h5>

  <h4 className="product-price">
    ₹{item.price}
  </h4>

  <div className="rating-box">
    ⭐⭐⭐⭐⭐
    <span>({item.rating})</span>
  </div>

  <div className="product-actions">

            <button
      className="edit-btn"
      onClick={() =>
        router.push(`/admin/edit-product/${item._id}`)
      }
    >
      <FaEdit />
      Edit
    </button>

    <button
      className="delete-btn"
      onClick={() => handleDelete(item._id)}
    >
      <FaTrash />
      Delete
    </button>

  </div>

</div>
</div>
        ))} 
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

"use client";

import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/redux/actions/productAction";
import { getCategories } from "@/redux/actions/categoryAction";
import FilterSort from "@/Components/FilterSort/FilterSort";
import ProductCard from "@/Components/ProductCard/ProductCard";
import Pagination from "@/Components/Pagination/Pagination";
import "./products.css";

const ITEMS_PER_PAGE = 9;

export default function ProductsPage() {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.productStore);
  const { categories = [] } = useSelector((state) => state.categoryStore);
  const { search } = useSelector((state) => state.searchStore);

  // const [search, setSearch] = useState("");
  const [filterValue, setFilterValue] = useState("All");
  const [sortValue, setSortValue] = useState("newest");
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

    if (filterValue !== "All") {
      data = data.filter((item) => item.category === filterValue);
    }

    data.sort((a, b) => {
      if (sortValue === "az") return a.title.localeCompare(b.title);
      if (sortValue === "za") return b.title.localeCompare(a.title);
      if (sortValue === "oldest") return new Date(a.createdAt) - new Date(b.createdAt);
      return new Date(b.createdAt) - new Date(a.createdAt);
    });

    return data;
  }, [products, search, filterValue, sortValue]);

  const totalPages = Math.max(1, Math.ceil(filteredProducts.length / ITEMS_PER_PAGE));
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, filterValue, sortValue]);

  return (
    <section className="products-page">
      <div className="products-hero">
        <h1>Explore All Products</h1>
        <p>Find the best premium products curated just for you.</p>
      </div>

      {/* <div className="products-controls"> */}
        {/* <div className="products-search">
          <input
            type="text"
            placeholder="Search products or categories"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div> */}

        <FilterSort
          // search={search}
          // setSearch={setSearch}
          filterValue={filterValue}
          setFilterValue={setFilterValue}
          sortValue={sortValue}
          setSortValue={setSortValue}
          categories={categories}
        />
      {/* </div> */}

      {isLoading ? (
        <div className="products-empty">Loading products...</div>
      ) : (
        <>
          <div className="products-grid">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((item) => <ProductCard key={item._id} item={item} />)
            ) : (
              <div className="products-empty">No products found.</div>
            )}
          </div>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </section>
  ); 
}

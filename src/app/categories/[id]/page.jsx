// File Name: src/app/categories/[id]/page.jsx
"use client";

import { useEffect, useMemo } from "react";
import { useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllProducts } from "@/redux/actions/productAction";
import { getCategories } from "@/redux/actions/categoryAction";
import "./category-products.css";

export default function CategoryProductsPage() {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { products, isLoading } = useSelector((state) => state.productStore);
  const { categories = [] } = useSelector((state) => state.categoryStore);

  useEffect(() => {
    dispatch(fetchAllProducts());
    dispatch(getCategories());
  }, [dispatch]);

  const currentCategory = useMemo(() => {
    return categories.find(
      (cat) => cat._id === id || cat.categoryName?.toLowerCase() === id?.toLowerCase()
    );
  }, [categories, id]);

  const filteredProducts = useMemo(() => {
    if (!currentCategory) return [];

    const selectedCategory = currentCategory.categoryName?.trim().toLowerCase();

    return products.filter((product) => {
      const productCategory = `${product.category || ""}`.trim().toLowerCase();
      return (
        productCategory === selectedCategory ||
        product.categoryId === currentCategory._id ||
        product.category === currentCategory._id
      );
    });
  }, [products, currentCategory]);

  if (isLoading) {
    return <div className="loader-container"><h2>Loading Products...</h2></div>;
  }

  return (
    <div className="products-page-container">
      <div className="page-header">
        <h1>{currentCategory ? currentCategory.categoryName : "Category Products"}</h1>
        <p>Showing {filteredProducts.length} items found</p>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="no-products text-center">
          <h3>No products found in this category yet.</h3>
        </div>
      ) : (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-img-box">
                <img
                  src={product.images?.[0] || product.image || product.productImage}
                  alt={product.title || product.productName || product.name}
                />
              </div>
              <div className="product-details">
                <h4>{product.title || product.productName || product.name}</h4>
                <p className="price">₹{product.price}</p>
                <button className="add-to-cart-btn">Add To Cart</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
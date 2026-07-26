"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getCategories } from "@/redux/actions/categoryAction";
import { fetchAllProducts } from "@/redux/actions/productAction"; 
import Link from "next/link";
import {
  FaLayerGroup,
  FaPlus,
  FaBoxOpen,
  FaFolderPlus,
  FaUsers,
  FaArrowLeft,
  FaBagShopping,
} from "react-icons/fa6";
import "./admin-dashboard.css";

export default function AdminDashboard() {
  const dispatch = useDispatch();
  const router = useRouter();
  
  // States from Redux
  const { user, loading: authLoading } = useSelector((state) => state.authStore);
  const { categories } = useSelector((state) => state.categoryStore);
  const { products } = useSelector((state) => state.productStore);

  // Security Gate: Protect Dashboard
  useEffect(() => {
    if (!authLoading) {
      if (!user || user.role !== "admin") {
        alert("Access Denied: Admins Only!");
        router.push("/");
      }
    }
  }, [user, authLoading, router]);

  // Fetch data for stats dashboard
  useEffect(() => {
    if (user && user.role === "admin") {
      dispatch(getCategories());
      dispatch(fetchAllProducts());
    }
  }, [dispatch, user]);

  if (authLoading) {
    return <div className="admin-loading">Checking Admin Authorization...</div>;
  }

  if (!user || user.role !== "admin") return null;

  return (
    <div className="admin-dashboard-layout">
      
      {/* 1. SIDEBAR NAVIGATION */}
      <aside className="admin-sidebar">
        <div className="sidebar-brand">
          <h2>Zest<span>Admin</span></h2>
        </div>
        <nav className="sidebar-menu">
          <Link href="/admin/dashboard" className="menu-item active">
            <FaLayerGroup /> Dashboard Overview
          </Link>
          <Link href="/admin/add-category" className="menu-item">
            <FaFolderPlus /> Add Category
          </Link>
          <Link href="/admin/add-product" className="menu-item">
            <FaPlus /> Add Product
          </Link>
          <Link href="/admin/categories" className="menu-item">
            <FaBoxOpen /> View All Categories
          </Link>
          <Link href="/admin/products" className="menu-item">
            <FaBagShopping /> View All Products
          </Link>
        </nav>
        <div className="sidebar-footer">
          <Link href="/" className="back-btn">
            <FaArrowLeft /> Back to Website
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="admin-main-content">
        <header className="admin-header1">
          <div className="welcome-text">
            <h1>Welcome Back, {user.name || "Admin"} 👋</h1>
            <p>Here is what's happening with ZestCart today.</p>
          </div>
          <div className="admin-profile">
            <div className="avatar">A</div>
            <span>Admin Panel</span>
          </div>
        </header>

        {/* 3. STATS WIDGET CARDS */}
        <section className="dashboard-stats-grid">
          <div className="stat-card category-card-stat">
            <div className="stat-icon"><FaLayerGroup /></div>
            <div className="stat-info">
              <h3>{categories?.length || 0}</h3>
              <p>Total Categories</p>
            </div>
          </div>

          <div className="stat-card product-card-stat">
            <div className="stat-icon"><FaBoxOpen /></div>
            <div className="stat-info">
              <h3>{products?.length || 0}</h3>
              <p>Total Products</p>
            </div>
          </div>

          <div className="stat-card user-card-stat">
            <div className="stat-icon"><FaUsers /></div>
            <div className="stat-info">
              <h3>Active</h3>
              <p>Admin Status</p>
            </div>
          </div>
        </section>

        {/* 4. QUICK ACTIONS SECTION */}
        <section className="quick-actions-section">
          <h2>Quick Actions</h2>
          <div className="actions-btn-group">
            <button onClick={() => router.push("/admin/add-category")} className="action-tile green-tile">
              <FaFolderPlus className="tile-icon" />
              <span>Create Dynamic Category</span>
            </button>
            <button onClick={() => router.push("/admin/add-product")} className="action-tile slate-tile">
              <FaPlus className="tile-icon" />
              <span>Launch New Product</span>
            </button>
          </div>
        </section>

      </main>
    </div>
  );
}
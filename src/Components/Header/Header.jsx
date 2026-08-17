"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container, Image, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getProfile, logout } from "@/redux/slices/authSlice";
import { setSearch } from "@/redux/slices/searchSlice";
import { useRouter } from "next/navigation";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { MdOutlineDashboardCustomize } from "react-icons/md"; // Ek professional dashboard icon
import { getWishlist } from "@/redux/actions/wishlistAction";
import { getCart } from "@/redux/actions/cartAction";
import "./Header.css";

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.authStore);
  const { search } = useSelector((state) => state.searchStore);
  const { wishlist } = useSelector((state) => state.wishlistStore);
  const { cart } = useSelector((state) => state.cartStore);

  // const [search, setSearch] = useState("");

  useEffect(() => {
    dispatch(getProfile());
  }, []);

  useEffect(() => {
    if (user?._id) {
      dispatch(getWishlist(user._id));
      dispatch(getCart(user._id));
    }
  }, [dispatch, user]);

  const handleLogout = () => {
    dispatch(logout());
    router.push("/signin");
  };

  return (
    <Navbar expand="lg" className="custom-navbar fixed-top">
      <Container className="header-container">
        <Navbar.Brand as={Link} href="/" className="logo">
          ZestCart
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="navbar-nav" />

        <Navbar.Collapse id="navbar-nav">
          {/* Center Links */}
          <Nav className="nav-center">
            <Nav.Link as={Link} href="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} href="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} href="/categories">
              Categories
            </Nav.Link>
            <Nav.Link as={Link} href="/contact">
              Contact
            </Nav.Link>
          </Nav>

          {/* Right Side */}
          <div className="nav-right">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => dispatch(setSearch(e.target.value))}
              />
            </div>

            <Link href="/wishlist" className="icon-btn wishlist-icon">
              <FiHeart />

              {wishlist.length > 0 && (
                <span className="wishlist-count">{wishlist.length}</span>
              )}
            </Link>

            <Link href="/cart" className="icon-btn cart-icon-wrapper">
              <FiShoppingCart />
              {cart?.products?.length > 0 && (
                <span className="cart-count">{cart.products.reduce((acc, item) => acc + item.quantity, 0)}</span>
              )}
            </Link>

            {user ? (
              <NavDropdown
                title={
                  <Image
                    src={user?.profileImage || "/user.png"}
                    roundedCircle
                    width={42}
                    height={42}
                    alt="Profile"
                  />
                }
                align="end"
              >
                {/* ⭐ AUTOMATIC ADMIN CHECK: Agar admin hai toh drop-down me dashboard dikhega ⭐ */}
                {user?.role === "admin" && (
                  <>
                    <NavDropdown.Item
                      as={Link}
                      href="/admin/dashboard"
                      className="admin-dropdown-item"
                    >
                      <MdOutlineDashboardCustomize
                        style={{ marginRight: "8px", fontSize: "18px" }}
                      />
                      Admin Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                  </>
                )}

                <NavDropdown.Item as={Link} href="/profile">
                  My Profile
                </NavDropdown.Item>

                <NavDropdown.Item as={Link} href="/orders">
                  Orders
                </NavDropdown.Item>

                <NavDropdown.Divider />

                <NavDropdown.Item
                  className="text-danger"
                  onClick={handleLogout}
                >
                  Logout
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <Link href="/signin" className="signin-btn">
                Sign In
              </Link>
            )}
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;

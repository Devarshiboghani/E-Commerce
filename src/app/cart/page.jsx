"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { getCart, updateCartItem } from "@/redux/actions/cartAction";
import CartCard from "@/Components/CartCard/CartCard";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FiShoppingBag, FiArrowRight } from "react-icons/fi";
import Link from "next/link";
import "./cart.css";

export default function CartPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { user } = useSelector((state) => state.authStore);
  const { cart, isLoading } = useSelector((state) => state.cartStore);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (user?._id) {
        dispatch(getCart(user._id));
      } else {
        router.push("/signin");
      }
    }
  }, [isMounted, dispatch, user, router]);

  if (!isMounted) {
    return null;
  }

  const handleUpdateQuantity = (productId, action) => {
    if (!user) return;
    dispatch(updateCartItem({ userId: user._id, productId, action }));
  };

  const calculateTotal = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce((acc, item) => {
      return acc + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const calculateItems = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce((acc, item) => acc + item.quantity, 0);
  };

  const totalAmount = calculateTotal();
  const shipping = totalAmount > 0 ? 50 : 0;
  const finalAmount = totalAmount + shipping;

  if (isLoading && !cart?.products?.length) {
    return (
      <Container className="cart-loading">
        <h2>Loading your cart...</h2>
      </Container>
    );
  }

  return (
    <section className="cart-page">
      <Container>
        <div className="cart-header">
          <h1>
            <FiShoppingBag className="cart-icon" /> Your Shopping Cart
          </h1>
          <p>Review your items before proceeding to checkout</p>
        </div>

        {!cart?.products || cart.products.length === 0 ? (
          <div className="empty-cart">
            <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-7359557-6024626.png" alt="Empty Cart" />
            <h2>Your cart is currently empty!</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Link href="/products" className="btn btn-primary shop-now-btn">
              Explore Products
            </Link>
          </div>
        ) : (
          <Row>
            <Col lg={8} className="cart-items-section">
              <div className="cart-list">
                {cart.products.map((item) => (
                  <CartCard 
                    key={item.product?._id || Math.random()} 
                    item={item} 
                    onUpdateQuantity={handleUpdateQuantity} 
                  />
                ))}
              </div>
            </Col>

            <Col lg={4}>
              <div className="order-summary-card">
                <h3>Order Summary</h3>
                <div className="summary-row">
                  <span>Items ({calculateItems()}):</span>
                  <span>₹{totalAmount.toFixed(2)}</span>
                </div>
                <div className="summary-row">
                  <span>Shipping:</span>
                  <span>₹{shipping.toFixed(2)}</span>
                </div>
                <hr className="summary-divider" />
                <div className="summary-row total">
                  <span>Total:</span>
                  <span>₹{finalAmount.toFixed(2)}</span>
                </div>

                <Button 
                  className="checkout-btn w-100 mt-4"
                  onClick={() => router.push("/checkout")}
                >
                  Proceed to Checkout <FiArrowRight className="ms-2" />
                </Button>
                
                <div className="secure-checkout mt-3 text-center text-muted">
                  <small>🔒 Secure Checkout Guaranteed</small>
                </div>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </section>
  );
}
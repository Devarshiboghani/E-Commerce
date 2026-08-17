"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { Container, Badge, Spinner } from "react-bootstrap";
import { FiPackage, FiCheckCircle } from "react-icons/fi";
import axios from "axios";
import "./orders.css";

export default function OrdersPage() {
  const router = useRouter();
  const { user } = useSelector((state) => state.authStore);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/signin");
      return;
    }

    const fetchOrders = async () => {
      try {
        const { data } = await axios.get(`/api/user-orders/${user._id}`);
        setOrders(data);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [user, router]);

  if (loading) {
    return (
      <Container className="orders-loading">
        <Spinner animation="border" variant="success" />
        <h3 className="mt-3">Loading your orders...</h3>
      </Container>
    );
  }

  return (
    <section className="orders-page">
      <Container>
        <div className="orders-header">
          <h1>
            <FiPackage className="orders-icon" /> My Orders
          </h1>
          <p>View your complete order history and track recent purchases.</p>
        </div>

        {orders.length === 0 ? (
          <div className="empty-orders">
            <h2>You haven't placed any orders yet!</h2>
            <p>Once you make a purchase, your orders will appear here.</p>
            <button className="btn btn-success mt-3" onClick={() => router.push("/products")}>
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="orders-list">
            {orders.map((order) => (
              <div key={order._id} className="order-card">
                <div className="order-card-header">
                  <div>
                    <span className="order-id">Order #{order._id.substring(order._id.length - 8).toUpperCase()}</span>
                    <span className="order-date">
                      Placed on {new Date(order.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="order-status">
                    <Badge bg="success" className="d-flex align-items-center gap-1">
                      <FiCheckCircle /> Paid
                    </Badge>
                  </div>
                </div>

                <div className="order-products">
                  {order.products.map((item, idx) => (
                    <div key={idx} className="order-product-item">
                      <div className="order-product-info">
                        <img 
                          src={item.product?.images?.[0] || item.product?.image || "/placeholder.png"} 
                          alt={item.product?.title || "Product"} 
                        />
                        <div className="order-product-details">
                          <h5>{item.product?.title || "Product unavailable"}</h5>
                          <span className="order-product-qty">Qty: {item.quantity}</span>
                        </div>
                      </div>
                      <div className="order-product-price">
                        ₹{((item.product?.price || 0) * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="order-card-footer">
                  <div className="shipping-info">
                    <strong>Shipped To:</strong> {order.shippingAddress?.fullName}, {order.shippingAddress?.city}
                  </div>
                  <div className="order-total">
                    <span>Total Amount:</span>
                    <h2>₹{order.totalPrice.toFixed(2)}</h2>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}

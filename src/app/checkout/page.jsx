"use client"; // Triggering HMR

import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import axios from "axios";
import { getCart } from "@/redux/actions/cartAction";
import "./checkout.css";

export default function CheckoutPage() {
  const router = useRouter();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.authStore);
  const { cart } = useSelector((state) => state.cartStore);

  const [shippingAddress, setShippingAddress] = useState({
    fullName: "",
    address: "",
    city: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const [loadingPayment, setLoadingPayment] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      if (!user) {
        router.push("/signin");
      } else if (!cart?.products || cart.products.length === 0) {
        router.push("/cart");
      }
    }
  }, [isMounted, user, cart, router]);

  if (!isMounted) {
    return null; // Prevents hydration mismatch by not rendering on the server
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    if (!cart?.products) return 0;
    return cart.products.reduce((acc, item) => {
      return acc + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const itemsPrice = calculateTotal();
  const shippingPrice = itemsPrice > 0 ? 50 : 0;
  const totalPrice = itemsPrice + shippingPrice;

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoadingPayment(true);

    try {
      if (!window.Razorpay) {
        alert("Payment gateway is still loading. Please check your internet connection or wait a second and try again.");
        setLoadingPayment(false);
        return;
      }

      // 1. Create order on backend
      const { data: order } = await axios.post("/api/orders", {
        amount: totalPrice,
      });

      // 2. Initialize Razorpay Checkout
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_replace_me", // Pass Key ID directly to frontend if possible
        amount: order.amount,
        currency: order.currency,
        name: "ZestCart",
        description: "Premium E-Commerce Checkout",
        order_id: order.id,
        handler: async function (response) {
          try {
            // 3. Verify Payment Signature on backend
            const verifyRes = await axios.post("/api/verify-payment", {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              userId: user._id,
              shippingAddress,
              cartItems: cart.products,
              itemsPrice,
              shippingPrice,
              totalPrice,
            });

            if (verifyRes.status === 200) {
              dispatch(getCart(user._id)); // Refresh cart
              router.push("/success");
            }
          } catch (verifyError) {
            alert("Payment verification failed! " + (verifyError.response?.data?.message || verifyError.message));
            console.error(verifyError);
          }
        },
        prefill: {
          name: shippingAddress.fullName,
          email: user?.email,
          contact: shippingAddress.phone,
        },
        theme: {
          color: "#10b981",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error(error);
      alert("Payment Error: " + (error.response?.data?.message || error.message || "Something went wrong"));
    } finally {
      setLoadingPayment(false);
    }
  };

  return (
    <section className="checkout-page">
      <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      <Container>
        <div className="checkout-header">
          <h1>Secure Checkout</h1>
          <p>Please enter your shipping details and proceed to payment.</p>
        </div>

        <Row>
          <Col lg={7}>
            <div className="checkout-form-container">
              <h3>Shipping Address</h3>
              <Form onSubmit={handlePayment}>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="fullName"
                    value={shippingAddress.fullName}
                    onChange={handleInputChange}
                    required
                    placeholder="John Doe"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="tel"
                    name="phone"
                    value={shippingAddress.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="9876543210"
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="address"
                    value={shippingAddress.address}
                    onChange={handleInputChange}
                    required
                    placeholder="123 Main St, Apartment 4B"
                  />
                </Form.Group>

                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>City</Form.Label>
                      <Form.Control
                        type="text"
                        name="city"
                        value={shippingAddress.city}
                        onChange={handleInputChange}
                        required
                        placeholder="Mumbai"
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Postal Code</Form.Label>
                      <Form.Control
                        type="text"
                        name="postalCode"
                        value={shippingAddress.postalCode}
                        onChange={handleInputChange}
                        required
                        placeholder="400001"
                      />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    name="country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    required
                    placeholder="India"
                  />
                </Form.Group>

                <Button 
                  type="submit" 
                  className="pay-btn w-100" 
                  disabled={loadingPayment}
                >
                  {loadingPayment ? "Processing..." : `Pay ₹${totalPrice.toFixed(2)} with Razorpay`}
                </Button>
              </Form>
            </div>
          </Col>

          <Col lg={5}>
            <div className="checkout-summary-container">
              <h3>Order Summary</h3>
              <div className="checkout-items">
                {cart?.products?.map((item) => (
                  <div key={item.product?._id} className="checkout-item-row">
                    <div className="checkout-item-info">
                      <span className="checkout-item-qty">{item.quantity}x</span>
                      <span className="checkout-item-title">{item.product?.title}</span>
                    </div>
                    <span className="checkout-item-price">
                      ₹{(item.product?.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
              <hr />
              <div className="checkout-summary-row">
                <span>Subtotal</span>
                <span>₹{itemsPrice.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row">
                <span>Shipping</span>
                <span>₹{shippingPrice.toFixed(2)}</span>
              </div>
              <div className="checkout-summary-row checkout-total">
                <span>Total to Pay</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

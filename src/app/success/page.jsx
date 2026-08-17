"use client";

import Link from "next/link";
import { Container, Button } from "react-bootstrap";
import { FiCheckCircle } from "react-icons/fi";
import "./success.css";

export default function SuccessPage() {
  return (
    <section className="success-page">
      <Container className="text-center">
        <div className="success-card">
          <FiCheckCircle className="success-icon" />
          <h1>Payment Successful!</h1>
          <p>Thank you for your purchase. Your order has been placed successfully and will be processed shortly.</p>
          
          <div className="success-actions">
            <Link href="/profile">
              <Button className="btn-primary-custom me-3">View Order History</Button>
            </Link>
            <Link href="/products">
              <Button variant="outline-dark">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

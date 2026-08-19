"use client";
import "./Newsletter.css";
import { FiMail } from "react-icons/fi";

const Newsletter = () => {
  return (
    <section className="newsletter-section">
      <div className="newsletter-container">
        <div className="newsletter-content">
          <h2>Join the ZestCart Family</h2>
          <p>
            Subscribe to our newsletter and get <strong>10% off</strong> your first purchase. 
            Stay updated with our latest collections and exclusive offers!
          </p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <div className="input-wrapper">
              <FiMail className="mail-icon" />
              <input type="email" placeholder="Enter your email address" required />
            </div>
            <button type="submit" className="subscribe-btn">Subscribe</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;

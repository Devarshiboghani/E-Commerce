"use client";

import React from "react";
import "./Footer.css";
import { 
  FaFacebookF, 
  FaTwitter, 
  FaInstagram, 
  FaLinkedinIn, 
  FaEnvelope, 
  FaPhoneAlt, 
  FaMapMarkerAlt 
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Column 1: Brand & About */}
        <div className="footer-col brand-col">
          <h3 className="footer-logo">Zest<span>Cart</span></h3>
          <p className="brand-desc">
            Upgrade your lifestyle with our premium and curated collection. Experience fast delivery, secure payments, and 100% original products.
          </p>
          <div className="social-links">
            <a href="#" aria-label="Facebook"><FaFacebookF /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
            <a href="#" aria-label="Instagram"><FaInstagram /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedinIn /></a>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Categories</a></li>
            <li><a href="#">Featured Products</a></li>
            <li><a href="#">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 3: Customer Support */}
        <div className="footer-col">
          <h4>Customer Care</h4>
          <ul>
            <li><a href="#">My Account</a></li>
            <li><a href="#">Track Order</a></li>
            <li><a href="#">Return & Refunds</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms & Conditions</a></li>
          </ul>
        </div>

        {/* Column 4: Newsletter Subscription */}
        <div className="footer-col newsletter-col">
          <h4>Stay Updated</h4>
          <p>Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
          <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input type="email" placeholder="Your email address" required />
            <button type="submit">Subscribe</button>
          </form>
          <div className="contact-info">
            <p><FaPhoneAlt /> +1 (234) 567-890</p>
            <p><FaEnvelope /> support@zestcart.com</p>
          </div>
        </div>

      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ZestCart. All rights reserved.</p>
        <div className="payment-methods">
          {/* Aap yahan payment partner icons lagane ke bajaye plain text ya placeholder images use kar sakte hain */}
          <span>Visa</span>
          <span>Mastercard</span>
          <span>UPI</span>
          <span>PayPal</span>
        </div>
      </div>
    </footer>
  );
}
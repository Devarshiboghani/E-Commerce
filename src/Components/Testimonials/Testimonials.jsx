"use client";

import "./Testimonials.css";
import { FaStar } from "react-icons/fa";

const testimonials = [
  {
    id: 1,
    name: "Jerome Bell",
    role: "Founder of Uranus",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    review:
      "ZestCart's attention to detail and creative approach made our shopping experience outstanding.",
  },
  {
    id: 2,
    name: "Kathryn Murphy",
    role: "CEO of Coca Soft",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    review:
      "Their products are reliable and premium quality. Delivery was super fast and customer support was amazing.",
  },
  {
    id: 3,
    name: "Kristin Watson",
    role: "Founder of Neptune",
    image: "https://randomuser.me/api/portraits/men/76.jpg",
    review:
      "Excellent shopping experience. Genuine products, secure payments and easy returns. Highly recommended.",
  },
];

export default function Testimonials() {
  return (
    <section className="testimonial-section">
      <span className="sub-title">TESTIMONIALS</span>

      <h2>
        What Our Customers
        <br />
        Say About <span>ZestCart</span>
      </h2>

      <div className="testimonial-grid">
        {testimonials.map((item) => (
          <div className="testimonial-card" key={item.id}>
            <div className="user">
              <img src={item.image} alt={item.name} />

              <div>
                <h4>{item.name}</h4>
                <span>{item.role}</span>
              </div>
            </div>

            <p>{item.review}</p>

            <div className="stars">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

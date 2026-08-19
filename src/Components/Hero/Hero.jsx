"use client";

import "./Hero.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import { FaShieldAlt, FaTruck, FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

const HeroSection = () => {
  const router = useRouter();
  return (
    <section className="hero-section">
      {/* <Container fluid> */}

        <div
          className="hero-banner"
          style={{
            backgroundImage: `url("/images/bg.png")`,
          }}
        >
          <div className="hero-overlay"></div>

          <Row className="h-100 align-items-center hero-row">

            <Col lg={6} md={7} className="hero-content">

              <span className="hero-subtitle">
                Best Deals on Top Brands
              </span>

              <h1>
                Upgrade Your Lifestyle
                <br />
                With <span>ZestCart</span>
              </h1>

              <p>
                Explore a wide range of products
                <br />
                at unbeatable prices
              </p>

              <div className="hero-btns">
                <Button className="shop-btn" onClick={() => router.push('/products')}>
                  Shop Now →
                </Button>

                <Button
                  variant="outline-success"
                  className="explore-btn"
                  onClick={() => router.push('/categories')}
                >
                  Explore Deals
                </Button>
              </div>

              <div className="hero-features">

                <div>
                  <FaCheckCircle />
                  <span>100% Original Products</span>
                </div>

                <div>
                  <FaShieldAlt />
                  <span>Secure Payments</span>
                </div>

                <div>
                  <FaTruck />
                  <span>Easy Returns</span>
                </div>

              </div>

            </Col>

          </Row>
        </div>

      {/* </Container> */}
    </section>
  );
};

export default HeroSection;
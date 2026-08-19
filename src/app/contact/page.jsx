"use client";

import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FiMapPin, FiPhone, FiMail, FiSend } from "react-icons/fi";
import "./contact.css";

const ContactPage = () => {
  return (
    <div className="contact-page">
      {/* Header Section */}
      <div className="contact-header">
        <Container>
          <h1>Get in Touch</h1>
          <p>We'd love to hear from you. Our friendly team is always here to chat.</p>
        </Container>
      </div>

      <Container className="contact-container">
        <Row className="g-5">
          {/* Contact Information */}
          <Col lg={5}>
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <p className="subtitle">
                Fill up the form and our Team will get back to you within 24 hours.
              </p>

              <div className="info-list">
                <div className="info-item">
                  <div className="icon-box">
                    <FiPhone />
                  </div>
                  <div>
                    <h5>Phone</h5>
                    <p>+91 98765 43210</p>
                    <p>+91 12345 67890</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-box">
                    <FiMail />
                  </div>
                  <div>
                    <h5>Email</h5>
                    <p>support@zestcart.com</p>
                    <p>sales@zestcart.com</p>
                  </div>
                </div>

                <div className="info-item">
                  <div className="icon-box">
                    <FiMapPin />
                  </div>
                  <div>
                    <h5>Headquarters</h5>
                    <p>123 ZestCart Tower, Tech Park</p>
                    <p>Mumbai, Maharashtra 400001, India</p>
                  </div>
                </div>
              </div>
            </div>
          </Col>

          {/* Contact Form */}
          <Col lg={7}>
            <div className="contact-form-card">
              <h3>Send us a Message</h3>
              <Form onSubmit={(e) => e.preventDefault()}>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>First Name</Form.Label>
                      <Form.Control type="text" placeholder="John" required />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-4">
                      <Form.Label>Last Name</Form.Label>
                      <Form.Control type="text" placeholder="Doe" required />
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-4">
                  <Form.Label>Email Address</Form.Label>
                  <Form.Control type="email" placeholder="john@example.com" required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Subject</Form.Label>
                  <Form.Control type="text" placeholder="How can we help?" required />
                </Form.Group>

                <Form.Group className="mb-4">
                  <Form.Label>Message</Form.Label>
                  <Form.Control as="textarea" rows={5} placeholder="Write your message here..." required />
                </Form.Group>

                <Button type="submit" className="contact-submit-btn">
                  <FiSend className="me-2" />
                  Send Message
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ContactPage;

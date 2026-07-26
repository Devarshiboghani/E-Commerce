"use client";

import { signIn } from "@/redux/actions/authAction";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { FiMail, FiLock } from "react-icons/fi";
import "./signIn.css";

const SignIn = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const { isLoading, isError, user } = useSelector((state) => state.authStore);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChanged = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn(formData));
  };

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  if (isLoading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <section className="signin-page">
      <Container>
        <Row className="justify-content-center align-items-center min-vh-100">
          {/* Left */}

          <Col lg={5} md={8} className="d-none d-lg-block left-section">
            <div className="signin-left">
              <h1>Welcome Back 👋</h1>

              <p>
                Discover thousands of premium products at the best prices with
                <span> ZestCart</span>.
              </p>

              <img
                src="https://png.pngtree.com/png-clipart/20250501/original/pngtree-a-visually-striking-illustration-of-three-sleek-shopping-bags-positioned-side-png-image_20914165.png"
                className="login-image"
                // className="img-fluid"
                alt=""
              />
            </div>
          </Col>

          {/* Right */}

          <Col lg={5} md={8}>
            <Card className="signin-card">
              <h2>Login</h2>

              <p className="text-muted mb-4">Enter your credentials</p>

              {isError && <div className="alert alert-danger">{isError}</div>}

              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <label>Email</label>

                  <div className="input-box">
                    <FiMail />

                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter Email"
                      value={formData.email}
                      onChange={handleChanged}
                    />
                  </div>
                </Form.Group>

                <Form.Group className="mb-3">
                  <label>Password</label>

                  <div className="input-box">
                    <FiLock />

                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter Password"
                      value={formData.password}
                      onChange={handleChanged}
                    />
                  </div>
                </Form.Group>

                <div className="d-flex justify-content-between mb-4">
                  <Form.Check type="checkbox" label="Remember Me" />

                  <Link href="#">Forgot Password?</Link>
                </div>

                <Button type="submit" className="login-btn w-100">
                  Sign In
                </Button>

                <div className="text-center mt-4">
                  Don't have an account?
                  <Link href="/signup"> Sign Up</Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default SignIn;

"use client";

import { signUp } from "@/redux/actions/authAction";
import { imageUpload } from "@/services/uploadImage";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./signUp.css";

const SignUp = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isLoading, isError, isCreate } = useSelector(
    (state) => state.authStore,
  );
  
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    mobileNo: "",
    gender: "",
    profileImage: "",
  });
  const [uploading, setUploading] = useState(false);

  const handleChanged = async (e) => {
    const { name, value, type } = e.target;

    if (type === "file") {
      if (!e.target.files[0]) return;
      setUploading(true);
      try {
        const imagePath = await imageUpload(e.target.files[0]);
        setFormData((prev) => ({
          ...prev,
          profileImage: imagePath,
        }));
      } catch (error) {
        console.error("Image upload failed:", error);
      }
      setUploading(false);
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(signUp(formData));
  };

  useEffect(() => {
    if (isCreate) router.push("/signin");
  }, [isCreate, router]);

  if (isLoading) {
    return <h2 className="text-center mt-5">Loading...</h2>;
  }

  return (
    <div className="signup-page">
      <div className="signup-left">
        <div className="left-content">
        <h1>
          Welcome Back 👋
        </h1>
       <p>
      Discover thousands of premium products at the best prices with <span>ZestCart</span>.
    </p>
        {/* <div className="left-content"> */}
        <img
          src="https://static.vecteezy.com/system/resources/thumbnails/059/913/291/small_2x/a-woman-in-green-dress-holding-shopping-bags-free-png.png"
          alt="signup"
          className="signup-image"
        />
      {/* </div> */}
      </div>
      </div>

      <div className="signup-right">
        <div className="signup-card">
          <h2>Create Account</h2>

          {isError && <p className="text-danger">{isError}</p>}

          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChanged}
                    placeholder="John"
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    name="lastname"
                    value={formData.lastname}
                    onChange={handleChanged}
                    placeholder="Doe"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChanged}
                placeholder="Enter Email"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChanged}
                placeholder="9876543210"
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChanged}
                placeholder="Enter Password"
                required
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="input-label">Gender</Form.Label>
              <div className="gender-group">
                <label
                  className={`gender-option ${
                    formData.gender === "Male" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={formData.gender === "Male"}
                    onChange={handleChanged}
                  />
                  <span className="custom-radio"></span>
                  Male
                </label>

                <label
                  className={`gender-option ${
                    formData.gender === "Female" ? "active" : ""
                  }`}
                >
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={formData.gender === "Female"}
                    onChange={handleChanged}
                  />
                  <span className="custom-radio"></span>
                  Female
                </label>
              </div>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className="input-label">Profile Photo</Form.Label>
              <Form.Control
                type="file"
                name="profileImage"
                onChange={handleChanged}
                className="custom-file"
                accept="image/*"
              />
            </Form.Group>

            <Button
              type="submit"
              className="signup-btn"
              disabled={uploading}
            >
              {uploading ? "Uploading..." : "Create Account"}
            </Button>

            <p className="login-link">
              Already have an account?
              <Link href="/signin">Login</Link>
            </p>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
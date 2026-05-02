import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaUser, FaEnvelope, FaPhone, FaLock } from "react-icons/fa";
import { useState } from "react";
import "../App.css";
import userAPI from "../api/userAPI";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Password does not match");
      return;
    }

    try {
      const response = await userAPI.post("/user/signup", formData);

      alert("User registered successfully");

      // form reset
      setFormData({
        name: "",
        email: "",
        mobile: "",
        password: "",
        confirmPassword: "",
      });

    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError("Registration failed or server not responding");
      }
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col sm={10} md={6} lg={4}>
          <Card className="login-card shadow-lg p-4 mt-5 mb-5">
            <h3 className="text-center fw-bold mb-2">Registration</h3>
            <p className="text-center text-muted mb-4">
              Create your account
            </p>

            <Form onSubmit={handleSubmit}>
              {/* Name */}
              <Form.Group className="mb-3">
                <Form.Label>Full Name</Form.Label>
                <div className="input-icon">
                  <FaUser />
                  <Form.Control
                    type="text"
                    placeholder="Enter full name"
                    name="name"
                    value={formData.name}
                    required
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              {/* Email */}
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <div className="input-icon">
                  <FaEnvelope />
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    required
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              {/* Mobile */}
              <Form.Group className="mb-3">
                <Form.Label>Mobile Number</Form.Label>
                <div className="input-icon">
                  <FaPhone />
                  <Form.Control
                    type="tel"
                    placeholder="Enter mobile number"
                    name="mobile"
                    value={formData.mobile}
                    required
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              {/* Password */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-icon">
                  <FaLock />
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    required
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              {/* Confirm Password */}
              <Form.Group className="mb-3">
                <Form.Label>Confirm Password</Form.Label>
                <div className="input-icon">
                  <FaLock />
                  <Form.Control
                    type="password"
                    placeholder="Confirm password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    required
                    onChange={handleChange}
                  />
                </div>
              </Form.Group>

              {error && (
                <p className="text-danger text-center">{error}</p>
              )}

              <Button type="submit" className="w-100 login-btn">
                Register
              </Button>

              <p className="text-center mt-3 mb-0">
                Already have an account?{" "}
                <a href="/login" className="fw-semibold">
                  Login
                </a>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

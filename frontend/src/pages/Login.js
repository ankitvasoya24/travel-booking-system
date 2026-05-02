import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";
import userAPI from "../api/userAPI";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await userAPI.post("/user/login", formData);
      const data = response.data;

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      setFormData({
        email: "",
        password: "",
      });

      navigate("/");

    } catch (err) {
      if (err.response) {
        if (err.response.status === 404) {
          setError("Please register before login");
        } else if (err.response.status === 401) {
          setError("Email or password is wrong");
        } else {
          setError(err.response.data.message || "Login failed");
        }
      } else {
        setError("Server not responding");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col sm={10} md={6} lg={4}>
          <Card className="login-card shadow-lg p-4">
            <h3 className="text-center fw-bold mb-2">Login</h3>
            <p className="text-center text-muted mb-4">
              Login to continue your journey ✈️
            </p>

            <Form onSubmit={handleSubmit}>
              {/* EMAIL */}
              <Form.Group className="mb-3">
                <Form.Label>Email Address</Form.Label>
                <div className="input-icon">
                  <FaUser />
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="input-icon">
                  <FaLock />
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                  />
                </div>
              </Form.Group>

              {error && (
                <p className="text-danger text-center">{error}</p>
              )}

              <Button
                type="submit"
                className="w-100 login-btn"
                disabled={loading}
              >
                {loading ? "Logging in..." : "Login"}
              </Button>

              <p className="text-center mt-3 mb-0">
                Don’t have an account?{" "}
                <a href="/register" className="fw-semibold">
                  Register
                </a>
              </p>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

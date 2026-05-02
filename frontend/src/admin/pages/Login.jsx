import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaUser, FaLock } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import adminAPI from "../../api/adminAPI";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      navigate("/admin/dashboard");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await adminAPI.post("/admin/adminlogin", {
        email,
        password,
      });

      if (res.data.token && res.data.admin) {
        localStorage.setItem("adminToken", res.data.token);
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/admin/dashboard");
      } else {
        alert("Invalid login response");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert(error.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container fluid className="login-page">
      <Row className="min-vh-100 justify-content-center align-items-center">
        <Col md={4}>
          <Card className="p-4 shadow-lg">
            <h3 className="text-center mb-4">Admin Login</h3>

            <Form onSubmit={handleLogin}>
              {/* EMAIL */}
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <FaUser />
                  <Form.Control
                    type="email"
                    placeholder="Your Email Address"
                    value={email}
                    autoComplete="email"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              {/* PASSWORD */}
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <div className="d-flex align-items-center gap-2">
                  <FaLock />
                  <Form.Control
                    type="password"
                    placeholder="Enter password"
                    value={password}
                    autoComplete="current-password"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </Form.Group>

              <Button type="submit" className="w-100" disabled={loading}>
                {loading ? "Logging in..." : "Login"}
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

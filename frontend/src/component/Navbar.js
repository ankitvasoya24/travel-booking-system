import { Navbar, Nav, Container,Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../image/image.png";
import { FaUser, FaSignOutAlt } from "react-icons/fa";

const MainNavbar = () => {

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token"); 
    navigate("/");
  };

  return (
    <Navbar bg="white" expand="lg" sticky="top" className="py-4 shadow-sm">
      <Container>

        <Navbar.Brand as={NavLink} to="/" className="d-flex align-items-center">
          <img src={logo} height="30" alt="GoTur Travel Logo" />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="main-navbar" />

        <Navbar.Collapse id="main-navbar">

          {/* Center Menu */}
          <Nav className="mx-auto fw-medium gap-lg-4 text-center mt-3 mt-lg-0">
            <Nav.Link as={NavLink} to="/">Home</Nav.Link>
            <Nav.Link as={NavLink} to="/destinations">Destinations</Nav.Link>
            <Nav.Link as={NavLink} to="/booking/hotels">Hotel</Nav.Link>
            <Nav.Link as={NavLink} to="/booking/flights">Flight</Nav.Link>
            <Nav.Link as={NavLink} to="/packages">Packages</Nav.Link>
            <Nav.Link as={NavLink} to="/about">About</Nav.Link>
            <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
          </Nav>

          {/* Right Section */}
          <Nav className="align-items-center gap-3 flex-column flex-lg-row mt-3 mt-lg-0">

            {!user ? (
              <Button
                as={NavLink}
                to="/login"
                className="d-flex align-items-center gap-2 px-4 py-2 login-rb-btn"
              >
                <FaUser />
                Login
              </Button>
            ) : (
              <Button
                variant="danger"
                onClick={handleLogout}
                className="d-flex align-items-center gap-2 px-4 py-2"
              >
                <FaSignOutAlt />
                Logout
              </Button>
            )}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MainNavbar;
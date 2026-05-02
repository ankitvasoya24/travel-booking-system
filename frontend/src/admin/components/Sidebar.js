import { NavLink } from "react-router-dom";
import { Offcanvas } from "react-bootstrap";
import {
  BsSpeedometer2,
  BsPeople,
  BsCalendarCheck,
  BsBuilding,
  BsAirplane,
  BsBoxSeam,
  BsGeoAlt,
  BsClipboardCheck,
  BsShieldLock,
  BsGear,
} from "react-icons/bs";
import "../admin.css";

const Sidebar = ({ show, handleClose }) => {
  const menuItems = [
    { path: "/admin/dashboard", label: "Dashboard", icon: <BsSpeedometer2 /> },
    { path: "/admin/users", label: "Users", icon: <BsPeople /> },
    { path: "/admin/bookings", label: "Bookings", icon: <BsCalendarCheck /> },
    { path: "/admin/hotels", label: "Hotels", icon: <BsBuilding /> },
    { path: "/admin/flights", label: "Flights", icon: <BsAirplane /> },
    { path: "/admin/packages", label: "Packages", icon: <BsBoxSeam /> },
    { path: "/admin/destinations", label: "Destinations", icon: <BsGeoAlt /> },
    {
      path: "/admin/destination-bookings",
      label: "Destination Bookings",
      icon: <BsClipboardCheck />,
    },
    { path: "/admin/adminusers", label: "Admin", icon: <BsShieldLock /> },
    { path: "/admin/settings", label: "Settings", icon: <BsGear /> },
  ];

  return (
    <Offcanvas
      show={show}
      onHide={handleClose}
      responsive="lg"
      className="custom-sidebar"
    >
      <Offcanvas.Header closeButton>
        <img src="/Logo.png" alt="Logo" width={110} />
      </Offcanvas.Header>

      <Offcanvas.Body className="p-2">
        <nav className="sidebar-menu">
          {menuItems.map((item, index) => (
            <NavLink
              key={index}
              to={item.path}
              onClick={handleClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? "active" : ""}`
              }
            >
              <span className="icon">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default Sidebar;

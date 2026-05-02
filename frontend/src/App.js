import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./index.css";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

/* USER PAGES */
import Home from "./pages/Home";
import Destinations from "./pages/Destination";
import Packages from "./pages/pacakges";
import Booking from "./pages/Booking";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Hotel from "./pages/Hotels";
import Flight from "./pages/Flights";
import Login from "./pages/Login";
import Register from "./pages/Registration";
import BookingSuccess from "./pages/BookingSuccess";

/* ADMIN PAGES */
import AdminLogin from "./admin/pages/Login";
import Dashboard from "./admin/pages/Dashboard";
import Bookings from "./admin/pages/Bookings";
import Users from "./admin/pages/Users";
import Hotels from "./admin/pages/Hotelmanagement";
import Flights from "./admin/pages/Flightmanagement";
import AdminPackages from "./admin/pages/Packagesmanagement";
import Settings from "./admin/pages/Settings";
import Admin from "./admin/pages/Admin";
import Destinationad from "./admin/pages/DestinationMan";

/* LAYOUTS & ROUTES */
import AdminLayout from "./admin/layouts/AdminLayout";
import LoginLayout from "./admin/layouts/LoginLayout";
import AdminRoute from "./admin/layouts/AdminRoute";
import UserLayout from "./layouts/UserLayout";
import UserRoute from "./layouts/UserRoute";

import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

import DestinationBook from "./pages/BookDestionation";
import DestinationBookings from "./admin/pages/Destination-Booking";

function App() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true,
    });
  }, []);

  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>

        {/* USER ROUTES */}
        <Route element={<UserLayout />}>
          {/* Public Pages */}
          <Route path="/" element={<Home />} />
          <Route path="/destinations" element={<Destinations />} />
          <Route path="destination/book/:id" element={<DestinationBook />} />
          <Route path="/packages" element={<Packages />} />
          <Route path="/booking/hotels" element={<Hotel />} />
          <Route path="/booking/flights" element={<Flight />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Pages */}
          <Route element={<UserRoute />}>
            {/* <Route path="destination/book/:id" element={<DestinationBook />} /> */}
            {/* <Route path="/booking/flights" element={<Flight />} /> */}
            <Route path="/booking/:type/:id" element={<Booking />} />
            <Route path="/booking-success" element={<BookingSuccess />} />
          </Route>
        </Route>

        {/* ADMIN ROUTES */}
        <Route element={<LoginLayout />}>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminLayout />
            </AdminRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<Users />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="packages" element={<AdminPackages />} />
          <Route path="destinations" element={<Destinationad />} />
          <Route
            path="destination-bookings"
            element={<DestinationBookings />}
          />
          <Route path="hotels" element={<Hotels />} />
          <Route path="flights" element={<Flights />} />
          <Route path="settings" element={<Settings />} />
          <Route path="adminusers" element={<Admin />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;

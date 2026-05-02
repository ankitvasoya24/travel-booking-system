import Navbar from "../component/Navbar";
import Footer from "../component/Footer";
import { Outlet } from "react-router-dom";

const UserLayout = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />         
      <main className="flex-grow-1">
        <Outlet />         
      </main>
      <Footer />           
    </div>
  );
};

export default UserLayout;
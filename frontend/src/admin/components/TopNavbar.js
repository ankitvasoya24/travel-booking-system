import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import { Button } from "react-bootstrap";
import { BsList } from "react-icons/bs";
import { toast } from 'react-toastify';

const TopNavbar = ({ handleShow }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const CustomToast = ({ closeToast }) => (
      <div className="d-flex flex-column text-center px-1 py-2">
        <div className="mb-3 d-flex justify-content-center">
          <div className="bg-danger bg-opacity-10 p-3 rounded-circle">
            <FiLogOut size={28} className="text-danger" />
          </div>
        </div>
        <h6 className="fw-bold mb-1 text-dark">Confirm Logout</h6>
        <p className="text-muted small mb-3">Are you sure you want to end your current session?</p>
        <div className="d-flex justify-content-center gap-2">
          <button
             className="btn btn-danger btn-sm px-3 fw-semibold shadow-sm rounded-pill"
             style={{ width: "100px" }}
             onClick={() => {
                localStorage.removeItem("adminToken");
                localStorage.removeItem("admin");
                closeToast();
                navigate("/admin", { replace: true });
             }}>
             Yes
          </button>
          
          <button
             className="btn btn-light btn-sm px-3 fw-semibold border shadow-sm rounded-pill text-dark"
             style={{ width: "100px" }}
             onClick={closeToast}>
             Cancel
          </button>
        </div>
      </div>
    );

    toast(<CustomToast />, {
      autoClose: false,
      closeOnClick: false,
      draggable: false,
      position: "top-center",
	  theme: "light"
    });
  };

  return (
    <div className="top-navbar d-flex justify-content-between align-items-center px-2 px-md-3 border-bottom bg-white">
      
      <div className="d-flex align-items-center gap-2">
        <Button
          variant="light"
          className="d-lg-none"
          onClick={handleShow}
        >
          <BsList size={24} />
        </Button>
        <h5 className="mb-0 fw-semibold">Admin Dashboard</h5>
      </div>

      <button
        onClick={handleLogout}
        className="btn btn-light border-0 d-flex align-items-center gap-2 fw-semibold text-danger"
      >
        <FiLogOut size={20} />
        Logout
      </button>
    </div>
  );
};

export default TopNavbar;

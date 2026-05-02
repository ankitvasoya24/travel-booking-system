import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";
import { Row, Col, Card, Table } from "react-bootstrap";
import {
  BsPeopleFill,
  BsCalendarCheckFill,
  BsCurrencyDollar,
  BsClockHistory,
} from "react-icons/bs";

const Dashboard = () => {
  const [usersCount, setUsersCount] = useState(0);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        console.error("Admin token missing");
        setLoading(false);
        return;
      }

      //Parallel API calls
      const [userRes, bookingRes] = await Promise.all([
        adminAPI.get("/admin/getuser"),
        adminAPI.get("/booking/all"),
      ]);

      setUsersCount(userRes.data.users?.length || 0);
      setBookings(bookingRes.data.bookings || []);
    } catch (error) {
      console.error("Dashboard fetch error:", error);
    } finally {
      setLoading(false); 
    }
  };

  const totalRevenue = bookings.reduce(
    (sum, b) => sum + Number(b.amount || 0),
    0
  );

  
  const pendingBookings = bookings.filter(
    (b) => b.bookingStatus === "Pending"
  ).length;
  
  const recentBookings = [...bookings]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) - new Date(a.createdAt || 0)
    )
    .slice(0, 5);

  if (loading) return <h5>Loading dashboard...</h5>;

  return (
    <>
      <h4 className="mb-4">Dashboard Overview</h4>

      <Row className="g-3 mb-4">
        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex gap-3 align-items-center">
              <BsPeopleFill size={36} className="text-primary" />
              <div>
                <h4 className="mb-0">{usersCount}</h4>
                <small>Total Users</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex gap-3 align-items-center">
              <BsCalendarCheckFill size={36} className="text-success" />
              <div>
                <h4 className="mb-0">{bookings.length}</h4>
                <small>Total Bookings</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex gap-3 align-items-center">
              <BsCurrencyDollar size={36} className="text-warning" />
              <div>
                <h4 className="mb-0">
                  ₹{totalRevenue.toLocaleString()}
                </h4>
                <small>Total Revenue</small>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="shadow-sm">
            <Card.Body className="d-flex gap-3 align-items-center">
              <BsClockHistory size={36} className="text-danger" />
              <div>
                <h4 className="mb-0">{pendingBookings}</h4>
                <small>Pending Bookings</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Recent Bookings */}
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Recent Bookings</h5>

          <div className="table-responsive">
            <Table bordered hover striped className="text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>User</th>
                  <th>Booking Type</th>
                  <th>Travel Date</th>
                  <th>Status</th>
                  <th>Amount</th>
                </tr>
              </thead>

              <tbody>
                {recentBookings.length === 0 ? (
                  <tr>
                    <td colSpan="6">No bookings found</td>
                  </tr>
                ) : (
                  recentBookings.map((b, index) => (
                    <tr key={b._id || index}>
                      <td>{index + 1}</td>
                      <td>{b.userId?.name || "Unknown"}</td>
                      <td>{b.bookingType || "N/A"}</td>
                      <td>
                        {b.travelDate
                          ? new Date(b.travelDate).toLocaleDateString("en-IN")
                          : "N/A"}
                      </td>
                      <td className="fw-semibold">
                        {b.bookingStatus || "N/A"}
                      </td>
                      <td>
                        ₹{Number(b.amount || 0).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </>
  );
};

export default Dashboard;
import { Card, Table, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchBookings = async (page = 1) => {
    try {
      setLoading(true);

      const res = await adminAPI.get(
        `/booking/all?page=${page}`
      );

      setBookings(res.data.bookings || []);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);
      setTotalRecords(res.data.totalRecords);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setError("Failed to load bookings");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div className="text-center py-5">
        <p className="mt-2">Loading bookings...</p>
      </div>
    );
  }

  if (error) {
    return <h5 className="text-danger text-center">{error}</h5>;
  }

  return (
    <Card className="shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-3">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="mb-0">Total Bookings: {totalRecords}</h5>
          </div>
        </div>

        <div className="table-responsive">
          <Table hover bordered striped className="mb-0 text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Booking Type</th>
                <th>User Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Booking Date</th>
                <th>Travel Date</th>
                <th>Persons</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((booking, index) => (
                  <tr key={booking._id}>
                    <td>{`Bk-${(currentPage - 1) * 6 + index + 101}`}</td>
                    <td>{booking.bookingType}</td>
                    <td>{booking.userId?.name || "-"}</td>
                    <td>{booking.userId?.email || "-"}</td>
                    <td>+91{booking.userId?.mobile || "-"}</td>
                    <td>
                      {new Date(booking.createdAt).toLocaleDateString("en-IN")}
                    </td>
                    <td>
                      {new Date(booking.travelDate).toLocaleDateString("en-IN")}
                    </td>
                    <td>{booking.persons}</td>
                    <td>$ {booking.amount}</td>
                    <td>
                      <span
                        className={`badge ${
                          booking.bookingStatus === "confirmed"
                            ? "bg-success"
                            : booking.bookingStatus === "cancelled"
                              ? "bg-danger"
                              : "bg-warning"
                        }`}
                      >
                        {booking.bookingStatus}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">
                    No bookings found
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <Pagination className="justify-content-center mt-3">
            <Pagination.First onClick={() => setCurrentPage(1)} />
            <Pagination.Prev
              onClick={() =>
                setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev))
              }
            />

            {[...Array(totalPages)].map((_, i) => (
              <Pagination.Item
                key={i}
                active={i + 1 === currentPage}
                onClick={() => setCurrentPage(i + 1)}
              >
                {i + 1}
              </Pagination.Item>
            ))}

            <Pagination.Next
              onClick={() =>
                setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev))
              }
            />
            <Pagination.Last onClick={() => setCurrentPage(totalPages)} />
          </Pagination>
        )}
      </Card.Body>
    </Card>
  );
};

export default Bookings;

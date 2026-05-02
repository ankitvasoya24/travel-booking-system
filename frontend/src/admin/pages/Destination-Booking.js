import { Card, Table, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";

const DestinationBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const fetchBookings = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const res = await adminAPI.get(
        `/booking/alldestination?page=${page}`
      );

      setBookings(res.data.data || []);
      setTotalPages(res.data.totalPages || 1);
      setCurrentPage(res.data.currentPage || 1);
      setTotalRecords(res.data.totalRecords || 0);

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
          <h5 className="mb-0">Total Destination Bookings: {totalRecords}</h5>
        </div>

        <div className="table-responsive">
          <Table hover bordered striped className="mb-0 text-center">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Persons</th>
                <th>Travel Date</th>
                <th>Special Request</th>
                <th>Booking Date</th>
              </tr>
            </thead>

            <tbody>
              {bookings.length > 0 ? (
                bookings.map((item, index) => (
                  <tr key={item._id}>
                    <td>{`DB-${(currentPage - 1) * 6 + index + 101}`}</td>
                    <td>{item.fullName}</td>
                    <td>{item.email}</td>
                    <td>{item.mobile}</td>
                    <td>{item.persons}</td>
                    <td>{new Date(item.date).toLocaleDateString("en-IN")}</td>
                    <td>{item.specialRequest || "-"}</td>
                    <td>
                      {new Date(item.createdAt).toLocaleDateString("en-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center">
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

export default DestinationBookings;

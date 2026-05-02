import { Table, Button, Modal, Form, Pagination, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";

const API = "/flight";

const Flights = () => {
  const [flights, setFlights] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    flightNumber: "",
    airline: "",
    fromCity: "",
    fromCode: "",
    toCity: "",
    toCode: "",
    departureDate: "",
    departureTime: "",
    arrivalDate: "",
    arrivalTime: "",
    duration: "",
    price: "",
    seatType: "",
    availableSeats: "",
    isAvailable: true,
  });

  //All (with pagination)
  const getFlights = async (page = 1) => {
    try {
      setLoading(true);
      const res = await adminAPI.get(`${API}/getall?page=${page}`);

      setFlights(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFlights(currentPage);
  }, [currentPage]);

  //Add
  const openAddModal = () => {
    setEditId(null);
    setFormData({
      flightNumber: "",
      airline: "",
      fromCity: "",
      fromCode: "",
      toCity: "",
      toCode: "",
      departureDate: "",
      departureTime: "",
      arrivalDate: "",
      arrivalTime: "",
      duration: "",
      price: "",
      seatType: "",
      availableSeats: "",
      isAvailable: true,
    });
    setShow(true);
  };

  //Edit
  const openEditModal = (flight) => {
    setEditId(flight._id);

    setFormData({
      flightNumber: flight.flightNumber || "",
      airline: flight.airline || "",
      fromCity: flight.fromCity || "",
      fromCode: flight.fromCode || "",
      toCity: flight.toCity || "",
      toCode: flight.toCode || "",
      departureDate: flight.departureDate?.slice(0, 10) || "",
      departureTime: flight.departureTime || "",
      arrivalDate: flight.arrivalDate?.slice(0, 10) || "",
      arrivalTime: flight.arrivalTime || "",
      duration: flight.duration || "",
      price: flight.price || "",
      seatType: flight.seatType || "",
      availableSeats: flight.availableSeats || "",
      isAvailable: flight.isAvailable ?? true,
    });

    setShow(true);
  };

  //Save / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await adminAPI.put(`${API}/update/${editId}`, formData);
      alert("Flight Updated");
    } else {
      await adminAPI.post(`${API}/create`, formData);
      alert("Flight Added");
    }

    setShow(false);
    getFlights(currentPage);
  };

  //Delete
  const deleteFlight = async (id) => {
    if (!window.confirm("Delete this flight?")) return;

    await adminAPI.delete(`${API}/delete/${id}`);
    alert("Flight Deleted");
    getFlights(currentPage);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header mb-1">
        <h4>Flights</h4>
        <p className="text-muted">Manage all flights</p>
      </div>

      <div className="text-end mb-3">
        <Button onClick={openAddModal}>+ Add New Flight</Button>
      </div>

      {loading ? (
        <div className="text-center py-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Flight</th>
                <th>Route</th>
                <th>Departure</th>
                <th>Arrival</th>
                <th>Price ($)</th>
                <th>Seats Available</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {flights.map((flight, index) => (
                <tr key={flight._id}>
                  <td>{(currentPage - 1) * 5 + index + 1}</td>
                  <td>
                    <strong>{flight.flightNumber}</strong>
                    <br />
                    {flight.airline}
                  </td>
                  <td>
                    {flight.fromCity} ({flight.fromCode}) →{" "}
                    {flight.toCity} ({flight.toCode})
                  </td>
                  <td>
                    {flight.departureDate?.slice(0, 10)}
                    <br />
                    {flight.departureTime}
                  </td>
                  <td>
                    {flight.arrivalDate?.slice(0, 10)}
                    <br />
                    {flight.arrivalTime}
                  </td>
                  <td>${flight.price}</td>
                  <td>{flight.availableSeats}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => openEditModal(flight)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => deleteFlight(flight._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

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
                  setCurrentPage((prev) =>
                    prev < totalPages ? prev + 1 : prev
                  )
                }
              />
              <Pagination.Last
                onClick={() => setCurrentPage(totalPages)}
              />
            </Pagination>
          )}
        </>
      )}

      {/* MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>
            {editId ? "Edit Flight" : "Add Flight"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {Object.keys(formData).map((field) =>
              field !== "isAvailable" ? (
                <Form.Group className="mb-2" key={field}>
                  <Form.Label className="text-capitalize">
                    {field}
                  </Form.Label>

                  <Form.Control
                    value={formData[field]}
                    placeholder={
                      field === "price" ? "Price in $" : `Enter ${field}`
                    }
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [field]: e.target.value,
                      })
                    }
                  />
                </Form.Group>
              ) : null
            )}

            <Form.Check
              type="checkbox"
              label="Available"
              checked={formData.isAvailable}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  isAvailable: e.target.checked,
                })
              }
            />
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit">
              {editId ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Flights;
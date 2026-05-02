import { Table, Button, Modal, Form, Pagination, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";

const API = "/hotel";

const Hotels = () => {
  const [hotels, setHotels] = useState([]);
  const [show, setShow] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    country: "",
    image: "",
    rating: "",
    reviewsCount: "",
    amenities: "",
    pricePerNight: "",
    tags: "",
    isAvailable: true,
  });

  const getHotels = async (page = 1) => {
    try {
      setLoading(true);
      const res = await adminAPI.get(
        `${API}/getall?page=${page}&limit=5`
      );

      setHotels(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);

      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getHotels(currentPage);
  }, [currentPage]);

  const openAddModal = () => {
    setEditId(null);
    setFormData({
      name: "",
      city: "",
      country: "",
      image: "",
      rating: "",
      reviewsCount: "",
      amenities: "",
      pricePerNight: "",
      tags: "",
      isAvailable: true,
    });
    setShow(true);
  };

  const openEditModal = (hotel) => {
    setEditId(hotel._id);
    setFormData({
      name: hotel.name,
      city: hotel.city,
      country: hotel.country,
      image: hotel.image,
      rating: hotel.rating,
      reviewsCount: hotel.reviewsCount,
      amenities: hotel.amenities.join(", "),
      pricePerNight: hotel.pricePerNight,
      tags: hotel.tags.join(", "),
      isAvailable: hotel.isAvailable,
    });
    setShow(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      amenities: formData.amenities.split(",").map((a) => a.trim()),
      tags: formData.tags.split(",").map((t) => t.trim()),
    };

    if (editId) {
      await adminAPI.put(`${API}/update/${editId}`, payload);
      alert("Hotel Updated");
    } else {
      await adminAPI.post(`${API}/create`, payload);
      alert("Hotel Added");
    }

    setShow(false);
    getHotels(currentPage);
  };

  const deleteHotel = async (id) => {
    if (!window.confirm("Delete this hotel?")) return;

    await adminAPI.delete(`${API}/delete/${id}`);
    alert("Hotel Deleted");
    getHotels(currentPage);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header mb-1">
        <h4>Hotels</h4>
        <p className="text-muted">Manage all hotels</p>
      </div>

      <div className="text-end mb-3">
        <Button size="md" onClick={openAddModal}>
          + Add New Hotel
        </Button>
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
                <th>Image</th>
                <th>Name</th>
                <th>Location</th>
                <th>Rating</th>
                <th>Reviews</th>
                <th>Price ($)</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {hotels.map((hotel, index) => (
                <tr key={hotel._id}>
                  <td>{(currentPage - 1) * 5 + index + 1}</td>

                  <td>
                    <img
                      src={hotel.image}
                      alt={hotel.name}
                      style={{
                        width: 80,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  </td>

                  <td>{hotel.name}</td>
                  <td>
                    {hotel.city}, {hotel.country}
                  </td>
                  <td>{hotel.rating} ⭐</td>
                  <td>{hotel.reviewsCount}</td>
                  <td>${hotel.pricePerNight}</td>
                  <td>
                    {hotel.isAvailable ? (
                      <span className="text-success">Available</span>
                    ) : (
                      <span className="text-danger">Unavailable</span>
                    )}
                  </td>

                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      onClick={() => openEditModal(hotel)}
                    >
                      Edit
                    </Button>{" "}
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => deleteHotel(hotel._id)}
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
            {editId ? "Edit Hotel" : "Add Hotel"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {[
              "name",
              "city",
              "country",
              "image",
              "rating",
              "reviewsCount",
              "amenities",
              "pricePerNight",
              "tags",
            ].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label className="text-capitalize">
                  {field}
                </Form.Label>
                <Form.Control
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({ ...formData, [field]: e.target.value })
                  }
                />
              </Form.Group>
            ))}

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

export default Hotels;
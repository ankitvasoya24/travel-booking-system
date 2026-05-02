import { Table, Button, Modal, Form, Pagination, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";

const Destination = () => {
  const [destinations, setDestinations] = useState([]);
  const [show, setShow] = useState(false);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    category: "",
    image: "",
    reviews: "",
    description: "",
    price: "",
    badge: "",
  });

  const getDestinations = async (page = 1) => {
    try {
      setLoading(true);

    
      const res = await adminAPI.get(`/destination/getall?page=${page}`);

      setDestinations(res.data.data);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getDestinations(currentPage);
  }, [currentPage]);

  const openAddModal = () => {
    setFormData({
      title: "",
      category: "",
      image: "",
      reviews: "",
      description: "",
      price: "",
      badge: "",
    });
    setShow(true);
  };

  // CREATE
  const handleSubmit = async (e) => {
    e.preventDefault();

    await adminAPI.post(`/destination/create`, formData);
    alert("Destination Added");

    setShow(false);
    getDestinations(currentPage);
  };

  // DELETE
  const deleteDestination = async (id) => {
    if (!window.confirm("Delete this destination?")) return;

    await adminAPI.delete(`/destination/delete/${id}`);
    alert("Destination Deleted");
    getDestinations(currentPage);
  };

  return (
    <div>
      {/* Header */}
      <div className="page-header mb-1">
        <h4>Destinations</h4>
        <p className="text-muted">Manage all destinations</p>
      </div>

      <div className="text-end mb-3">
        <Button onClick={openAddModal}>+ Add New Destination</Button>
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
                <th>Title</th>
                <th>Category</th>
                <th>Reviews</th>
                <th>Price</th>
                <th>Badge</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {destinations.map((item, index) => (
                <tr key={item._id}>
                  {/* Correct serial number across pages */}
                 
                  <td>{(currentPage - 1) * 5 + index + 1}</td>
                  

                  <td>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: 80,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  </td>

                  <td>{item.title}</td>
                  <td>{item.category}</td>
                  <td>{item.reviews} ⭐</td>
                  <td>${item.price}</td>
                  <td>{item.badge}</td>

                  <td>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => deleteDestination(item._id)}
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

      {/* ADD MODAL */}
      <Modal show={show} onHide={() => setShow(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Add Destination</Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {["title", "category", "image", "reviews", "price", "badge"].map(
              (field) => (
                <Form.Group className="mb-2" key={field}>
                  <Form.Label className="text-capitalize">{field}</Form.Label>
                  <Form.Control
                    value={formData[field]}
                    onChange={(e) =>
                      setFormData({ ...formData, [field]: e.target.value })
                    }
                    required
                  />
                </Form.Group>
              )
            )}

            <Form.Group className="mb-2">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={formData.description}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    description: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Destination;
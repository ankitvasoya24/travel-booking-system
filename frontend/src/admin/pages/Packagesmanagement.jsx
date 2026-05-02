import { Table, Button, Modal, Form, Pagination, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";

const API_BASE = "/package";

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [show, setShow] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editId, setEditId] = useState(null);

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    image: "",
    reviews: "",
    duration: "",
    destinations: "",
    oldPrice: "",
    price: "",
    badge: "",
  });

  const getPackages = async (page = 1) => {
    try {
      setLoading(true);
      const res = await adminAPI.get(`${API_BASE}/getall?page=${page}`);

      setPackages(res.data.data || []);
      setTotalPages(res.data.totalPages);
      setCurrentPage(res.data.currentPage);

      setLoading(false);
    } catch (error) {
      console.error(error);
      setPackages([]);
      setLoading(false);
    }
  };

  useEffect(() => {
    getPackages(currentPage);
  }, [currentPage]);

  //Add
  const openAddModal = () => {
    setIsEdit(false);
    setEditId(null);
    setFormData({
      title: "",
      image: "",
      reviews: "",
      duration: "",
      destinations: "",
      oldPrice: "",
      price: "",
      badge: "",
    });
    setShow(true);
  };

  //Edit
  const openEditModal = (pkg) => {
    setIsEdit(true);
    setEditId(pkg._id);
    setFormData({
      title: pkg.title || "",
      image: pkg.image || "",
      reviews: pkg.reviews || "",
      duration: pkg.duration || "",
      destinations: pkg.destinations || "",
      oldPrice: pkg.oldPrice || "",
      price: pkg.price || "",
      badge: pkg.badge || "",
    });
    setShow(true);
  };

  //Create / Update
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (isEdit) {
        await adminAPI.put(`${API_BASE}/update/${editId}`, formData);
        alert("Package Updated");
      } else {
        await adminAPI.post(`${API_BASE}/create`, formData);
        alert("Package Added");
      }
      setShow(false);
      getPackages(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  //Delete
  const deletePackage = async (id) => {
    if (!window.confirm("Delete this package?")) return;

    try {
      await adminAPI.delete(`${API_BASE}/delete/${id}`);
      alert("Package Deleted");
      getPackages(currentPage);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="page-header mb-1">
        <h4>Travel Packages</h4>
        <p className="text-muted">Manage all packages</p>
      </div>

      <div className="text-end mb-3">
        <Button size="md" onClick={openAddModal}>
          + Add New Package
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
                <th>Title</th>
                <th>Destinations</th>
                <th>Duration</th>
                <th>Reviews</th>
                <th>Price ($)</th>
                <th>Badge</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {packages.length === 0 && (
                <tr>
                  <td colSpan="9" className="text-center text-muted">
                    No packages found
                  </td>
                </tr>
              )}

              {packages.map((pkg, index) => (
                <tr key={pkg._id}>
                  <td>{(currentPage - 1) * 5 + index + 1}</td>

                  <td>
                    <img
                      src={pkg.image}
                      alt={pkg.title}
                      style={{
                        width: 80,
                        height: 50,
                        objectFit: "cover",
                        borderRadius: 6,
                      }}
                    />
                  </td>

                  <td>{pkg.title}</td>
                  <td>{pkg.destinations}</td>
                  <td>{pkg.duration}</td>
                  <td>{pkg.reviews}</td>

                  <td>
                    <strong className="text-success">${pkg.price}</strong>
                  </td>

                  <td>{pkg.badge}</td>

                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        size="sm"
                        variant="outline-primary"
                        onClick={() => openEditModal(pkg)}
                      >
                        Edit
                      </Button>

                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => deletePackage(pkg._id)}
                      >
                        Delete
                      </Button>
                    </div>
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

      {/* Modal */}
      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {isEdit ? "Edit Package" : "Add Package"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            {[
              "title",
              "image",
              "reviews",
              "duration",
              "destinations",
              "oldPrice",
              "price",
              "badge",
            ].map((field) => (
              <Form.Group className="mb-2" key={field}>
                <Form.Label className="text-capitalize">
                  {field}
                </Form.Label>
                <Form.Control
                  value={formData[field]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [field]: e.target.value,
                    })
                  }
                />
              </Form.Group>
            ))}
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShow(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {isEdit ? "Update" : "Save"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default Packages;
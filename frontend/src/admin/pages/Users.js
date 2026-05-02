import { Card, Table, Button, Pagination } from "react-bootstrap";
import { useEffect, useState } from "react";
import adminAPI from "../../api/adminAPI";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (page = 1) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      setError("User Login!");
      return;
    }

    try {
      const res = await adminAPI.get(`/admin/getuser?page=${page}`);
      const data = res.data;

      setUsers(Array.isArray(data.users) ? data.users : []);
      setTotalPages(data.totalPages || 1);
      setCurrentPage(data.currentPage || 1);

    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("adminToken");
        setError("Session expired. Please login again.");
        return;
      }
      setError("Failed to load users");
    }
  };

  useEffect(() => {
    fetchUsers(currentPage);
  }, [currentPage]);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      alert("Please login again");
      return;
    }

    if (!window.confirm("Are you sure?")) return;

    try {
      await adminAPI.delete(`/user/delete/${id}`);

      alert("User deleted successfully");
      fetchUsers(currentPage);

    } catch (err) {
      if (err.response && err.response.status === 401) {
        localStorage.removeItem("adminToken");
        alert("Session expired");
        return;
      }
      alert("Server error");
    }
  };

  return (
    <div>
      <div className="page-header mb-4">
        <h4>Users Management</h4>
        <p>All registered users</p>
      </div>

      <Card className="shadow-sm border-0">
        <Card.Body>
          {error && <p className="text-danger">{error}</p>}

          <div className="table-responsive">
            <Table bordered hover striped>
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Created At</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>
                {users.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="text-center">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user._id}>
                      <td>{(currentPage - 1) * 6 + index + 1}</td>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>+91 {user.mobile}</td>
                      <td>
                        {new Date(user.createdAt).toLocaleString("en-IN")}
                      </td>
                      <td>
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination className="justify-content-center mt-3">

              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              />

              {[...Array(totalPages)].map((_, i) => (
                <Pagination.Item
                  key={i}
                  active={currentPage === i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              ))}

              <Pagination.Next
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              />

            </Pagination>
          )}

        </Card.Body>
      </Card>
    </div>
  );
};

export default Users;
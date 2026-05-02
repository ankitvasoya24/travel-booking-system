import React, { useEffect, useState } from "react";
import { Card, Table, Button, ButtonGroup } from "react-bootstrap";
import { FaTrash } from "react-icons/fa";
import adminAPI from "../../api/adminAPI";

const Admin = () => {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAdmins = async () => {
    try {
      const res = await adminAPI.get("/admin/getadmin");
      console.log("data",res.data.admin)
      setAdmins(res.data.admin || []);
    } catch (error) {
      console.error("Error fetching admins:", error);
      setAdmins([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) {
      fetchAdmins();
    }
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this admin?")) return;

    try {
      await adminAPI.delete(`/admin/delete/${id}`);
      alert("Admin deleted");
      fetchAdmins();
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  return (
    <div>
      <h3 className="mb-4">Admin Users</h3>

      <Card className="shadow-sm">
        <Card.Body>
          <div className="table-responsive">
            <Table hover bordered striped className="mb-0 text-center">
              <thead className="table-dark">
                <tr>
                  <th>#</th>
                  <th>Email</th>
                  <th>Password</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {loading && (
                  <tr>
                    <td colSpan="4" className="text-muted text-center">
                      Loading admins...
                    </td>
                  </tr>
                )}

                {!loading && admins.length === 0 && (
                  <tr>
                    <td colSpan="4" className="text-muted text-center">
                      No admin users found
                    </td>
                  </tr>
                )}

                {admins.map((admin, index) => (
                  <tr key={admin._id}>
                    <td>{index + 1}</td>
                    <td>{admin.email}</td>
                    <td>{admin.password}</td>
                    <td>
                      <div className="d-flex justify-content-center">
                        <ButtonGroup size="sm" className="gap-2">
                          {/* <Button
                            variant="outline-primary"
                            className="d-flex align-items-center gap-1 rounded"
                            onClick={() => handleEdit(admin)}
                          >
                            <FaEdit size={14} /> Edit
                          </Button> */}

                          <Button
                            variant="outline-danger"
                            className="d-flex align-items-center gap-1 rounded"
                            onClick={() => handleDelete(admin._id)}
                          >
                            <FaTrash size={14} /> Delete
                          </Button>
                        </ButtonGroup>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default Admin;

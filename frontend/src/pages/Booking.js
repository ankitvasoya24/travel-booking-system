import { Container, Row, Col, Form, Button, Card, Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import userAPI from "../api/userAPI";

const Booking = () => {
  const navigate = useNavigate();
  const { type, id } = useParams();
  const token = localStorage.getItem("token");

  let storedUser = {};
  try {
    storedUser = JSON.parse(localStorage.getItem("user")) || {};
  } catch {
    storedUser = {};
  }

  const [item, setItem] = useState(null);
  const [travelDate, setTravelDate] = useState("");
  const [persons, setPersons] = useState("1");
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    if (!token) navigate("/login", { replace: true });
  }, [token, navigate]);

  useEffect(() => {
    if (!token) return;

    const fetchItem = async () => {
      try {
        const res = await userAPI.get(`/${type}/${id}`);
        setItem(res.data.data || res.data);
      } catch {
        alert("Failed to load booking details");
      }
    };

    fetchItem();
  }, [type, id, token]);

  const handleBooking = async () => {
    const personsCount = Number(persons);
    const price = item?.price ?? item?.pricePerNight;
    const amount = price * personsCount;

    if (!travelDate || personsCount < 1 || !agree) {
      alert("Please fill all details and accept Terms & Conditions");
      return;
    }

    setLoading(true);

    try {
      await userAPI.post(
        "/booking/create",
        {
          bookingType: type,
          itemId: id,
          travelDate,
          persons: personsCount,
          amount,
          paymentMethod
        }
      );

      navigate("/booking-success");
    } catch (error) {
      alert(error.response?.data?.message || "Booking failed");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (!item) return <p className="text-center mt-5">Loading...</p>;

  const price = item?.price ?? item?.pricePerNight;
  const totalAmount = price * Number(persons);

  return (
    <div className="py-5 bg-light min-vh-100">
      <Container>
        <Row>
          <Col lg={8}>
            <Card className="border-0 shadow-sm p-4 mb-4">
              <h3 className="fw-bold mb-4">Booking Details</h3>

              <div className="mb-4">
                <p><strong>Name:</strong> {storedUser.name || "-"}</p>
                <p><strong>Email:</strong> {storedUser.email || "-"}</p>
                <p><strong>Mobile:</strong> {storedUser.mobile || "-"}</p>
              </div>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Travel Date</Form.Label>
                  <Form.Control
                    type="date"
                    min={new Date().toISOString().split("T")[0]}
                    value={travelDate}
                    onChange={(e) => setTravelDate(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Number of Persons</Form.Label>
                  <Form.Control
                    type="number"
                    min="1"
                    value={persons}
                    onChange={(e) => setPersons(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option value="razorpay" disabled>Razorpay / UPI (Coming Soon)</option>
                    <option value="card" disabled>Credit / Debit Card (Coming Soon)</option>
                    <option value="cash">Cash on Arrival</option>
                  </Form.Select>
                </Form.Group>

                <Form.Check
                  className="mb-3"
                  type="checkbox"
                  label="I agree to Terms & Conditions"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                />

                <Button
                  className="w-100 py-2 fw-bold"
                  onClick={() => setShowConfirm(true)}
                  disabled={!agree || loading}
                >
                  {loading ? "Booking..." : "Confirm Booking"}
                </Button>
              </Form>
            </Card>
          </Col>

          <Col lg={4}>
            <Card className="border-0 shadow-sm p-4">
              <h4 className="fw-bold mb-3">Order Summary</h4>

              <p className="fw-semibold">
                {item.name || item.title || item.flightNumber}
              </p>

              <div className="d-flex justify-content-between">
                <span>Price per Person</span>
                <span>$ {price}</span>
              </div>

              <div className="d-flex justify-content-between">
                <span>Persons</span>
                <span>{persons}</span>
              </div>

              <hr />

              <div className="d-flex justify-content-between fw-bold h5">
                <span>Total</span>
                <span>$ {totalAmount}</span>
              </div>
            </Card>
          </Col>
        </Row>
      </Container>

      {/* CONFIRM MODAL */}
      <Modal show={showConfirm} onHide={() => setShowConfirm(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to confirm this booking?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirm(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleBooking}>
            Yes, Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Booking;
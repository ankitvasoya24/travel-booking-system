import React from "react";
import { Container, Card, Button } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const BookingSuccess = () => {
  const navigate = useNavigate();

  return (
    <Container
      fluid
      className="d-flex justify-content-center align-items-center bg-light"
      style={{ minHeight: "88vh" }}
    >
      <Card
        className="shadow-lg border-0"
        style={{
          maxWidth: "700px",
          width: "100%",
          borderRadius: "18px",
          padding: "50px 30px"
        }}
      >
        {/* Flexbox Center */}
        <div className="d-flex flex-column justify-content-center align-items-center text-center">
          <FaCheckCircle size={100} color="#28a745" className="mb-3" />

          <h2 className="fw-bold text-success">
            Your booking has been successful!
          </h2>

          <p className="text-muted mt-3 fs-5">
            Cheers! Your trip is confirmed 🎉 <br />
            We wish you a happy and memorable journey ✨
          </p>

          <Button
            variant="success"
            size="lg"
            className="mt-4 px-5"
            onClick={() => navigate("/")}
          >
            Go to Home
          </Button>
        </div>
      </Card>
    </Container>
  );
};

export default BookingSuccess;
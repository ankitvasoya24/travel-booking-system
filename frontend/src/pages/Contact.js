import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const Contact = () => {
  return (
    <section className="py-5 bg-light">
      <Container>
        <Row className="justify-content-center">
          <Col xl={10} lg={11}>
            <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
              <Row className="g-0">
                {/* LEFT INFO */}
                <Col
                  md={5}
                  className="text-white p-4 p-md-5"
                  style={{
                    background:
                      "linear-gradient(135deg, #0d6efd, #084298)",
                  }}
                >
                  <h3 className="fw-bold mb-3">Contact Information</h3>
                  <p className="opacity-75 mb-4">
                    Fill out the form and our team will get back to you within
                    24 hours.
                  </p>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <FaPhoneAlt size={20} />
                    <div>
                      <small className="opacity-75">Phone</small>
                      <p className="mb-0 fw-medium">+1 (212) 555-7845</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3 mb-4">
                    <FaEnvelope size={20} />
                    <div>
                      <small className="opacity-75">Email</small>
                      <p className="mb-0 fw-medium">support@gotur.com</p>
                    </div>
                  </div>

                  <div className="d-flex align-items-start gap-3">
                    <FaMapMarkerAlt size={20} />
                    <div>
                      <small className="opacity-75">Location</small>
                      <p className="mb-0 fw-medium">
                        601 Lexington Ave, 15th Floor, New York, NY 10022
                      </p>
                    </div>
                  </div>
                </Col>

                {/* RIGHT FORM */}
                <Col md={7} className="p-4 p-md-5 bg-white">
                  <h3 className="fw-bold mb-4">Send us a message</h3>

                  <Form>
                    <Row>
                      <Col sm={6} className="mb-3">
                        <Form.Label className="small fw-bold">
                          First Name
                        </Form.Label>
                        <Form.Control placeholder="John" />
                      </Col>

                      <Col sm={6} className="mb-3">
                        <Form.Label className="small fw-bold">
                          Last Name
                        </Form.Label>
                        <Form.Control placeholder="Smith" />
                      </Col>
                    </Row>

                    <Form.Group className="mb-3">
                      <Form.Label className="small fw-bold">
                        Email Address
                      </Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="john@gmail.com"
                      />
                    </Form.Group>

                    <Form.Group className="mb-4">
                      <Form.Label className="small fw-bold">
                        Message
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        rows={4}
                        placeholder="Tell us about your travel plans..."
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      size="lg"
                      className="w-100 fw-bold rounded-pill"
                      onClick={()=> { alert('Thank you for sharing your Detailes')}}
                    >
                      Send Message
                    </Button>
                  </Form>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Contact;

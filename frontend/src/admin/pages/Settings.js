import { Card, Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";

const Settings = () => {
  const [settings, setSettings] = useState({
    adminEmail: "admin@gmail.com",
    passWord: 'new password',
    notifications: true,
    darkMode: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings({
      ...settings,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSave = () => {
    console.log("Saved Settings:", settings);
    alert("Settings saved successfully!");
  };

  return (
    <div>
      <div className="page-header mb-4">
        <h4>Settings</h4>
        <p>Configure system settings and preferences</p>
      </div>

      {/* Website Settings */}
      <Card className="mb-4 shadow-sm">
        <Card.Body>
          <h5 className="mb-3">Website Settings</h5>

          <Row>
            
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Admin Email</Form.Label>
                <Form.Control
                  type="email"
                  name="adminEmail"
                  value={settings.adminEmail}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Change Password</Form.Label>
                <Form.Control
                  type="text"
                  name="passWord"
                  value={settings.passWord}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>

      <div className="text-start">
        <Button variant="primary" onClick={handleSave}>
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default Settings;

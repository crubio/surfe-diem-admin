import { Card, Row, Col } from "react-bootstrap";

const HomePage = () => {
  return (
    <div className="py-4">
      <h1 className="mb-4">Welcome to Surfe Diem Admin</h1>
      
      <Row>
        <Col md={12}>
          <Card>
            <Card.Body>
              <Card.Title>Admin Dashboard</Card.Title>
              <Card.Text>
                Welcome to the Surfe Diem administration interface. Use the navigation above to manage different aspects of the system.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HomePage; 
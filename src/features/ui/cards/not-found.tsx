import { APP_ROUTES } from "@utils/routing";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

function NotFoundCard() {
  return (
    <Card>
      <Card.Body>
        <Card.Title>Not Found</Card.Title>
        <Card.Text>This page does not exist or you do not have access.</Card.Text>
        <Card.Text>
          <Link to={APP_ROUTES.LOGIN}>Log in</Link>
        </Card.Text>
        
      </Card.Body>
    </Card>
  );
}

export default NotFoundCard;
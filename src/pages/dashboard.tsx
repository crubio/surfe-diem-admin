import { Loading } from "@features/ui/loading"
import { useUser } from "hooks/use-user"
import { Card, Alert, Badge } from "react-bootstrap"

const Dashboard = () => {
  const userRequest = useUser();
  const user = userRequest.data || null;

  if (userRequest.isLoading) {
    return (
      <div className="py-4">
        <Loading text="Loading user data..." />
      </div>
    );
  }

  if (userRequest.isError) {
    return (
      <div className="py-4">
        <Alert variant="danger">
          <Alert.Heading>Error Loading Dashboard</Alert.Heading>
          <p>There was an error loading your dashboard data. Please try refreshing the page.</p>
          <hr />
          <p className="mb-0">
            <strong>Error Details:</strong> {'Unknown error'}
          </p>
        </Alert>
      </div>
    );
  }

  return (
    <div className="py-4">
      <h1 className="mb-4">Dashboard</h1>
      
      {user ? (
        <Card>
          <Card.Body>
            <Card.Title>Welcome, {user.email}!</Card.Title>
            <Card.Text>
              You are successfully logged in to the Surfe Diem Admin interface.
            </Card.Text>
            <Badge bg="success">Authenticated</Badge>
          </Card.Body>
        </Card>
      ) : (
        <Alert variant="warning">
          <Alert.Heading>Not Logged In</Alert.Heading>
          <p>You are not currently logged in. Please <a href="/login">login</a> to access the admin features.</p>
          <hr />
          <p className="mb-0">
            <strong>Status:</strong> {userRequest.isFetched ? 'Data fetched, no user found' : 'Not fetched'}
          </p>
        </Alert>
      )}
    </div>
  )
}

export default Dashboard
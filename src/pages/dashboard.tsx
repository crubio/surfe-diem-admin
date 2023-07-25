import SiteHeader from "@features/ui/header"
import { useUser } from "hooks/use-user"
import { Container } from "react-bootstrap"

const Dashboard = () => {
  const userRequest = useUser();
  const user = userRequest.data || null;

  return (
    <>
      <SiteHeader />
      <Container>
        <p>This is the dashboard page</p>
        { user && <p>Welcome {user.email}</p> }
        { !user && userRequest.isFetched && (
          <>
            <p>You are not logged in</p>
            <p>Please <a href="/login">login</a></p>
          </>
        )}
      </Container>
    </>
  )
}

export default Dashboard
import SiteHeader from "@features/ui/header"
import { Container } from "react-bootstrap"

const Dashboard = () => {
  return (
    <>
      <SiteHeader />
      <Container>
        <p>This is the dashboard page</p>
      </Container>
    </>
  )
}

export default Dashboard
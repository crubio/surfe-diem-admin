import SiteHeader from "@features/ui/header";
import { Container } from "react-bootstrap";
import { Login } from "./login";

const App = () => {
  return (
    <>
      <SiteHeader />
      <Container>
        <Login />
      </Container>
    </>
  )
}

export default App;
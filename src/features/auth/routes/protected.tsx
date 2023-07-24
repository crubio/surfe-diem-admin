import MakeBreadCrumbs from "@features/ui/breadcrumbs";
import SiteHeader from "@features/ui/header";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <>
      <SiteHeader />
      <Container>
        {MakeBreadCrumbs()}
        <Outlet />
      </Container>
    </>
  )
}

export default App;
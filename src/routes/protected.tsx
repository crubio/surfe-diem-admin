import MakeBreadCrumbs from "@features/ui/breadcrumbs";
import SiteHeader from "@features/ui/header";
import Locations from "pages/locations";
import Users from "pages/users";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NotFoundCard from "@features/ui/cards/not-found";

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

export const protectedRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "users/",
        element: <Users />,
      },
      {
        path: "locations/",
        element: <Locations />,
        errorEleeent: <NotFoundCard />,
      },
    ],
  }
];
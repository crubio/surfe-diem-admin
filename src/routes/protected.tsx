import LocationsPage from "pages/locations";
import Users from "pages/users";
import NotFoundCard from "@features/ui/cards/not-found";
import ProtectedApp from "@features/auth/routes/protected";
import { Login } from "@features/auth/routes/login";

export const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedApp />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "users/",
        element: <Users />,
      },
      {
        path: "locations/",
        element: <LocationsPage />,
        errorEleeent: <NotFoundCard />,
      },
      {
        path: '/login',
        element: <Login />,
        ErrorElement: <div>404 Not Found</div>,
      },
    ],
  }
];
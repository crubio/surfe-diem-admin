import LocationsPage from "pages/locations";
import Users from "pages/users";
import NotFoundCard from "@features/ui/cards/not-found";
import ProtectedApp from "@features/auth/routes/protected";
import { Login } from "@features/auth/routes/login";
import SummariesPage from "pages/summary";
import HomePage from "pages/home";
import Dashboard from "pages/dashboard";

export const protectedRoutes = [
  {
    path: "/",
    element: <ProtectedApp />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "dashboard/",
        element: <Dashboard />,
      },
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
        path: "summaries/",
        element: <SummariesPage />,
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
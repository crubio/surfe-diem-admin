import React from 'react'
import ReactDOM from 'react-dom/client'
import Dashboard from './pages/dashboard.js'
import Users from './pages/users.tsx'
import Locations from './pages/locations.tsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
    errorElement: <div>404 Not Found</div>,
    children: [
      {
        path: "users/",
        element: <Users />,
      },
      {
        path: "users/:userId/",
        element: <Users />,
      },
      {
        path: "users/:userId/edit",
        element: <Users />,
      },
      {
        path: "locations/",
        element: <Locations />,
      },
      {
        path: "locations/:locationId/",
        element: <Locations />,
      },
    ],
  },
  {
    path: "/login",
    element: <div>Login</div>,
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/logout",
    element: <div>Logout</div>,
    errorElement: <div>404 Not Found</div>,
  }
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)

import NotFoundCard from "@features/ui/cards/not-found";

export const matchAll = [
  {
    path: "*",
    element: <NotFoundCard />,
    errorElement: <div>404 Not Found</div>,
  },
]
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { TripCreation } from "./pages/trip-creation";
import { TripDetails } from "./pages/trip-details";

const router = createBrowserRouter([
  {
    path: "/",
    element: <TripCreation />,
  },
  {
    path: "/trips/:tripId",
    element: <TripDetails />,
  },
  {
    path: "*",
    element: (
      <h1 className="text-4xl font-bold text-zinc-300">
        Página não encontrada!
      </h1>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

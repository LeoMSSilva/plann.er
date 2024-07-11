import { RouterProvider, createBrowserRouter } from "react-router-dom";

import Pattern from "./assets/pattern.png";
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
      <div className="h-screen flex justify-center items-center">
        <div className="absolute">
          <img
            src={Pattern}
            alt="Imagem de fundo"
          />
        </div>
        <h1 className="text-4xl font-bold text-zinc-300">
          Página não encontrada!
        </h1>
      </div>
    ),
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}

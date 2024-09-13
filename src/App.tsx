import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Homepage from "./pages/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Homepage />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
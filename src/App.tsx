import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainLayout from "./layout/main_layout";
import Homepage from "./pages/homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "about",
        element: <h1>about page</h1>
      },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}

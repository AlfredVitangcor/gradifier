import { Outlet } from "react-router-dom";
import Sidebar from "../src/components/sidebar";

export default function MainLayout() {
  return (
    <div>
      <Sidebar />
      <Outlet />
    </div>
  );
}

import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="bg-blue-400 flex justify-between p-2 items-center">
      <div className="font-bold bg-red-400 p-2 rounded-sm">
        <Link to={"/"}>Gradifier</Link>
      </div>

      <div>
        <ul className="flex gap-4">
          <li>
            <Link to={"/about"} className="hover:underline">
              About
            </Link>
          </li>

          <li>
            <Link to={"/contact"} className="hover:underline">
              About
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

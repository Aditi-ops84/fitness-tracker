import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-gray-900 text-white p-4 fixed top-0 w-full shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold text-blue-400">Fitness Tracker</h1>
        <div className="space-x-6">
          <Link to="/" className="hover:text-blue-300">🏠 Home</Link>
          <Link to="/profile" className="hover:text-blue-300">👤 Profile</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

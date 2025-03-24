import { useState } from "react";
import { Link } from "react-router-dom";
import { Menu } from "lucide-react"; // Import Menu Icon

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Sidebar Toggle Button */}
      <button onClick={() => setIsOpen(!isOpen)} className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md">
        <Menu size={24} />
      </button>

      {/* Sidebar Panel */}
      <div className={`fixed top-0 left-0 h-full bg-gray-900 text-white p-6 shadow-md transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform`}>
        <h2 className="text-2xl font-bold text-blue-400 mb-6">Fitness Tracker</h2>
        <ul className="space-y-4">
          <li><Link to="/" className="hover:text-blue-300" onClick={() => setIsOpen(false)}>🏠 Dashboard</Link></li>
          <li><Link to="/profile" className="hover:text-blue-300" onClick={() => setIsOpen(false)}>👤 Profile</Link></li>
          <li><Link to="/workouts" className="hover:text-blue-300" onClick={() => setIsOpen(false)}>💪 Workout Tracker</Link></li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;

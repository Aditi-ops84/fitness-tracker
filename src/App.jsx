import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Dashboard from "./pages/Dashboard";
import WorkoutTracker from "./pages/WorkoutTracker"; // ✅ Import Workout Tracker Page

function App() {
  return (
    <Router>
      <Navbar />
      <div className="flex pt-16">
        <Sidebar />
        <div className="flex-1 p-6 md:ml-72">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/workouts" element={<WorkoutTracker />} /> {/* ✅ Route Added */}
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

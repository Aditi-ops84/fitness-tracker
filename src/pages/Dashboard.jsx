import React, { useState, useEffect } from "react";
import { db, collection, getDocs } from "../firebaseConfig";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function Dashboard() {
  const [workouts, setWorkouts] = useState([]);
  const [bmi, setBmi] = useState("N/A");
  const [totalCalories, setTotalCalories] = useState(0);

  useEffect(() => {
    fetchWorkouts();
    fetchBMI();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const workoutsList = querySnapshot.docs.map(doc => doc.data());
      setWorkouts(workoutsList);
      
      // Calculate total calories based on workout duration
      const totalCals = workoutsList.reduce((sum, workout) => sum + (Number(workout.caloriesBurned) || 0), 0);
      setTotalCalories(totalCals);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const fetchBMI = async () => {
    try {
      const profileRef = collection(db, "users");
      const querySnapshot = await getDocs(profileRef);
      if (!querySnapshot.empty) {
        const profileData = querySnapshot.docs[0].data();
        if (profileData.bmi) setBmi(profileData.bmi);
      }
    } catch (error) {
      console.error("Error fetching BMI:", error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-400">Dashboard</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* BMI Section */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-yellow-400">Your BMI</h3>
          <p className="text-3xl font-semibold text-green-300">{bmi}</p>
        </div>

        {/* Calories Burned */}
        <div className="bg-gray-800 p-6 rounded-lg shadow">
          <h3 className="text-xl font-bold text-red-400">Total Calories Burned</h3>
          <p className="text-3xl font-semibold text-orange-300">{totalCalories} kcal</p>
        </div>
      </div>

      {/* Workout Progress Graph */}
      <div className="mt-10 bg-gray-800 p-6 rounded-lg shadow">
        <h3 className="text-xl font-bold text-blue-300 mb-4">Workout Progress</h3>
        {workouts.length > 0 ? (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={workouts}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" stroke="#ffffff" />
              <YAxis stroke="#ffffff" />
              <Tooltip />
              <Line type="monotone" dataKey="caloriesBurned" stroke="#82ca9d" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        ) : (
          <p className="text-gray-400">No workout data available.</p>
        )}
      </div>
    </div>
  );
}

export default Dashboard;

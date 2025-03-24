import React, { useState, useEffect } from "react";
import { db, collection, addDoc, getDocs } from "../firebaseConfig";

function WorkoutTracker() {
  const [workouts, setWorkouts] = useState([]);
  const [newWorkout, setNewWorkout] = useState({ name: "", duration: "", caloriesBurned: "" });

  useEffect(() => {
    fetchWorkouts();
  }, []);

  const fetchWorkouts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "workouts"));
      const workoutsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setWorkouts(workoutsList);
    } catch (error) {
      console.error("Error fetching workouts:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newWorkout.name || !newWorkout.duration || !newWorkout.caloriesBurned) {
      alert("Please fill in all fields!");
      return;
    }
    try {
      await addDoc(collection(db, "workouts"), newWorkout);
      fetchWorkouts();
      setNewWorkout({ name: "", duration: "", caloriesBurned: "" });
    } catch (error) {
      console.error("Error adding workout:", error);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-green-400">Workout Tracker</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Workout Name"
          value={newWorkout.name}
          onChange={(e) => setNewWorkout({ ...newWorkout, name: e.target.value })}
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <input
          type="number"
          placeholder="Duration (min)"
          value={newWorkout.duration}
          onChange={(e) => setNewWorkout({ ...newWorkout, duration: e.target.value })}
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <input
          type="number"
          placeholder="Calories Burned"
          value={newWorkout.caloriesBurned}
          onChange={(e) => setNewWorkout({ ...newWorkout, caloriesBurned: e.target.value })}
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <button type="submit" className="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600 transition">
          Add Workout
        </button>
      </form>

      <h3 className="text-lg font-semibold mt-6 text-green-300">Workout History:</h3>
      <ul className="mt-2">
        {workouts.length > 0 ? (
          workouts.map((workout) => (
            <li key={workout.id} className="bg-gray-800 p-3 rounded mt-2">
              {workout.name} - {workout.duration} min - {workout.caloriesBurned} cal
            </li>
          ))
        ) : (
          <p className="text-gray-400">No workouts added yet.</p>
        )}
      </ul>
    </div>
  );
}

export default WorkoutTracker;

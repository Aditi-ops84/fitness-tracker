import React, { useState, useEffect } from "react";
import { db, doc, setDoc, getDoc } from "../firebaseConfig";

function Profile() {
  const [profile, setProfile] = useState({ name: "", age: "", height: "", weight: "" });
  const [bmi, setBmi] = useState("N/A");

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    const profileRef = doc(db, "users", "profileData");
    const profileSnap = await getDoc(profileRef);
    if (profileSnap.exists()) {
      setProfile(profileSnap.data());
      if (profileSnap.data().bmi) setBmi(profileSnap.data().bmi);
    }
  };

  const calculateBMI = () => {
    if (profile.height && profile.weight) {
      const heightInMeters = profile.height / 100;
      return (profile.weight / (heightInMeters * heightInMeters)).toFixed(2);
    }
    return "N/A";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const bmiValue = calculateBMI();
    await setDoc(doc(db, "users", "profileData"), { ...profile, bmi: bmiValue });
    setBmi(bmiValue);
    alert("Profile & BMI Updated!");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-gray-900 text-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-400">Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={profile.name}
          onChange={(e) => setProfile({ ...profile, name: e.target.value })}
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <input
          type="number"
          placeholder="Age"
          value={profile.age}
          onChange={(e) => setProfile({ ...profile, age: e.target.value })}
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <input
          type="number"
          placeholder="Height (cm)"
          value={profile.height}
          onChange={(e) => setProfile({ ...profile, height: e.target.value })}
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <input
          type="number"
          placeholder="Weight (kg)"
          value={profile.weight}
          onChange={(e) => setProfile({ ...profile, weight: e.target.value })}
          className="w-full p-2 border border-gray-700 bg-gray-800 text-white rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 transition">
          Save Profile
        </button>
      </form>
      
      <div className="mt-6 text-center">
        <h3 className="text-xl font-bold text-blue-300">Your BMI:</h3>
        <p className="text-2xl font-semibold text-yellow-400">{bmi}</p>
      </div>
    </div>
  );
}

export default Profile;

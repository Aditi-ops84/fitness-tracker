import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

function ProgressChart({ data }) {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-white w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-center mb-4">📈 Workout Progress</h2>

      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#555" />
          <XAxis dataKey="date" stroke="#ddd" />
          <YAxis stroke="#ddd" />
          <Tooltip />
          <Line type="monotone" dataKey="duration" stroke="#38bdf8" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default ProgressChart;

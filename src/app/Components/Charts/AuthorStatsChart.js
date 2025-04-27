// src/components/AuthorStatsChart.js
import React from "react";
import { Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

export default function AuthorStatsChart({ chartData }) {
  return (
    <div className="mt-6">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Author Stats</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Payout Distribution</h3>
          <div className="w-full h-96">
            <Pie data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md w-full h-full">
          <h3 className="text-lg font-semibold mb-4 text-gray-700">Articles per Author</h3>
          <div className="w-full h-96">
            <Bar data={chartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>
      </div>
    </div>
  );
}

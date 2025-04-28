"use client";
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

// Dummy sample chart data 
const sampleData = {
  labels: ["Author A", "Author B", "Author C"],
  datasets: [
    {
      label: "Payouts",
      data: [40, 25, 35],
      backgroundColor: ["#4F46E5", "#06B6D4", "#10B981"],
    },
  ],
};

export default function AuthorStatsChart({ chartData, loading }) {
  const finalChartData = chartData && chartData.labels ? chartData : sampleData;

  if (loading) {
    return (
      <div className="w-full h-80 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-6">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-4">
        Author Stats
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full h-full">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            Payout Distribution
          </h3>
          <div className="w-full h-72 md:h-96">
            <Pie data={finalChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="bg-white p-4 md:p-6 rounded-2xl shadow-md w-full h-full">
          <h3 className="text-lg md:text-xl font-semibold text-gray-700 mb-4">
            Articles per Author
          </h3>
          <div className="w-full h-72 md:h-96">
            <Bar data={finalChartData} options={{ maintainAspectRatio: false }} />
          </div>
        </div>

      </div>
    </div>
  );
}

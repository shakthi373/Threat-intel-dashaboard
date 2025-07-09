import React, { useEffect, useState } from "react";
import api from "../api";
import { Bar, Pie } from "react-chartjs-2";
import "chart.js/auto";

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await api.get("/threats/stats");
        setStats(response.data);
      } catch (error) {
        console.error("Error fetching stats:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold text-center mb-8">🛡️ Threat Intelligence Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Total Threats */}
        <div className="p-6 bg-white rounded-xl shadow text-center">
          <h2 className="text-2xl font-semibold mb-4">📊 Total Threats</h2>
          <p className="text-5xl font-bold text-blue-600">{stats?.total_threats}</p>
        </div>

        {/* Threats by Severity */}
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">🔥 Threats by Severity</h2>
          <Bar
            data={{
              labels: Object.keys(stats.threats_by_severity),
              datasets: [
                {
                  label: "Threat Count",
                  data: Object.values(stats.threats_by_severity),
                  backgroundColor: "rgba(255, 99, 132, 0.6)",
                },
              ],
            }}
          />
        </div>

        {/* Threats by Risk */}
        <div className="p-6 bg-white rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">⚠️ Threats by Risk Level</h2>
          <Pie
            data={{
              labels: Object.keys(stats.threats_by_risk),
              datasets: [
                {
                  label: "Threat Count",
                  data: Object.values(stats.threats_by_risk),
                  backgroundColor: [
                    "rgba(75, 192, 192, 0.6)",
                    "rgba(255, 206, 86, 0.6)",
                    "rgba(255, 99, 132, 0.6)",
                  ],
                },
              ],
            }}
          />
        </div>
      </div>
    </div>
  );
}

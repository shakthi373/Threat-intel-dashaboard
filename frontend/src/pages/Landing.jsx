import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Bar, Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, Tooltip, Legend);

function Landing() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:8000/api/threats/stats")
      .then((response) => {
        setStats(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch stats:", err);
        setError("Could not load statistics.");
        setLoading(false);
      });
  }, []);

  const categoryData = stats && {
    labels: Object.keys(stats.threats_by_category),
    datasets: [
      {
        label: "Threats by Category",
        data: Object.values(stats.threats_by_category),
        backgroundColor: [
          "#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"
        ],
      },
    ],
  };

  const severityData = stats && {
    labels: Object.keys(stats.threats_by_severity),
    datasets: [
      {
        label: "Threats by Severity",
        data: Object.values(stats.threats_by_severity),
        backgroundColor: "#36A2EB",
      },
    ],
  };

  return (
    <div className="container text-center mt-5">
      {/* Buttons visible only on md+ screens */}
      <div className="mb-4 d-none d-md-block">
        <Link to="/search" className="btn btn-primary btn-lg me-3">
          🔎 Search Threats
        </Link>
        <Link to="/analyze" className="btn btn-success btn-lg">
          🔮 Analyze Threat
        </Link>
      </div>

      <h1 className="display-3 mb-4">🛡️ Threat Intelligence Dashboard</h1>
      <p className="lead mb-4">Monitor and analyze cybersecurity threats in real time.</p>

      {loading && <p>Loading statistics...</p>}
      {error && <p className="text-danger">{error}</p>}

      {stats && (
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center mb-5">
          {/* Pie Chart */}
          <div className="card shadow-sm p-3 m-2" style={{ maxWidth: "400px", width: "100%" }}>
            <h5 className="card-title">📊 Threats by Category</h5>
            <div style={{ width: "100%", height: "300px" }}>
              <Pie data={categoryData} />
            </div>
          </div>

          {/* Bar Chart */}
          <div className="card shadow-sm p-3 m-2" style={{ maxWidth: "400px", width: "100%" }}>
            <h5 className="card-title">📈 Threats by Severity</h5>
            <div style={{ width: "100%", height: "300px" }}>
              <Bar data={severityData} options={{ indexAxis: 'y' }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Landing;

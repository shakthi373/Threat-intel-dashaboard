import React, { useEffect, useState } from "react"
import api from "../api"

function Dashboard() {
  const [stats, setStats] = useState(null)

  useEffect(() => {
    api.get("/threats/stats")
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
  }, [])

  if (!stats) return <p className="text-center mt-5">Loading dashboard stats...</p>

  return (
    <div className="row mt-5">
      <div className="col-md-4">
        <div className="card text-white shadow">
          <div className="card-header">Total Threats</div>
          <div className="card-body">
            <h5 className="card-title display-4">{stats.total_threats}</h5>
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white shadow">
          <div className="card-header">By Category</div>
          <div className="card-body">
            {Object.entries(stats.threats_by_category).map(([cat, count]) => (
              <p key={cat}>{cat}: <strong>{count}</strong></p>
            ))}
          </div>
        </div>
      </div>
      <div className="col-md-4">
        <div className="card text-white shadow">
          <div className="card-header">By Severity</div>
          <div className="card-body">
            {Object.entries(stats.threats_by_severity).map(([sev, count]) => (
              <p key={sev}>Severity {sev}: <strong>{count}</strong></p>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

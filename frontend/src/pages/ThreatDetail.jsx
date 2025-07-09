import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../api";

function ThreatDetail() {
  const { id } = useParams();
  const [threat, setThreat] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchThreat = async () => {
      try {
        const res = await api.get(`/threats/${id}`);
        if (!res.data || !res.data.id) {
          throw new Error("Threat not found.");
        }
        setThreat(res.data);
      } catch (err) {
        setError(err.response?.status === 404
          ? "Threat not found (404)."
          : "Failed to load threat details.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchThreat();
  }, [id]);

  if (loading) {
    return <div className="container mt-5">Loading threat details...</div>;
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger">{error}</div>
        <Link to="/" className="btn btn-primary mt-3">
          🔙 Back to Search
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2 className="mb-4">📝 Threat Details</h2>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{threat.threat_category}</h5>
          <p className="card-text"><strong>ID:</strong> {threat.id}</p>
          <p className="card-text"><strong>Description:</strong> {threat.cleaned_threat_description}</p>
          <p className="card-text"><strong>Severity Score:</strong> {threat.severity_score}</p>
          <p className="card-text"><strong>Risk Level:</strong> {threat.risk_level_prediction}</p>
          <p className="card-text"><strong>Actor:</strong> {threat.threat_actor}</p>
          <p className="card-text"><strong>Location:</strong> {threat.geographical_location}</p>
        </div>
      </div>
      <Link to="/" className="btn btn-primary mt-3">🔙 Back to Search</Link>
    </div>
  );
}

export default ThreatDetail;

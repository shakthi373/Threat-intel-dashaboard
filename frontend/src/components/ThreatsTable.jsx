import React from "react";
import { useNavigate } from "react-router-dom";

function ThreatsTable({ threats, loading, page, setPage, total, limit }) {
  const navigate = useNavigate();

  const shortenUUID = (uuid) => (uuid ? `${uuid.slice(0, 8)}...` : "");

  const handleRowClick = (id) => {
    if (id) {
      navigate(`/threats/${id}`);
    }
  };

  return (
    <div>
      {loading ? (
        <div className="text-center mt-4">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : (
        <table className="table table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actor</th>
              <th>Location</th>
              <th>Severity</th>
              <th>Risk</th>
            </tr>
          </thead>
          <tbody>
            {threats.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center">
                  No threats found for selected filters.
                </td>
              </tr>
            ) : (
              threats.map((t) => (
                <tr
                  key={t.id}
                  className={`hover-row ${t.id ? "table-hover" : ""}`}
                  style={{
                    cursor: "default", 
                  }}
                  
                >
                  <td>{shortenUUID(t.id)}</td>
                  <td>{t.threat_category}</td>
                  <td>
                    {t.cleaned_threat_description.length > 50
                      ? `${t.cleaned_threat_description.slice(0, 50)}...`
                      : t.cleaned_threat_description}
                  </td>
                  <td>{t.threat_actor}</td>
                  <td>{t.geographical_location}</td>
                  <td>
                    <span
                      className={`badge ${
                        t.severity_score >= 4
                          ? "bg-danger"
                          : t.severity_score === 3
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {t.severity_score}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${
                        t.risk_level_prediction === "High"
                          ? "bg-danger"
                          : t.risk_level_prediction === "Medium"
                          ? "bg-warning"
                          : "bg-success"
                      }`}
                    >
                      {t.risk_level_prediction}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}

      {/* Pagination */}
      <div className="d-flex justify-content-between align-items-center mt-3">
        <div>
          Showing {(page - 1) * limit + 1} to{" "}
          {Math.min(page * limit, total)} of {total} threats
        </div>
        <div>
          <button
            className="btn btn-outline-primary me-2"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
            ⬅ Previous
          </button>
          <span>Page {page}</span>
          <button
            className="btn btn-outline-primary ms-2"
            disabled={page * limit >= total}
            onClick={() => setPage(page + 1)}
          >
            Next ➡
          </button>
        </div>
      </div>
    </div>
  );
}

export default ThreatsTable;

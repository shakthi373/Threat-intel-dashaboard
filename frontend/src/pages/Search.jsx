import React, { useEffect, useState } from "react";
import api from "../api";
import ThreatsTable from "../components/ThreatsTable";

function Search() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [severity, setSeverity] = useState("");
  const [risk, setRisk] = useState("");

  const [threats, setThreats] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const limit = 10; // Items per page
  const [loading, setLoading] = useState(false);

  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;


  const fetchThreats = async () => {
    try {
      setLoading(true);

      const params = {
        skip: (page - 1) * limit,
        limit,
      };

      if (uuidRegex.test(search.trim())) {
        params.id = search.trim();
      } else if (search.trim()) {
        params.search = search.trim();
      }

      if (category) params.category = category;
      if (severity) params.severity = severity;
      if (risk) params.risk = risk;

      const res = await api.get("/threats", { params });

      setThreats(res.data.data);
      setTotal(res.data.total);
    } catch (err) {
      console.error("Failed to fetch threats:", err);
      setThreats([]); // Clear table on error
      setTotal(0);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchThreats();
  }, [search, category, severity, risk, page]);

  const resetFilters = () => {
    setSearch("");
    setCategory("");
    setSeverity("");
    setRisk("");
    setPage(1);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">🔎 Search Threats</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-3 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="Search by UUID or keywords..."
            value={search}
            onChange={(e) => {
              setPage(1);
              setSearch(e.target.value);
            }}
          />
        </div>
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={category}
            onChange={(e) => {
              setPage(1);
              setCategory(e.target.value);
            }}
          >
            <option value="">All Categories</option>
            <option value="Malware">Malware</option>
            <option value="Phishing">Phishing</option>
            <option value="Ransomware">Ransomware</option>
            <option value="DDoS">DDoS</option>
          </select>
        </div>
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={severity}
            onChange={(e) => {
              setPage(1);
              setSeverity(e.target.value);
            }}
          >
            <option value="">All Severities</option>
            <option value="1">1 - Low</option>
            <option value="2">2</option>
            <option value="3">3 - Medium</option>
            <option value="4">4</option>
            <option value="5">5 - Critical</option>
          </select>
        </div>
        <div className="col-md-2 mb-2">
          <select
            className="form-select"
            value={risk}
            onChange={(e) => {
              setPage(1);
              setRisk(e.target.value);
            }}
          >
            <option value="">All Risks</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
        </div>
        <div className="col-md-3 mb-2 text-end">
          <button
            className="btn btn-secondary w-100"
            onClick={resetFilters}
          >
            🔄 Reset Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <ThreatsTable
        threats={threats}
        loading={loading}
        page={page}
        setPage={setPage}
        total={total}
        limit={limit}
      />
    </div>
  );
}

export default Search;

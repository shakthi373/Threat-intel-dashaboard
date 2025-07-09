import React, { useState } from 'react';
import api from '../api';

function AnalyzeForm() {
  const [description, setDescription] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async () => {
    const trimmedDesc = description.trim();
    if (!trimmedDesc) return; // Prevent empty submit
    setLoading(true);
    setError("");
    setResult(null);

    try {
      const res = await api.post("/analyze", { description: trimmedDesc });
      setResult(res.data);
    } catch (err) {
      console.error(err);
      setError("Failed to analyze the threat. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Submit on Enter key press (Shift+Enter for new line)
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      analyze();
    }
  };

  return (
    <div>
      <textarea
        className="form-control mb-2"
        rows="4"
        placeholder="Enter threat description..."
        value={description}
        onChange={e => setDescription(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={loading}
        aria-label="Threat description input"
      ></textarea>

      <button
        className="btn btn-primary px-4 py-2"
        onClick={analyze}
        disabled={loading || !description.trim()}
      >
        {loading ? "Analyzing..." : "Analyze"}
      </button>

      {error && (
        <div className="alert alert-danger mt-3">{error}</div>
      )}

      {result && (
        <div className="alert alert-info mt-3">
          Predicted Category: <strong>{result.predicted_category}</strong>
        </div>
      )}
    </div>
  );
}

export default AnalyzeForm;

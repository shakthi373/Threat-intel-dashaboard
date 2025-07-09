import React from "react";
import AnalyzeForm from "../components/AnalyzeForm";

function Analyze() {
  return (
    <div className="container mt-5">
      <h2 className="mb-4">🔮 Analyze a New Threat</h2>

      {/* Help Box */}
      <div className="alert alert-warning">
        <h5>💡 How does Analyze work?</h5>
        <p>
          Paste a threat description below and our AI model will predict its
          threat category.
        </p>
        <p>
          Useful when investigating unknown incidents, phishing emails, or
          suspicious activity not yet in the database.
        </p>
      </div>

      <AnalyzeForm />
    </div>
  );
}

export default Analyze;

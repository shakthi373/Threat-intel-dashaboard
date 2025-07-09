# backend/tests/test_main.py
import sys
import os

# Add backend directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from app.main import app

from fastapi.testclient import TestClient

client = TestClient(app)


def test_get_threats():
    response = client.get("/api/threats?page=1&limit=5")
    assert response.status_code == 200
    data = response.json()

    # Updated key to match actual API response
    assert "data" in data
    assert isinstance(data["data"], list)
    assert "page" in data
    assert "limit" in data
    assert "total" in data

    if data["data"]:  # If there are threats, validate one
        threat = data["data"][0]
        assert "cleaned_threat_description" in threat
        assert "risk_level_prediction" in threat


def test_get_threat_by_id():
    response = client.get("/api/threats/1")
    assert response.status_code in [200, 404, 422]

    if response.status_code == 200:
        threat = response.json()
        assert "id" in threat
        assert "cleaned_threat_description" in threat


def test_get_stats():
    response = client.get("/api/threats/stats")
    assert response.status_code == 200
    stats = response.json()

    assert "total_threats" in stats
    assert "category_details" in stats
    assert isinstance(stats["category_details"], dict)

    assert "threats_by_severity" in stats
    assert isinstance(stats["threats_by_severity"], dict)


def test_analyze_prediction():
    payload = {"description": "This is a ransomware attack with malicious payload."}
    response = client.post("/api/analyze", json=payload)
    assert response.status_code == 200
    result = response.json()

    # Check only keys that are guaranteed
    assert "predicted_category" in result
    assert isinstance(result["predicted_category"], str)

    # Optional keys (if API added  later)
    if "risk_level" in result:
        assert isinstance(result["risk_level"], str)
    if "suggested_defense" in result:
        assert isinstance(result["suggested_defense"], str)
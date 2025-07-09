from pydantic import BaseModel
from typing import Optional, Dict, List
from uuid import UUID


# Base schema for all threats
class ThreatBase(BaseModel):
    id: UUID
    threat_category: str
    severity_score: int
    risk_level_prediction: str
    cleaned_threat_description: str
    geographical_location: str
    threat_actor: str

    class Config:
        from_attributes = True


# Extended schema for detailed threat view
class ThreatDetail(ThreatBase):
    iocs: Optional[Dict[str, str]] = None
    attack_vector: Optional[str] = None
    sentiment_in_forums: Optional[float] = None
    predicted_threat_category: Optional[str] = None
    suggested_defense: Optional[str] = None
    keyword_extraction: Optional[Dict[str, List[str]]] = None
    named_entities: Optional[Dict[str, List[str]]] = None
    topic_model_labels: Optional[Dict[str, float]] = None
    word_count: Optional[int] = None


# Paginated threat list response
class PaginatedThreatResponse(BaseModel):
    data: List[ThreatBase]
    page: int
    limit: int
    total: int


# Stats schema for dashboard
class ExtendedStats(BaseModel):
    total_threats: int
    threats_by_category: Dict[str, int]
    threats_by_severity: Dict[str, int]
    category_details: Dict[str, Dict[str, int]]
    summary: str


# ML analysis request
class PredictionRequest(BaseModel):
    description: str


# ML analysis response
class PredictionResponse(BaseModel):
    predicted_category: str

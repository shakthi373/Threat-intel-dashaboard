from sqlalchemy import Column, String, Integer, Float, Text, JSON, Enum
from .database import Base
import uuid

class Threat(Base):
    __tablename__ = "threats"

    id = Column(String(36), primary_key=True, index=True, default=lambda: str(uuid.uuid4()))
    threat_category = Column(String(100), nullable=False)
    iocs = Column(JSON, nullable=True)
    threat_actor = Column(String(100), nullable=True)
    attack_vector = Column(String(100), nullable=True)
    geographical_location = Column(String(100), nullable=True)
    sentiment_in_forums = Column(Float, nullable=True)
    severity_score = Column(Integer, nullable=True)
    predicted_threat_category = Column(String(100), nullable=True)
    suggested_defense = Column(Text, nullable=True)
    risk_level_prediction = Column(Enum('LOW', 'MEDIUM', 'HIGH'), nullable=True)
    cleaned_threat_description = Column(Text, nullable=False)
    keyword_extraction = Column(JSON, nullable=True)
    named_entities = Column(JSON, nullable=True)
    topic_model_labels = Column(JSON, nullable=True)
    word_count = Column(Integer, nullable=True)

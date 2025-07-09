from sqlalchemy.orm import Session
from sqlalchemy import func
from . import models

def get_threats(db: Session, skip: int = 0, limit: int = 10, search: str = None, category: str = None):
    query = db.query(models.Threat)
    
    if search:
        search_lower = f"%{search.lower()}%"
        query = query.filter(func.lower(models.Threat.cleaned_threat_description).like(search_lower))
    
    if category:
        query = query.filter(func.lower(models.Threat.threat_category) == category.lower())
    
    return query.offset(skip).limit(limit).all()

def get_threat_by_id(db: Session, threat_id: str):
    return db.query(models.Threat).filter(models.Threat.id == threat_id).first()

def get_stats(db: Session):
    total = db.query(func.count(models.Threat.id)).scalar()
    by_category = dict(
        db.query(models.Threat.threat_category, func.count())
        .group_by(models.Threat.threat_category)
        .all()
    )
    by_severity = dict(
        db.query(models.Threat.severity_score, func.count())
        .group_by(models.Threat.severity_score)
        .all()
    )
    return {
        "total_threats": total,
        "threats_by_category": by_category,
        "threats_by_severity": by_severity
    }

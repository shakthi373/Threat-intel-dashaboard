from fastapi import FastAPI, Depends, HTTPException, Query
from sqlalchemy.orm import Session
from . import models, schemas
from .database import SessionLocal, engine
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import func, or_
from sqlalchemy.exc import SQLAlchemyError
from uuid import UUID
from . import ml

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="Threat Intelligence API")

# 🌐 CORS Middleware (for React frontend)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Use "*" during dev, lock down later
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# 📦 Fetch threats with pagination, filtering, search & UUID lookup
@app.get("/api/threats", response_model=schemas.PaginatedThreatResponse)
def read_threats(
    page: int = Query(1, ge=1, description="Page number for pagination"),
    limit: int = Query(10, le=100, description="Number of records per page"),
    id: UUID = Query(None, description="Search by UUID of the threat"),
    category: str = Query(None, description="Filter by threat category"),
    severity: int = Query(None, description="Filter by severity score (1-5)"),
    risk: str = Query(None, description="Filter by risk level (LOW, MEDIUM, HIGH)"),
    search: str = Query(None, description="Search text in description or category"),
    db: Session = Depends(get_db)
):
    query = db.query(models.Threat)

    # 🎯 If UUID is provided, return that specific threat
    if id:
        try:
            query = query.filter(models.Threat.id == str(id))  # 🔥 Cast UUID to string for DB comparison
            total = query.count()
            threats = query.all()
            return schemas.PaginatedThreatResponse(
                data=threats,
                page=page,
                limit=limit,
                total=total
            )
        except SQLAlchemyError as e:
            raise HTTPException(status_code=500, detail="Database error: " + str(e))

    # 🔎 Apply other filters
    if category:
        query = query.filter(func.lower(models.Threat.threat_category) == category.lower())

    if severity:
        query = query.filter(models.Threat.severity_score == severity)

    if risk:
        query = query.filter(models.Threat.risk_level_prediction == risk.upper())

    if search:
        search_lower = f"%{search.lower()}%"
        query = query.filter(
            or_(
                func.lower(models.Threat.cleaned_threat_description).like(search_lower),
                func.lower(models.Threat.threat_category).like(search_lower)
            )
        )

    total = query.count()
    threats = query.offset((page - 1) * limit).limit(limit).all()

    return schemas.PaginatedThreatResponse(
        data=threats,
        page=page,
        limit=limit,
        total=total
    )


# 📊 Get threat statistics (for dashboard)
@app.get("/api/threats/stats", response_model=schemas.ExtendedStats)
def read_stats(db: Session = Depends(get_db)):
    try:
        total_threats = db.query(func.count(models.Threat.id)).scalar() or 0

        threats_by_category = dict(
            db.query(models.Threat.threat_category, func.count(models.Threat.id))
            .group_by(models.Threat.threat_category)
            .all()
        )

        threats_by_severity = dict(
            db.query(models.Threat.risk_level_prediction, func.count(models.Threat.id))
            .group_by(models.Threat.risk_level_prediction)
            .all()
        )

        category_details = {}
        for category, count in threats_by_category.items():
            severity_counts = dict(
                db.query(models.Threat.risk_level_prediction, func.count(models.Threat.id))
                .filter(models.Threat.threat_category == category)
                .group_by(models.Threat.risk_level_prediction)
                .all()
            )
            category_details[category] = severity_counts

        summary = (
            f"There are {total_threats} total threats, "
            f"categorized into {len(threats_by_category)} types: "
            + ", ".join([f"{k} ({v})" for k, v in threats_by_category.items()])
        ) if total_threats > 0 else "No threats in the database."

        return schemas.ExtendedStats(
            total_threats=total_threats,
            threats_by_category=threats_by_category,
            threats_by_severity=threats_by_severity,
            category_details=category_details,
            summary=summary
        )
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error: " + str(e))


# 📄 Get a single threat by UUID (direct endpoint)
@app.get("/api/threats/{threat_id}", response_model=schemas.ThreatDetail)
def read_threat(threat_id: UUID, db: Session = Depends(get_db)):
    try:
        threat = db.query(models.Threat).filter(models.Threat.id == str(threat_id)).first()
        if not threat:
            raise HTTPException(status_code=404, detail="Threat not found")
        return threat
    except SQLAlchemyError as e:
        raise HTTPException(status_code=500, detail="Database error: " + str(e))


# 🤖 Predict threat category from description (ML Integration)
@app.post("/api/analyze", response_model=schemas.PredictionResponse)
def analyze_threat(payload: schemas.PredictionRequest):
    try:
        predicted = ml.predict_category(payload.description)
        return {"predicted_category": predicted}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

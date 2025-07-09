import pandas as pd
from sqlalchemy import create_engine, Column, String, Integer, Float, Text, JSON, Enum
from sqlalchemy.orm import sessionmaker
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.declarative import declarative_base
import uuid

# Database connection
db_url = "mysql+pymysql://root:shakthi3345@localhost/threat_db"

try:
    print("🔌 Connecting to database...")
    engine = create_engine(db_url)
    connection = engine.connect()
    print("✅ Database connection successful!")
    connection.close()
except SQLAlchemyError as e:
    print("❌ Database Connection Failed")
    print(e)
    exit(1)

Base = declarative_base()

class Threat(Base):
    __tablename__ = "threats"

    id = Column(String(36), primary_key=True)
    threat_category = Column(String(100), nullable=False)
    iocs = Column(JSON)
    threat_actor = Column(String(100))
    attack_vector = Column(String(100))
    geographical_location = Column(String(100))
    sentiment_in_forums = Column(Float)
    severity_score = Column(Integer)
    predicted_threat_category = Column(String(100))
    suggested_defense = Column(Text)
    risk_level_prediction = Column(Enum('LOW', 'MEDIUM', 'HIGH'))
    cleaned_threat_description = Column(Text, nullable=False)
    keyword_extraction = Column(JSON)
    named_entities = Column(JSON)
    topic_model_labels = Column(JSON)
    word_count = Column(Integer)

Session = sessionmaker(bind=engine)
session = Session()

# Load CSV
print("📂 Reading CSV file...")
df = pd.read_csv("threats.csv")
print(f"✅ Loaded {len(df)} rows from CSV")

# Clean & prepare data
def clean_row(row):
    return {
        "id": str(uuid.uuid4()),
        "threat_category": row["Threat Category"],
        "iocs": row["IOCs (Indicators of Compromise)"],
        "threat_actor": row["Threat Actor"],
        "attack_vector": row["Attack Vector"],
        "geographical_location": row["Geographical Location"],
        "sentiment_in_forums": row["Sentiment in Forums"],
        "severity_score": row["Severity Score"],
        "predicted_threat_category": row["Predicted Threat Category"],
        "suggested_defense": row["Suggested Defense Mechanism"],
       "risk_level_prediction": map_risk_level(row["Risk Level Prediction"]),

        "cleaned_threat_description": row["Cleaned Threat Description"],
        "keyword_extraction": row["Keyword Extraction"],
        "named_entities": row["Named Entities (NER)"],
        "topic_model_labels": row["Topic Modeling Labels"],
        "word_count": row["Word Count"],
    }
def map_risk_level(value):
    mapping = {
        1: 'LOW',
        2: 'MEDIUM',
        3: 'HIGH',
        4: 'HIGH',    # If "4" means very high risk
        5: 'HIGH'     # Optional, handle "5" if present
    }
    return mapping.get(value, 'LOW')  # Default to 'LOW' if unknown


print("🗄 Inserting data into database...")
cleaned_data = df.apply(clean_row, axis=1).tolist()

try:
    session.bulk_insert_mappings(Threat, cleaned_data)
    session.commit()
    print("🎉 Data ingestion completed successfully!")
except SQLAlchemyError as e:
    print("❌ Data insertion failed!")
    print(e)
finally:
    session.close()
    print("🔒 Database session closed.")

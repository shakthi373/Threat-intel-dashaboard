from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from dotenv import load_dotenv
import os

load_dotenv()


DB_URL = os.getenv("DATABASE_URL")

if not DB_URL:
    raise ValueError("❌ DATABASE_URL is not set in .env file")


engine = create_engine(
    DB_URL,
    echo=True,           # Logs SQL queries (disable in production)
    pool_pre_ping=True   # Checks DB connection health
)


SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

import joblib
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from pathlib import Path
import pandas as pd

MODEL_FILE = Path("app/model.joblib")
DATA_FILE = Path("sample_threats.csv")

_pipeline = None  # Lazy load model once


def train_model():
    print("🔄 Training ML model...")
    if not DATA_FILE.exists():
        raise FileNotFoundError(f"⚠️ Data file not found: {DATA_FILE}")

    df = pd.read_csv(DATA_FILE)
    descriptions = df["Cleaned Threat Description"].dropna().values
    categories = df["Threat Category"].dropna().values

    pipeline = Pipeline([
        ("tfidf", TfidfVectorizer()),
        ("clf", LogisticRegression(max_iter=1000))
    ])

    pipeline.fit(descriptions, categories)
    MODEL_FILE.parent.mkdir(parents=True, exist_ok=True)
    joblib.dump(pipeline, MODEL_FILE)
    print(f"✅ Model trained and saved to {MODEL_FILE}")


def load_model():
    global _pipeline
    if _pipeline is None:
        if not MODEL_FILE.exists():
            raise FileNotFoundError("⚠️ ML model not found. Please run train_model() first.")
        _pipeline = joblib.load(MODEL_FILE)
        print("✅ ML model loaded")
    return _pipeline


def predict_category(description: str):
    if not description.strip():
        raise ValueError("Description cannot be empty.")
    pipeline = load_model()
    return pipeline.predict([description])[0]


if __name__ == "__main__":
    train_model()

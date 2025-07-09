# 🚀 Threat Intelligence Backend (FastAPI + MySQL + ML)

## 🔧 Setup

1. Install dependencies:
```bash
pip install -r requirements.txt
```

2. Train the ML model:
```bash
python train.py
```

3. Start the backend server:
```bash
uvicorn app.main:app --reload
```

4. Visit API docs:
```
http://localhost:8000/docs
```

## 🔐 MySQL Setup

Make sure MySQL is running and your database `threat_intelligence` is created.

**Username**: root  
**Password**: ❗Enter your password in `app/database.py` at `DB_URL`  
**DB Name**: threat_intelligence

## 🐳 Docker Support

### Run with Docker:
```bash
docker-compose up --build
```

### Docker services:
- FastAPI backend: `localhost:8000`
- MySQL DB: `localhost:3306`

## 🔁 Things You Need to Change

- In `app/database.py`: replace `password` in `DB_URL` with your MySQL password.
```python
DB_URL = "mysql+pymysql://root:<your_password>@db/threat_intelligence"
```

- Optional: retrain the model by running `python train.py`

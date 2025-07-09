 # 🛡️ Threat Intelligence Dashboard

A full-stack web application to monitor, browse, and analyze cybersecurity threat data in real-time.  
This dashboard allows the Threat Analysis Team to:  

✅ Visualize key threat statistics  
✅ Search and filter threat reports  
✅ Analyze new threat descriptions with AI predictions  
✅ Run seamlessly in Dockerized environments  

![Threat Intelligence Dashboard Banner](./images/Dashboard-Banner.png)

---

## 📖 Table of Contents
- [🚀 Features](#-features)
- [💻 Technology Stack & Justification](#-technology-stack--justification)
- [📂 Installation & Setup](#-installation--setup)
  - [Local Setup](#local-setup)
  - [Docker Setup](#docker-setup)
- [🧪 Running Tests](#-running-tests)
- [📸 Screenshots](#-screenshots)
- [📊 API Endpoints](#-api-endpoints)
- [🤝 Contributing](#-contributing)
- [📜 License](#-license)

---

## 🚀 Features

### 🌐 Core Features
- 📊 **Real-Time Visualization**
  - Threat category distribution
  - Severity levels breakdown
- 🔎 **Search & Filter Threats**
  - Filter by Category
  - Full-text search on Threat Descriptions
  - Pagination support
- 📁 **Data Ingestion**
  - CLI script to load the Kaggle dataset into the database

### 🧠 Advanced Features
- 🧠 **AI-Powered Threat Analysis**
  - Logistic Regression classifier (TF-IDF + scikit-learn)
  - Predicts Threat Category for new, unverified threat descriptions
- 🐳 **Dockerized Deployment**
  - One-step launch with `docker-compose`
- ✅ **Testing**
  - Unit tests for backend API
  - Component tests for frontend

---

## 💻 Technology Stack & Justification

| Layer          | Technology              | Justification                                                 |
|----------------|--------------------------|----------------------------------------------------------------|
| **Backend**    | Python (Fast API)           | Lightweight REST API, quick ML integration via scikit-learn   |
| **Frontend**   | React.js (Vite)          | Modern SPA framework, fast rendering, responsive UI           |
| **Database**   | SQLite                  | Simple setup for dev, scalable with Postgres in production|
| **ML Model**   | scikit-learn + TF-IDF    | Robust NLP pipeline, quick training, easy to deploy           |
| **Visuals**    | Chart.js + Bootstrap 5   | Interactive charts, clean responsive UI                       |
| **Container**  | Docker + Docker Compose  | Simplifies deployment and environment parity                  |
| **Tests**      | pytest (Backend only)    | Ensures reliability of backend API during prototype phase     |

---

## 📂 Installation & Setup

### 📥 Prerequisites
- Python 3.10+
- Node.js 18+
- Docker & Docker Compose (for containerized setup)
- Kaggle API to download dataset

---

## 🖥️ Local Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/shakthi373/threat-intel-dashboard.git
cd threat-intel-dashboard
```
### 2️⃣ MySQL Setup
#### Create a MySQL database and user:
```bash
CREATE DATABASE threat_intel_db;
CREATE USER 'threat_user'@'localhost' IDENTIFIED BY 'strongpassword';
GRANT ALL PRIVILEGES ON threat_intel_db.* TO 'threat_user'@'localhost';
FLUSH PRIVILEGES;
```
#### 📦 Configure environment variables
#### Create a .env file in the root directory and add:
```bash
DATABASE_URL=mysql+pymysql://root:yourpassword@localhost/threat_db
```
####
### 3️⃣ Set up the backend
#### 🖥️ Create and activate a virtual environment:
```bash
python -m venv venv
source venv/bin/activate    # On Windows use `venv\Scripts\activate`
```
#### Install Dependencies
```bash
pip install -r requirements.txt
```
#### Run ingestion script:
```bash
python ingest_data.py data/threat_data.csv
```
#### Start the Backend Server:
```bash
python app.py
```
#### The API runs at http://localhost:5000.
### 4️⃣  Frontend Setup
```bash
cd frontend
```
#### Install dependencies:
```bash
npm install
```
#### Start frontend development server:
```bash
npm run dev
```
#### Frontend runs at http://localhost:3000.
## 🐳 Docker Setup
### 1️⃣ Build and start all services
```bash
docker-compose up --build
```
#### This will:

##### *Start backend at http://localhost:5000

##### *Start frontend at http://localhost:3000

##### *Run MySQL database in a container
```bash
docker-compose down
```
## 🧪 Running Tests
### ✅ Backend Tests
```bash
pytest tests/backend
```
### ⚠️ Frontend Tests
Frontend component tests were not included in this iteration to prioritize core functionality delivery, including API development, data ingestion, and seamless ML integration.

## 📸 Screenshots

### 📊 Dashboard Overview
![Dashboard Overview](./images/Dashboard-overview.png)

### 🔎 Threat Search
![Threat Search](./images/Search.png)

### 🧠 Threat Analysis
![Threat Analysis](./images/Analyze.png)

---
---
## 📊 API Endpoints
| Endpoint            | Method | Description                                  |
| ------------------- | ------ | -------------------------------------------- |
| `/api/threats`      | GET    | Get paginated list of all threats            |
| `/api/threats/<id>` | GET    | Get details of a specific threat by ID       |
| `/api/analyze`      | POST   | Predict category of a new threat description |


## 🧑‍💻 Contributing
Pull requests welcome. For major changes, open an issue first to discuss.



## 🔗 Links
- 🔥 [GitHub Repository](https://github.com/shakthi373)
- 📝 [LinkedIn](https://www.linkedin.com/in/shakthi-prasad-v-u)

# 🛡️ Threat Intelligence Dashboard

A web-based application to monitor and analyze cybersecurity threats in real-time.  
This dashboard provides visualization of threat data, supports threat searches with filters, and leverages an AI model to predict the category of new threats.  

![Threat Intelligence Dashboard Banner](./images/Dashboard-Banner.png)

---

## 🚀 Features

- 📊 **Real-Time Visualization**: Interactive charts for threat categories and severity levels.
- 🔎 **Search Threats**: Filter threats by category, severity, risk, actor, and location.
- 🧠 **Analyze Threats**: Paste a description of a threat and predict its category using a machine learning model.
- 📁 **Rich Dataset**: Supports large threat datasets with pagination.
- 🔐 **Secure Backend**: JWT-based authentication for API endpoints.

---

## 💻 Tech Stack

| Technology        | Usage                        |
|-------------------|-------------------------------|
| **Python (Flask)**| Backend REST API              |
| **React.js**      | Frontend user interface       |
| **SQLite**        | Lightweight database          |
| **Chart.js**      | Data visualizations           |
| **Bootstrap 5**   | Responsive UI components      |
| **JWT (PyJWT)**   | Authentication & authorization|

---

## 📸 Screenshots

### 📊 Dashboard Overview
![Dashboard Overview](./images/Dashboard-overview.png)

### 🔎 Threat Search
![Threat Search](./images/Search.png)

### 🧠 Threat Analysis
![Threat Analysis](./images/Analyze.png)

---

## 📂 Installation

### Clone the repository
```bash
git clone https://github.com/shakthi373/threat-intel-dashboard.git
cd threat-intel-dashboard
threat-intel-dashboard/
│
├── backend/
│ ├── app.py
│ ├── models.py
│ ├── requirements.txt
│ ├── database.db
│ └── ...
│
├── frontend/
│ ├── src/
│ ├── public/
│ ├── package.json
│ └── ...
│
└── README.md

yaml
Copy
Edit

---

## ⚙️ Installation & Setup

This project is split into **backend (Flask)** and **frontend (React)**. Follow the steps below to get both running locally.

---

### 🖥️ Backend Setup (Flask API)

1. **Navigate to backend folder**
   ```bash
   cd backend
Create and activate virtual environment (recommended)

bash
Copy
Edit
python -m venv venv
source venv/bin/activate      # On Linux/Mac
venv\Scripts\activate         # On Windows
Install Python dependencies

bash
Copy
Edit
pip install -r requirements.txt
Set environment variables (optional)
Create a .env file and add:

env
Copy
Edit
FLASK_APP=app.py
FLASK_ENV=development
SECRET_KEY=your_secret_key
Initialize database (if using SQLite)

bash
Copy
Edit
python
>>> from app import db
>>> db.create_all()
>>> exit()
Run Flask server

bash
Copy
Edit
flask run
The API will be available at: http://127.0.0.1:5000

🌐 Frontend Setup (React App)
Navigate to frontend folder

bash
Copy
Edit
cd frontend
Install Node.js dependencies

bash
Copy
Edit
npm install
Configure API URL (if needed)
Edit .env file or src/config.js and set backend API URL:

env
Copy
Edit
REACT_APP_API_URL=http://127.0.0.1:5000
Start React development server

bash
Copy
Edit
npm start
The frontend will be available at: http://localhost:3000

🔑 Authentication
This app uses JWT (JSON Web Token) for authentication.
Tokens are issued on login and required in the Authorization header for protected API routes:

makefile
Copy
Edit
Authorization: Bearer <your_token_here>
🧪 Testing the Setup
Start the backend (flask run)

Start the frontend (npm start)

Open browser: http://localhost:3000

Log in and explore the dashboard.

👤 Author
Shakthi Prasad VU

🌐 GitHub

💼 LinkedIn

📜 License
This project is licensed under the MIT License.

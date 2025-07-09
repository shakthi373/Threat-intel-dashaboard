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

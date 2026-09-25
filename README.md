# Loan Default Prediction System - Full-Stack Application

An intelligent loan risk assessment and underwriting dashboard powered by **Flask (Scikit-Learn ML)** and a modern **React (Vite + Tailwind CSS)** frontend styled with crisp white primary surfaces and emerald/forest green secondary accents.

---

## 🌟 Key Features

1. **White & Green Modern UI Theme**:
   - Primary: Clean white surfaces, soft slate borders, subtle glassmorphism.
   - Secondary: Emerald and mint green badges, progress indicators, gauges, and glow accents.
2. **5 Machine Learning Classifiers**:
   - Logistic Regression
   - Random Forest
   - Decision Tree
   - AdaBoost
   - Bagging Classifier
   - *Option to run individual models or compare all 5 simultaneously.*
3. **Quick Test Profiles (Presets)**:
   - **Prime (Low Risk)**: High credit score, low DTI, high income.
   - **Moderate Risk**: Average score, auto loan, moderate income.
   - **Subprime (High Risk)**: Low score, high loan amount, elevated DTI.
4. **Interactive Financial & Credit Form**:
   - Income, Loan Amount, Interest Rate, Loan Term, DTI Ratio.
   - Age, Credit Score, Employment duration, Credit Lines.
   - Categorical indicators: Education, Employment type, Marital status, Mortgage, Dependents, Co-signer.
5. **Real-time Backend Connectivity Indicator**:
   - Live health ping indicator with latency monitoring.
   - Automatic reconnect and warning alerts if backend is offline.
6. **Assessment History & Local Storage**:
   - Archives previous evaluations in browser storage with instant reload capabilities.
   - Print / Save evaluation reports.

---

## 🚀 How to Run the Project

### 1. Start the Flask Backend (Port 5000)
Double-click `start_backend.bat` or run:
```bash
cd backend
python app.py
```
*The backend server will start at `http://127.0.0.1:5000`.*

### 2. Start the React Frontend (Port 3000)
Double-click `start_frontend.bat` or run:
```bash
cd frontend
npm run dev
```
*Open your browser and navigate to `http://localhost:3000`.*

---

## 📁 Project Structure

```
ML_Project/
├── backend/
│   ├── app.py                  # Flask REST API with /predict & /
│   ├── requirements.txt        # Backend dependencies
│   ├── scaler.pkl              # Fitted feature standard scaler
│   ├── logistic_model.pkl      # Logistic Regression model
│   ├── rf_model.pkl            # Random Forest model
│   ├── dt_model.pkl            # Decision Tree model
│   ├── adaboost_model.pkl      # AdaBoost model
│   └── bagging_model.pkl       # Bagging Classifier model
├── frontend/
│   ├── index.html              # HTML shell with Google Fonts & Tailwind CDN
│   ├── package.json            # React + Vite dependencies
│   ├── vite.config.js          # Proxy setup to port 5000
│   └── src/
│       ├── App.jsx             # Main Application orchestrator
│       ├── index.css           # Custom scrollbar & green glow effects
│       ├── services/
│       │   └── api.js          # Fetch API client (/predict, ping)
│       └── components/
│           ├── Header.jsx      # Navigation & backend ping status
│           ├── LoanForm.jsx    # Model selector, presets, input groups
│           ├── PredictionResult.jsx # Probability gauge, multi-model breakdown
│           └── HistoryTable.jsx# Assessment log table with reload action
├── start_backend.bat           # 1-click launcher for backend
├── start_frontend.bat          # 1-click launcher for frontend
└── README.md
```
"# LoanMangment" 

import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import LoanForm from './components/LoanForm';
import PredictionResult from './components/PredictionResult';
import HistoryTable from './components/HistoryTable';
import { checkBackendStatus, predictLoanRisk } from './services/api';
import { 
  Sparkles, 
  ShieldCheck, 
  Cpu, 
  Layers, 
  CheckCircle, 
  AlertCircle,
  HelpCircle,
  TrendingUp,
  FileText
} from 'lucide-react';

const INITIAL_FORM = {
  age: 35,
  income: 75000,
  loanamount: 18000,
  creditscore: 720,
  monthsemployed: 48,
  numcreditlines: 3,
  interestrate: 6.5,
  loanterm: 36,
  dtiratio: 0.28,
  education: "Bachelor's",
  employmenttype: 'Full-time',
  maritalstatus: 'Married',
  hasmortgage: 'No',
  hasdependents: 'Yes',
  loanpurpose: 'Home',
  hascosigner: 'No',
  model: 'all',
};

const PRESETS = {
  prime: {
    age: 42,
    income: 110000,
    loanamount: 25000,
    creditscore: 790,
    monthsemployed: 84,
    numcreditlines: 4,
    interestrate: 5.2,
    loanterm: 36,
    dtiratio: 0.18,
    education: "Master's",
    employmenttype: 'Full-time',
    maritalstatus: 'Married',
    hasmortgage: 'No',
    hasdependents: 'No',
    loanpurpose: 'Home',
    hascosigner: 'Yes',
    model: 'all',
  },
  moderate: {
    age: 31,
    income: 52000,
    loanamount: 18000,
    creditscore: 650,
    monthsemployed: 24,
    numcreditlines: 2,
    interestrate: 9.8,
    loanterm: 48,
    dtiratio: 0.38,
    education: "Bachelor's",
    employmenttype: 'Full-time',
    maritalstatus: 'Single',
    hasmortgage: 'No',
    hasdependents: 'No',
    loanpurpose: 'Auto',
    hascosigner: 'No',
    model: 'all',
  },
  subprime: {
    age: 23,
    income: 24000,
    loanamount: 35000,
    creditscore: 510,
    monthsemployed: 6,
    numcreditlines: 7,
    interestrate: 18.5,
    loanterm: 60,
    dtiratio: 0.65,
    education: 'High School',
    employmenttype: 'Part-time',
    maritalstatus: 'Single',
    hasmortgage: 'Yes',
    hasdependents: 'Yes',
    loanpurpose: 'Other',
    hascosigner: 'No',
    model: 'all',
  },
};

export default function App() {
  const [formData, setFormData] = useState(INITIAL_FORM);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [lastSubmittedData, setLastSubmittedData] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('evaluator');

  // Backend connectivity tracking
  const [backendStatus, setBackendStatus] = useState({ online: false, message: 'Checking...' });
  const [checkingStatus, setCheckingStatus] = useState(false);

  // Local storage history
  const [history, setHistory] = useState(() => {
    try {
      const saved = localStorage.getItem('verdant_loan_history');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const refreshStatus = async () => {
    setCheckingStatus(true);
    const status = await checkBackendStatus();
    setBackendStatus(status);
    setCheckingStatus(false);
  };

  useEffect(() => {
    refreshStatus();
    const interval = setInterval(refreshStatus, 20000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await predictLoanRisk(formData);
      setResult(data);
      setLastSubmittedData({ ...formData });

      // Save to history
      const newEntry = {
        timestamp: new Date().toISOString(),
        input: { ...formData },
        result: data,
      };
      const updatedHistory = [newEntry, ...history.slice(0, 49)];
      setHistory(updatedHistory);
      try {
        localStorage.setItem('verdant_loan_history', JSON.stringify(updatedHistory));
      } catch (e) {
        console.warn('Storage quota exceeded');
      }

      // Smooth scroll to results
      setTimeout(() => {
        const el = document.getElementById('prediction-results-anchor');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);

    } catch (err) {
      setError(err.message || 'Failed to communicate with prediction service');
    } finally {
      setLoading(false);
    }
  };

  const handleApplyPreset = (presetKey) => {
    if (PRESETS[presetKey]) {
      setFormData(PRESETS[presetKey]);
    }
  };

  const handleReset = () => {
    setFormData(INITIAL_FORM);
    setResult(null);
    setError(null);
  };

  const handleSelectHistoryItem = (item) => {
    setFormData(item.input);
    setResult(item.result);
    setLastSubmittedData(item.input);
    setActiveTab('evaluator');
    setTimeout(() => {
      const el = document.getElementById('prediction-results-anchor');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('verdant_loan_history');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      
      {/* Top Navigation */}
      <Header
        backendStatus={backendStatus}
        checkingStatus={checkingStatus}
        onRefreshStatus={refreshStatus}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        historyCount={history.length}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Hero Banner with White & Emerald Gradient Accent */}
        <section className="relative overflow-hidden bg-white border border-emerald-100 rounded-3xl p-6 sm:p-10 shadow-sm">
          <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-br from-emerald-100/60 to-emerald-50/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold tracking-wide uppercase mb-3">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              Next-Gen Machine Learning Underwriting
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Intelligent Loan <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-green-600">Default Prediction</span>
            </h1>
            <p className="mt-3 text-slate-600 text-sm sm:text-base leading-relaxed">
              Evaluate borrower creditworthiness across 5 enterprise-grade ML classifiers (Logistic Regression, Random Forest, Decision Tree, AdaBoost, and Bagging) calibrated for credit risk mitigation.
            </p>

            {/* Quick Feature Badges */}
            <div className="mt-6 flex flex-wrap gap-4 text-xs font-semibold text-slate-600">
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Standardized Feature Scaler</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Multi-Classifier Probability Scoring</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>Sub-second Flask Inference</span>
              </div>
            </div>
          </div>
        </section>

        {/* Backend Offline Warning Banner if not reachable */}
        {!backendStatus.online && (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3 text-amber-900 text-xs sm:text-sm">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <p className="font-bold">Live Backend Server is currently unreachable (https://loanmangment-1.onrender.com)</p>
              <p className="mt-0.5 text-amber-800">
                Render free tier services spin down after inactivity. It may take 30-50 seconds for the server to wake up. Please wait a moment and try again.
              </p>
            </div>
          </div>
        )}

        {/* Tab 1: Risk Evaluator View */}
        {activeTab === 'evaluator' && (
          <div className="space-y-8">
            {/* Error Notification Alert */}
            {error && (
              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl flex items-start justify-between gap-3 text-rose-900 text-sm">
                <div className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  <span><strong>Assessment Error:</strong> {error}</span>
                </div>
                <button 
                  onClick={() => setError(null)}
                  className="text-xs font-bold text-rose-700 hover:underline cursor-pointer"
                >
                  Dismiss
                </button>
              </div>
            )}

            {/* Assessment Input Form */}
            <LoanForm
              formData={formData}
              setFormData={setFormData}
              onSubmit={handleSubmit}
              loading={loading}
              onReset={handleReset}
              onApplyPreset={handleApplyPreset}
            />

            {/* Anchor for scroll navigation */}
            <div id="prediction-results-anchor"></div>

            {/* Results Presentation */}
            {result && (
              <PredictionResult 
                result={result} 
                applicantData={lastSubmittedData || formData} 
              />
            )}
          </div>
        )}

        {/* Tab 2: Historical Assessments View */}
        {activeTab === 'history' && (
          <HistoryTable
            history={history}
            onClearHistory={handleClearHistory}
            onSelectHistoryItem={handleSelectHistoryItem}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8 mt-12 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
            <span className="font-bold text-slate-700">VerdantCredit Underwriting Suite</span>
            <span>• Powered by Scikit-Learn & React</span>
          </div>
          <div>
            Built with modern React, Tailwind CSS (White & Emerald Palette), and Flask REST API
          </div>
        </div>
      </footer>

    </div>
  );
}

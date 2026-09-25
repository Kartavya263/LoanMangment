import React from 'react';
import { 
  CheckCircle2, 
  AlertTriangle, 
  TrendingDown, 
  TrendingUp, 
  Percent, 
  Shield, 
  Info,
  Layers,
  ArrowRight,
  Download,
  Share2
} from 'lucide-react';

export default function PredictionResult({ result, applicantData }) {
  if (!result) return null;

  const isHighRisk = result.prediction === 1;
  const models = [
    { key: 'logistic_regression', name: 'Logistic Regression', info: result.logistic_regression },
    { key: 'random_forest', name: 'Random Forest', info: result.random_forest },
    { key: 'decision_tree', name: 'Decision Tree', info: result.decision_tree },
    { key: 'adaboost', name: 'AdaBoost', info: result.adaboost },
    { key: 'bagging', name: 'Bagging Classifier', info: result.bagging },
  ].filter(m => !!m.info);

  // Compute average probability across available models if probabilities exist
  const modelsWithProb = models.filter(m => m.info.probability !== null && m.info.probability !== undefined);
  const avgProb = modelsWithProb.length > 0
    ? (modelsWithProb.reduce((acc, curr) => acc + curr.info.probability, 0) / modelsWithProb.length)
    : null;

  const primaryProb = models[0]?.info?.probability !== null && models[0]?.info?.probability !== undefined 
    ? models[0].info.probability 
    : avgProb;

  const probPercentage = primaryProb !== null ? Math.round(primaryProb * 100) : null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Primary Verdict Banner */}
      <div 
        className={`rounded-2xl p-6 sm:p-8 border shadow-sm transition-all ${
          isHighRisk 
            ? 'bg-gradient-to-br from-rose-50 via-white to-orange-50 border-rose-200' 
            : 'bg-gradient-to-br from-emerald-50 via-white to-teal-50 border-emerald-200'
        }`}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-md ${
              isHighRisk ? 'bg-rose-500 text-white shadow-rose-200' : 'bg-emerald-600 text-white shadow-emerald-200'
            }`}>
              {isHighRisk ? <AlertTriangle className="w-8 h-8" /> : <CheckCircle2 className="w-8 h-8" />}
            </div>
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                  isHighRisk 
                    ? 'bg-rose-100 text-rose-800 border-rose-200' 
                    : 'bg-emerald-100 text-emerald-800 border-emerald-200'
                }`}>
                  AI Prediction Outcome
                </span>
                <span className="text-xs text-slate-500 font-medium">
                  {new Date().toLocaleTimeString()}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                {result.risk_status}
              </h2>
              <p className="text-sm text-slate-600 mt-1 max-w-xl">
                {isHighRisk 
                  ? 'High probability of repayment default detected based on credit history and debt leverage factors.'
                  : 'Low default probability. Profile exhibits strong creditworthiness and manageable debt parameters.'}
              </p>
            </div>
          </div>

          {/* Probability Gauge / Metric */}
          {probPercentage !== null && (
            <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 border border-slate-200/80 shadow-xs flex md:flex-col items-center justify-between md:justify-center min-w-[170px] text-right md:text-center">
              <div>
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                  Default Probability
                </span>
                <span className={`text-3xl sm:text-4xl font-black ${
                  probPercentage >= 50 ? 'text-rose-600' : 'text-emerald-600'
                }`}>
                  {probPercentage}%
                </span>
              </div>
              
              <div className="w-28 bg-slate-100 rounded-full h-2 mt-2 overflow-hidden border border-slate-200">
                <div 
                  className={`h-full rounded-full transition-all duration-700 ${
                    probPercentage >= 50 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, Math.max(5, probPercentage))}%` }}
                ></div>
              </div>
            </div>
          )}
        </div>

        {/* Quick Action Strip */}
        <div className="mt-6 pt-4 border-t border-slate-200/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-600">
            <Shield className="w-4 h-4 text-emerald-600" />
            <span>Assessed using trained multi-classifier pipeline with standard feature scaling.</span>
          </div>
          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-slate-50 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-emerald-600" />
            Save / Print Assessment
          </button>
        </div>
      </div>

      {/* Multi-Model Breakdown Matrix */}
      {models.length > 0 && (
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <Layers className="w-5 h-5 text-emerald-600" />
                Multi-Model Performance Matrix
              </h3>
              <p className="text-xs text-slate-500">Cross-validation across diverse ML architectures</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200">
              {models.length} {models.length === 1 ? 'Model Evaluated' : 'Models Compared'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {models.map((m) => {
              const modelIsDefault = m.info.prediction === 1;
              const prob = m.info.probability !== null && m.info.probability !== undefined 
                ? (m.info.probability * 100).toFixed(1) + '%' 
                : 'N/A';

              return (
                <div 
                  key={m.key}
                  className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 hover:bg-white hover:border-emerald-300 transition-all shadow-2xs flex flex-col justify-between space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-sm text-slate-800">{m.name}</h4>
                      <span className="text-[11px] text-slate-500 font-mono">key: {m.key}</span>
                    </div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                      modelIsDefault 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {modelIsDefault ? 'High Risk' : 'Low Risk'}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Default Probability:</span>
                    <span className="font-bold text-slate-900 font-mono text-sm">{prob}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Key Risk Factors & Recommendations */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <h3 className="font-bold text-slate-900 flex items-center gap-2">
          <Info className="w-5 h-5 text-emerald-600" />
          Financial Health Breakdown & Recommendations
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Debt-to-Income (DTI)</span>
            <div className="flex items-center gap-2">
              <span className={`text-base font-bold ${
                (applicantData?.dtiratio || 0) > 0.4 ? 'text-rose-600' : 'text-emerald-700'
              }`}>
                {((applicantData?.dtiratio || 0) * 100).toFixed(0)}%
              </span>
              <span className="text-xs text-slate-500">
                {(applicantData?.dtiratio || 0) > 0.4 ? '(Elevated)' : '(Healthy)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Industry standard guideline recommends keeping DTI under 36-40%.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Credit Score Bracket</span>
            <div className="flex items-center gap-2">
              <span className={`text-base font-bold ${
                (applicantData?.creditscore || 0) < 640 ? 'text-rose-600' : 'text-emerald-700'
              }`}>
                {applicantData?.creditscore || 0}
              </span>
              <span className="text-xs text-slate-500">
                {(applicantData?.creditscore || 0) >= 700 ? '(Excellent)' : (applicantData?.creditscore || 0) >= 640 ? '(Good)' : '(Subprime)'}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Higher score significantly drives down predicted default chances.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200">
            <span className="text-xs text-slate-500 font-semibold block mb-1">Loan-to-Income Exposure</span>
            <div className="flex items-center gap-2">
              <span className="text-base font-bold text-slate-800">
                {applicantData?.income > 0 
                  ? ((applicantData?.loanamount / applicantData?.income) * 100).toFixed(0) + '%' 
                  : 'N/A'}
              </span>
              <span className="text-xs text-slate-500">of annual earnings</span>
            </div>
            <p className="text-[11px] text-slate-500 mt-1">
              Loan of ${Number(applicantData?.loanamount || 0).toLocaleString()} against ${Number(applicantData?.income || 0).toLocaleString()} salary.
            </p>
          </div>
        </div>
      </div>

    </div>
  );
}

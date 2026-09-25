import React from 'react';
import { 
  DollarSign, 
  Percent, 
  Calendar, 
  User, 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Home, 
  Users, 
  Target, 
  ShieldAlert, 
  SlidersHorizontal,
  Sparkles,
  RotateCcw,
  Zap
} from 'lucide-react';

export default function LoanForm({
  formData,
  setFormData,
  onSubmit,
  loading,
  onReset,
  onApplyPreset
}) {
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'number' ? (value === '' ? '' : parseFloat(value)) : value,
    }));
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Quick Fill Preset Buttons */}
      <div className="bg-emerald-50/60 border border-emerald-100 rounded-2xl p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-emerald-900 font-semibold text-xs tracking-wide uppercase">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            Quick Test Profiles
          </div>
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => onApplyPreset('prime')}
              className="px-3 py-1.5 bg-white text-emerald-800 text-xs font-semibold rounded-lg border border-emerald-200 hover:bg-emerald-50 hover:border-emerald-300 transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Prime (Low Risk)
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('moderate')}
              className="px-3 py-1.5 bg-white text-amber-800 text-xs font-semibold rounded-lg border border-amber-200 hover:bg-amber-50 hover:border-amber-300 transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-amber-500"></span>
              Moderate Risk
            </button>
            <button
              type="button"
              onClick={() => onApplyPreset('subprime')}
              className="px-3 py-1.5 bg-white text-rose-800 text-xs font-semibold rounded-lg border border-rose-200 hover:bg-rose-50 hover:border-rose-300 transition-all shadow-xs flex items-center gap-1.5"
            >
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Subprime (High Risk)
            </button>
          </div>
        </div>
      </div>

      {/* Model Selection Selector */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <label className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <SlidersHorizontal className="w-4 h-4 text-emerald-600" />
            Machine Learning Engine Selection
          </label>
          <span className="text-xs text-emerald-700 bg-emerald-50 font-medium px-2 py-0.5 rounded-md border border-emerald-100">
            Backend Pickles
          </span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {[
            { id: 'all', label: 'All Models (Ensemble)', badge: 'Recommended' },
            { id: 'logistic', label: 'Logistic Regression', badge: 'Fast' },
            { id: 'random_forest', label: 'Random Forest', badge: 'High Accuracy' },
            { id: 'decision_tree', label: 'Decision Tree', badge: 'Rule-based' },
            { id: 'adaboost', label: 'AdaBoost', badge: 'Boosting' },
            { id: 'bagging', label: 'Bagging Classifier', badge: 'Ensemble' },
          ].map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, model: item.id }))}
              className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                formData.model === item.id
                  ? 'border-emerald-500 bg-emerald-50/70 text-emerald-950 ring-2 ring-emerald-500/20 shadow-xs'
                  : 'border-slate-200 bg-white hover:border-emerald-300 hover:bg-slate-50 text-slate-700'
              }`}
            >
              <span className="text-xs font-bold leading-tight">{item.label}</span>
              <span className={`text-[10px] mt-2 font-medium px-1.5 py-0.5 rounded inline-block w-fit ${
                formData.model === item.id ? 'bg-emerald-200/60 text-emerald-900' : 'bg-slate-100 text-slate-500'
              }`}>
                {item.badge}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Group 1: Loan & Financial Parameters */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-emerald-600" />
            Financial & Loan Structure
          </h3>
          <p className="text-xs text-slate-500">Requested loan amount, income benchmarks, and rate structures</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Annual Income ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm font-semibold">$</span>
              <input
                type="number"
                name="income"
                required
                min="0"
                step="500"
                value={formData.income}
                onChange={handleChange}
                placeholder="65000"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Loan Amount ($)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-slate-400 text-sm font-semibold">$</span>
              <input
                type="number"
                name="loanamount"
                required
                min="500"
                step="500"
                value={formData.loanamount}
                onChange={handleChange}
                placeholder="15000"
                className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Interest Rate (%)
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 text-sm font-semibold">%</span>
              <input
                type="number"
                name="interestrate"
                required
                min="0"
                max="50"
                step="0.1"
                value={formData.interestrate}
                onChange={handleChange}
                placeholder="7.5"
                className="w-full pl-3 pr-8 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Loan Term (Months)
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                name="loanterm"
                required
                min="6"
                max="360"
                step="6"
                value={formData.loanterm}
                onChange={handleChange}
                placeholder="36"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              DTI Ratio (Debt-to-Income)
            </label>
            <div className="relative">
              <Percent className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                name="dtiratio"
                required
                min="0"
                max="1"
                step="0.01"
                value={formData.dtiratio}
                onChange={handleChange}
                placeholder="0.25 (e.g. 25%)"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Loan Purpose
            </label>
            <div className="relative">
              <Target className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <select
                name="loanpurpose"
                value={formData.loanpurpose}
                onChange={handleChange}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer"
              >
                <option value="Home">Home</option>
                <option value="Auto">Auto</option>
                <option value="Business">Business</option>
                <option value="Education">Education</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Group 2: Credit Profile & History */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <Briefcase className="w-5 h-5 text-emerald-600" />
            Credit History & Employment
          </h3>
          <p className="text-xs text-slate-500">Applicant creditworthiness and employment duration</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Applicant Age
            </label>
            <div className="relative">
              <User className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                name="age"
                required
                min="18"
                max="100"
                value={formData.age}
                onChange={handleChange}
                placeholder="32"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Credit Score (300 - 850)
            </label>
            <div className="relative">
              <ShieldAlert className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                name="creditscore"
                required
                min="300"
                max="850"
                value={formData.creditscore}
                onChange={handleChange}
                placeholder="710"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Months Employed
            </label>
            <div className="relative">
              <Calendar className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                name="monthsemployed"
                required
                min="0"
                max="600"
                value={formData.monthsemployed}
                onChange={handleChange}
                placeholder="48"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Existing Credit Lines
            </label>
            <div className="relative">
              <Percent className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="number"
                name="numcreditlines"
                required
                min="0"
                max="50"
                value={formData.numcreditlines}
                onChange={handleChange}
                placeholder="3"
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Group 3: Demographic & Risk Indicators */}
      <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm space-y-4">
        <div className="border-b border-slate-100 pb-3">
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <GraduationCap className="w-5 h-5 text-emerald-600" />
            Demographics & Security Factors
          </h3>
          <p className="text-xs text-slate-500">Education, obligations, and co-signer presence</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Education</label>
            <select
              name="education"
              value={formData.education}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="High School">High School</option>
              <option value="Bachelor's">Bachelor's</option>
              <option value="Master's">Master's</option>
              <option value="PhD">PhD</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Employment Type</label>
            <select
              name="employmenttype"
              value={formData.employmenttype}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Self-employed">Self-employed</option>
              <option value="Unemployed">Unemployed</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Marital Status</label>
            <select
              name="maritalstatus"
              value={formData.maritalstatus}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Existing Mortgage?</label>
            <select
              name="hasmortgage"
              value={formData.hasmortgage}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Has Dependents?</label>
            <select
              name="hasdependents"
              value={formData.hasdependents}
              onChange={handleChange}
              className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm font-medium focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all appearance-none cursor-pointer"
            >
              <option value="No">No</option>
              <option value="Yes">Yes</option>
            </select>
          </div>
        </div>

        <div className="pt-2">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-slate-700">Has Co-Signer on Application:</span>
            <div className="flex gap-2">
              {['No', 'Yes'].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, hascosigner: val }))}
                  className={`px-4 py-1.5 rounded-lg text-xs font-bold border transition-all ${
                    formData.hascosigner === val
                      ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Action CTA Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={onReset}
          className="w-full sm:w-auto px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold text-sm hover:bg-slate-100 transition-all flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-4 h-4" />
          Reset Form
        </button>

        <button
          type="submit"
          disabled={loading}
          className="w-full sm:w-auto px-8 py-3.5 bg-gradient-to-r from-emerald-600 via-emerald-500 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold text-base rounded-xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all active:scale-[0.98] disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
        >
          {loading ? (
            <>
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Running Machine Learning Inference...</span>
            </>
          ) : (
            <>
              <Zap className="w-5 h-5 fill-current" />
              <span>Evaluate Loan Default Risk</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}

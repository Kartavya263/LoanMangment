import React from 'react';
import { 
  ShieldCheck, 
  Activity, 
  RefreshCw, 
  Sparkles, 
  History, 
  Cpu, 
  TrendingUp, 
  CheckCircle2, 
  AlertCircle 
} from 'lucide-react';

export default function Header({ 
  backendStatus, 
  checkingStatus, 
  onRefreshStatus, 
  activeTab, 
  setActiveTab,
  historyCount
}) {
  return (
    <header className="bg-white/95 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-40 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo & Brand Identity */}
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-emerald-600 to-green-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/25 ring-4 ring-emerald-50">
              <ShieldCheck className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-xl tracking-tight text-slate-900">
                  Verdant<span className="text-emerald-600">Credit</span>
                </span>
                <span className="px-2 py-0.5 text-[11px] font-semibold tracking-wide uppercase bg-emerald-50 text-emerald-700 rounded-full border border-emerald-200/80">
                  AI v2.4
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium hidden sm:block">
                Multi-Model Loan Risk Intelligence & Default Analytics
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="hidden md:flex items-center p-1 bg-slate-100/80 rounded-xl border border-slate-200/70">
            <button
              onClick={() => setActiveTab('evaluator')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === 'evaluator'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/50'
              }`}
            >
              <Cpu className="w-4 h-4 text-emerald-600" />
              Risk Evaluator
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all relative ${
                activeTab === 'history'
                  ? 'bg-white text-emerald-800 shadow-sm'
                  : 'text-slate-600 hover:text-emerald-700 hover:bg-white/50'
              }`}
            >
              <History className="w-4 h-4 text-emerald-600" />
              History
              {historyCount > 0 && (
                <span className="ml-1 px-1.5 py-0.2 text-[10px] font-bold bg-emerald-600 text-white rounded-full">
                  {historyCount}
                </span>
              )}
            </button>
          </nav>

          {/* Backend Connectivity Status Pill */}
          <div className="flex items-center gap-3">
            <div 
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                backendStatus.online 
                  ? 'bg-emerald-50 text-emerald-800 border-emerald-200' 
                  : 'bg-rose-50 text-rose-700 border-rose-200'
              }`}
              title={backendStatus.message || 'Connecting to backend...'}
            >
              <span className="relative flex h-2 w-2">
                {backendStatus.online ? (
                  <>
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </>
                ) : (
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-rose-500"></span>
                )}
              </span>
              <span className="font-semibold hidden sm:inline">
                {backendStatus.online ? 'Flask API Online' : 'Backend Offline'}
              </span>
              {backendStatus.latencyMs && (
                <span className="text-[10px] text-emerald-600 font-mono hidden md:inline">
                  {backendStatus.latencyMs}ms
                </span>
              )}
            </div>

            <button
              onClick={onRefreshStatus}
              disabled={checkingStatus}
              title="Ping Backend Server"
              className="p-2 text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl border border-slate-200 transition-all active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${checkingStatus ? 'animate-spin text-emerald-600' : ''}`} />
            </button>
          </div>

        </div>

        {/* Mobile Tab Nav */}
        <div className="flex md:hidden border-t border-slate-100 py-2 gap-2">
          <button
            onClick={() => setActiveTab('evaluator')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all ${
              activeTab === 'evaluator'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            Risk Evaluator
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold text-center transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'history'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 text-slate-600'
            }`}
          >
            History {historyCount > 0 && `(${historyCount})`}
          </button>
        </div>
      </div>
    </header>
  );
}

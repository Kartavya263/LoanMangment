import React from 'react';
import { 
  History, 
  Trash2, 
  Clock, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle,
  ArrowUpRight
} from 'lucide-react';

export default function HistoryTable({ 
  history, 
  onClearHistory, 
  onSelectHistoryItem 
}) {
  if (history.length === 0) {
    return (
      <div className="bg-white border border-slate-200 rounded-2xl p-12 text-center shadow-sm">
        <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-3">
          <History className="w-6 h-6" />
        </div>
        <h3 className="font-bold text-slate-800 text-base">No Assessment History Yet</h3>
        <p className="text-slate-500 text-xs mt-1 max-w-sm mx-auto">
          Run predictions using the Risk Evaluator to build an archive of loan evaluations and model comparison records.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">
      <div className="p-5 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 flex items-center gap-2">
            <History className="w-5 h-5 text-emerald-600" />
            Evaluation History
          </h3>
          <p className="text-xs text-slate-500">Stored locally in your browser session ({history.length} records)</p>
        </div>
        <button
          onClick={onClearHistory}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-rose-200 text-rose-600 hover:bg-rose-50 text-xs font-semibold transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-50 text-slate-600 font-semibold uppercase tracking-wider border-b border-slate-200/80">
            <tr>
              <th className="py-3.5 px-4">Time</th>
              <th className="py-3.5 px-4">Loan Details</th>
              <th className="py-3.5 px-4">Applicant Credit</th>
              <th className="py-3.5 px-4">Model Engine</th>
              <th className="py-3.5 px-4">AI Risk Verdict</th>
              <th className="py-3.5 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 font-medium">
            {history.map((item, index) => {
              const isHighRisk = item.result?.prediction === 1;
              return (
                <tr key={index} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-4 text-slate-500 whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-slate-900">
                      ${Number(item.input.loanamount || 0).toLocaleString()}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      {item.input.loanpurpose} • {item.input.loanterm} mos @ {item.input.interestrate}%
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-800">
                      Score: {item.input.creditscore}
                    </div>
                    <div className="text-[11px] text-slate-500">
                      Income: ${Number(item.input.income || 0).toLocaleString()} • DTI: {item.input.dtiratio}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[11px] font-mono capitalize">
                      {item.input.model || 'all'}
                    </span>
                  </td>
                  <td className="py-3 px-4 whitespace-nowrap">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                      isHighRisk 
                        ? 'bg-rose-100 text-rose-800 border border-rose-200' 
                        : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
                    }`}>
                      {isHighRisk ? <AlertTriangle className="w-3.5 h-3.5" /> : <CheckCircle2 className="w-3.5 h-3.5" />}
                      {item.result?.risk_status || 'Unknown'}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => onSelectHistoryItem(item)}
                      className="px-2.5 py-1 rounded-md text-emerald-700 hover:bg-emerald-50 font-semibold inline-flex items-center gap-1 transition-colors"
                    >
                      Reload
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

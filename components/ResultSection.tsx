import React, { useState } from "react";
import { ExplainAnalysis } from "../types";
import { 
  Activity, 
  AlertTriangle, 
  Lightbulb, 
  Database, 
  Zap, 
  CheckCircle2, 
  Copy,
  ArrowRight
} from "./ui/Icons";

interface ResultSectionProps {
  analysis: ExplainAnalysis;
}

export const ResultSection: React.FC<ResultSectionProps> = ({ analysis }) => {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Summary Card */}
      <div className="bg-white rounded-2xl p-8 border border-slate-100 shadow-soft">
         <div className="flex flex-col sm:flex-row gap-6">
           <div className="flex-shrink-0">
             <div className="w-12 h-12 rounded-xl bg-violet-50 text-violet-600 flex items-center justify-center">
                <Activity className="w-6 h-6" />
             </div>
           </div>
           <div className="space-y-3">
             <h3 className="text-xl font-bold text-slate-900">Resumo da Análise</h3>
             <p className="text-slate-600 leading-relaxed text-base">
               {analysis.summary}
             </p>
           </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issues */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-amber-50 rounded-lg text-amber-500">
               <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Problemas Detectados</h3>
          </div>
          <ul className="space-y-3">
             {analysis.issues.map((issue, idx) => (
               <li key={idx} className="flex gap-3 text-sm text-slate-600">
                 <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-400 flex-shrink-0" />
                 <span>{issue}</span>
               </li>
             ))}
             {analysis.issues.length === 0 && (
               <li className="text-sm text-slate-400 italic">Nenhum problema crítico encontrado.</li>
             )}
           </ul>
        </div>

        {/* Insights */}
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
               <Lightbulb className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-slate-900">Insights do Planner</h3>
          </div>
          <ul className="space-y-3">
             {analysis.insights.map((insight, idx) => (
               <li key={idx} className="flex gap-3 text-sm text-slate-600">
                 <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
                 <span>{insight}</span>
               </li>
             ))}
           </ul>
        </div>
      </div>

      {/* Index Recommendations */}
      <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-md transition-shadow">
        <div className="flex items-center gap-3 mb-6">
           <div className="p-2 bg-emerald-50 rounded-lg text-emerald-500">
              <Database className="w-5 h-5" />
           </div>
           <h3 className="font-bold text-slate-900">Índices Recomendados</h3>
        </div>
        
        <div className="space-y-4">
          {analysis.index_recommendations.length > 0 ? (
            analysis.index_recommendations.map((rec, idx) => (
              <div key={idx} className="group relative rounded-xl border border-slate-200 bg-slate-50/50 p-4 hover:border-emerald-200 hover:bg-emerald-50/30 transition-colors">
                <code className="block w-full overflow-x-auto text-sm font-mono text-emerald-700">
                  {rec}
                </code>
                <CopyButton text={rec} />
              </div>
            ))
          ) : (
             <div className="flex items-center gap-2 text-sm text-slate-500">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Nenhum índice faltando detectado.</span>
             </div>
          )}
        </div>
      </div>

      {/* Query Suggestions */}
      {analysis.query_suggestions.length > 0 && (
        <div className="bg-white rounded-2xl p-6 border border-slate-100 shadow-soft hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 mb-6">
             <div className="p-2 bg-purple-50 rounded-lg text-purple-500">
                <Zap className="w-5 h-5" />
             </div>
             <h3 className="font-bold text-slate-900">Otimizações de Query</h3>
          </div>
          
           <div className="space-y-4">
            {analysis.query_suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex gap-4 p-5 rounded-xl bg-slate-50 border border-slate-100 hover:bg-purple-50/30 transition-colors">
                 <ArrowRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                 <div className="text-sm text-slate-700 leading-relaxed font-mono whitespace-pre-wrap">
                   {suggestion}
                 </div>
              </div>
            ))}
           </div>
        </div>
      )}
    </div>
  );
};

// Helper for Copy Button logic
const CopyButton = ({ text }: { text: string }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="absolute right-2 top-2 p-1.5 rounded-lg text-slate-400 hover:bg-white hover:text-emerald-600 hover:shadow-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      title="Copiar"
    >
      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};
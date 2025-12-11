import React, { useState } from "react";
import { ExplainAnalysis } from "../types";
import { Card } from "./ui/Card";
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
      
      {/* Summary Card - Hero Style */}
      <div className="relative overflow-hidden rounded-xl border border-primary/10 bg-gradient-to-br from-primary/5 via-background to-background p-1">
        <div className="bg-background/50 backdrop-blur-sm rounded-lg p-6 sm:p-8">
           <div className="flex items-start gap-4">
             <div className="mt-1 p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                <Activity className="w-6 h-6" />
             </div>
             <div className="space-y-2">
               <h3 className="text-xl font-bold text-foreground">Resumo da Análise</h3>
               <p className="text-base leading-relaxed text-muted-foreground">
                 {analysis.summary}
               </p>
             </div>
           </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Issues */}
        <Card 
          title="Problemas de Performance" 
          description="Gargalos detectados no plano"
          icon={<AlertTriangle className="w-5 h-5 text-amber-500" />}
          className="md:col-span-1 border-amber-200/50 dark:border-amber-900/30 bg-amber-50/10 dark:bg-amber-950/5"
        >
           <ul className="space-y-3">
             {analysis.issues.map((issue, idx) => (
               <li key={idx} className="flex gap-3 text-sm">
                 <span className="mt-0.5 flex h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                 <span className="text-foreground/90">{issue}</span>
               </li>
             ))}
             {analysis.issues.length === 0 && (
               <li className="text-sm text-muted-foreground italic">Nenhum problema crítico encontrado. Ótimo trabalho!</li>
             )}
           </ul>
        </Card>

        {/* Insights */}
        <Card 
          title="Insights Técnicos" 
          description="Entendendo as decisões do planner"
          icon={<Lightbulb className="w-5 h-5 text-indigo-500" />}
          className="md:col-span-1 border-indigo-200/50 dark:border-indigo-900/30 bg-indigo-50/10 dark:bg-indigo-950/5"
        >
           <ul className="space-y-3">
             {analysis.insights.map((insight, idx) => (
               <li key={idx} className="flex gap-3 text-sm">
                 <span className="mt-0.5 flex h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                 <span className="text-foreground/90">{insight}</span>
               </li>
             ))}
           </ul>
        </Card>
      </div>

      {/* Index Recommendations */}
      <Card 
        title="Recomendações de Índices" 
        description="Sugestões para melhorar a performance"
        icon={<Database className="w-5 h-5 text-emerald-500" />}
        className="border-emerald-200/50 dark:border-emerald-900/30 bg-emerald-50/10 dark:bg-emerald-950/5"
      >
        <div className="space-y-4">
          {analysis.index_recommendations.length > 0 ? (
            analysis.index_recommendations.map((rec, idx) => (
              <div key={idx} className="group relative rounded-lg border border-border bg-card p-4 hover:bg-accent/50 transition-colors">
                <code className="block w-full overflow-x-auto text-sm font-mono text-emerald-700 dark:text-emerald-400">
                  {rec}
                </code>
                <CopyButton text={rec} />
              </div>
            ))
          ) : (
             <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Nenhum índice faltando detectado.</span>
             </div>
          )}
        </div>
      </Card>

      {/* Query Suggestions */}
      {analysis.query_suggestions.length > 0 && (
        <Card 
          title="Sugestões de Query" 
          description="Otimizações e reescritas"
          icon={<Zap className="w-5 h-5 text-purple-500" />}
          className="border-purple-200/50 dark:border-purple-900/30 bg-purple-50/10 dark:bg-purple-950/5"
        >
           <div className="space-y-4">
            {analysis.query_suggestions.map((suggestion, idx) => (
              <div key={idx} className="flex gap-4 p-4 rounded-lg bg-background/50 border border-border/50">
                 <ArrowRight className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                 <div className="text-sm text-foreground/90 leading-relaxed font-mono whitespace-pre-wrap">
                   {suggestion}
                 </div>
              </div>
            ))}
           </div>
        </Card>
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
      className="absolute right-2 top-2 p-1.5 rounded-md text-muted-foreground hover:bg-background hover:text-foreground hover:shadow-sm transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
      title="Copiar para área de transferência"
    >
      {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
    </button>
  );
};
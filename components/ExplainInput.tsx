import React, { useState } from "react";
import { Sparkles, Terminal } from "./ui/Icons";

interface ExplainInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

export const ExplainInput: React.FC<ExplainInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-10">
      
      {/* Hero Section */}
      <div className="text-center space-y-6 py-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.1]">
          <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
            PG Explain Doctor
          </span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Diagnóstico rápido e inteligente para suas queries PostgreSQL. 
          Entenda gargalos e otimize a performance do seu banco de dados em segundos.
        </p>
        
        <div className="flex items-center justify-center gap-4 pt-2">
           <div className="px-4 py-1 rounded-full bg-violet-100 dark:bg-violet-900/30 text-violet-700 dark:text-violet-300 text-xs font-semibold uppercase tracking-wider border border-violet-200 dark:border-violet-800">
              Impulsionado por Gemini 2.5
           </div>
        </div>
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="relative group w-full max-w-4xl mx-auto">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 rounded-2xl opacity-30 blur group-hover:opacity-50 transition duration-500"></div>
        <div className="relative rounded-2xl bg-card shadow-2xl transition-all">
          <div className="absolute top-4 left-4 text-muted-foreground pointer-events-none z-10">
            <Terminal className="w-5 h-5 opacity-40" />
          </div>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Cole o output do seu EXPLAIN (ANALYZE, BUFFERS) aqui...
Exemplo:
Seq Scan on users  (cost=0.00..123.00 rows=1000 width=32)
  Filter: (age > 25)"
            className="flex min-h-[280px] w-full rounded-2xl bg-background/50 border border-border px-12 py-5 text-sm font-mono placeholder:text-muted-foreground/40 focus:bg-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet-500/20 resize-y"
            spellCheck={false}
          />
          
          <div className="absolute bottom-4 right-4 z-10">
             <button
              type="submit"
              disabled={isLoading || !text.trim()}
              className={`
                inline-flex items-center justify-center gap-2 rounded-full px-8 py-3 text-sm font-bold shadow-lg transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50
                ${text.trim() 
                  ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:scale-[1.02] hover:shadow-violet-500/25' 
                  : 'bg-muted text-muted-foreground'}
              `}
            >
              {isLoading ? (
                <>
                  <svg className="h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Analisando...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  Analisar Query
                </>
              )}
            </button>
          </div>
        </div>
      </form>
      
      <div className="text-center text-xs text-muted-foreground opacity-60">
        Compatível com formatos EXPLAIN PostgreSQL 12+
      </div>
    </div>
  );
};
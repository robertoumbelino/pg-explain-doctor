import React, { useState } from "react";
import { Sparkles, ArrowRight } from "./ui/Icons";

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
    <div className="w-full max-w-4xl mx-auto space-y-12 flex flex-col items-center">
      
      {/* Hero Header */}
      <div className="text-center space-y-6 flex flex-col items-center animate-in fade-in slide-in-from-bottom-8 duration-700">
        
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-[10px] font-bold tracking-widest text-violet-600 uppercase">
          <Sparkles className="w-3 h-3" />
          <span>Powered by AI</span>
        </div>

        {/* Title */}
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-slate-900">
          PG Explain<span className="text-violet-600">.</span>Doctor
        </h1>

        {/* Subtitle */}
        <p className="text-lg md:text-xl text-slate-500 font-light max-w-2xl mx-auto leading-relaxed">
          Cole seu plano de execução do PostgreSQL e deixe nossa IA 
          encontrar os gargalos e otimizar suas queries.
        </p>
      </div>

      {/* Input Area - Clean Card Style */}
      <form onSubmit={handleSubmit} className="w-full max-w-3xl relative">
        <div className="relative group">
          {/* Glow effect behind */}
          <div className="absolute -inset-1 bg-gradient-to-r from-violet-100 to-indigo-50 rounded-[2rem] blur opacity-50 group-hover:opacity-75 transition duration-500"></div>
          
          <div className="relative bg-white rounded-[1.5rem] shadow-soft border border-slate-100 p-2 transition-all focus-within:ring-4 focus-within:ring-violet-50/50">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Cole seu EXPLAIN ANALYZE aqui..."
              className="w-full min-h-[160px] md:min-h-[100px] bg-transparent border-none rounded-xl px-6 py-4 text-slate-700 placeholder:text-slate-300 font-mono text-sm resize-y focus:outline-none"
              spellCheck={false}
            />
            
            {/* Toolbar / Actions Footer within the card */}
            <div className="flex items-center justify-between px-2 pb-2 pt-2 border-t border-slate-50 mt-2">
              <div className="text-xs text-slate-400 pl-4 font-medium hidden sm:block">
                Suporta JSON, Texto e YAML
              </div>
              
              <button
                type="submit"
                disabled={isLoading || !text.trim()}
                className={`
                  flex items-center gap-2 px-6 py-2.5 rounded-xl font-medium text-sm transition-all duration-300
                  ${text.trim() 
                    ? 'bg-slate-500 hover:bg-slate-600 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5' 
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'}
                `}
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Analisando...</span>
                  </>
                ) : (
                  <>
                    <span>Iniciar Análise</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
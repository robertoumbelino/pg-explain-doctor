import React, { useState, useEffect } from "react";
import { ExplainInput } from "./components/ExplainInput";
import { ResultSection } from "./components/ResultSection";
import { analyzeExplainPlan } from "./services/geminiService";
import { ExplainAnalysis } from "./types";

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<ExplainAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Force dark mode
    const root = window.document.documentElement;
    root.classList.add("dark");
  }, []);

  const handleAnalyze = async (text: string) => {
    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    try {
      const result = await analyzeExplainPlan(text);
      setAnalysis(result);
    } catch (err: any) {
      setError(err.message || "Ocorreu um erro inesperado ao analisar o plano.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans selection:bg-primary/30 selection:text-primary-foreground bg-dot-pattern">
      <main className="flex-1 container mx-auto max-w-6xl px-4 py-8 md:py-16 flex flex-col items-center gap-12">
        {/* Intro / Input Section */}
        <section className="w-full">
           <ExplainInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </section>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-4xl mx-auto p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-sm flex items-center justify-center animate-in fade-in slide-in-from-top-2">
            <span className="font-medium mr-2">Erro:</span> {error}
          </div>
        )}

        {/* Results Section */}
        {analysis && (
          <section className="w-full">
            <ResultSection analysis={analysis} />
          </section>
        )}
      </main>

      <footer className="py-8 text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} PG Explain Doctor • Construído com Gemini 2.5 Flash</p>
      </footer>
    </div>
  );
};

export default App;
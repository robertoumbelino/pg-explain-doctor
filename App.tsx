import React, { useState } from "react";
import { ExplainInput } from "./components/ExplainInput";
import { ResultSection } from "./components/ResultSection";
import { analyzeExplainPlan } from "./services/geminiService";
import { ExplainAnalysis } from "./types";

const App: React.FC = () => {
  const [analysis, setAnalysis] = useState<ExplainAnalysis | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
    <div className="flex-1 flex flex-col">
      <main className="flex-1 container mx-auto max-w-5xl px-4 py-12 md:py-20 flex flex-col items-center gap-12">
        {/* Intro / Input Section */}
        <section className="w-full">
           <ExplainInput onAnalyze={handleAnalyze} isLoading={isLoading} />
        </section>

        {/* Error Message */}
        {error && (
          <div className="w-full max-w-4xl mx-auto p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm flex items-center justify-center animate-in fade-in slide-in-from-top-2">
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

      <footer className="py-8 text-center text-xs text-muted-foreground/60">
        <p>© {new Date().getFullYear()} PG Explain Doctor • Powered by Gemini 2.5</p>
      </footer>
    </div>
  );
};

export default App;
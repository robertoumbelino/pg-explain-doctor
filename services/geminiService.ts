import { GoogleGenAI, Type, Schema } from "@google/genai";
import { ExplainAnalysis } from "../types";

const ANALYSIS_SCHEMA: Schema = {
  type: Type.OBJECT,
  properties: {
    summary: {
      type: Type.STRING,
      description: "Um resumo conciso do problema de performance ou estado geral do plano da query (Em Português).",
    },
    issues: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Lista de gargalos específicos de performance (ex: Sequential Scans em tabelas grandes, sorts externos, nós de alto custo) (Em Português).",
    },
    insights: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Insights técnicos sobre o motivo da escolha do planner (ex: erros de estimativa de cardinalidade, estratégias de join) (Em Português).",
    },
    index_recommendations: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Comandos SQL CREATE INDEX específicos ou sugestões de quais colunas precisam de indexação.",
    },
    query_suggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Sugestões de como reescrever a query para melhor performance ou legibilidade (Em Português).",
    },
  },
  required: ["summary", "issues", "insights", "index_recommendations", "query_suggestions"],
};

export const analyzeExplainPlan = async (explainText: string): Promise<ExplainAnalysis> => {
  if (!process.env.API_KEY) {
    throw new Error("API Key is missing. Please set the API_KEY environment variable.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const systemInstruction = `
    Você é um Especialista em Performance PostgreSQL e Administrador de Banco de Dados (DBA).
    Seu objetivo é analisar o output de 'EXPLAIN', 'EXPLAIN ANALYZE' ou 'EXPLAIN (JSON)' fornecido pelo usuário.
    
    IMPORTANTE: TODA A RESPOSTA DEVE ESTAR EM PORTUGUÊS DO BRASIL (pt-BR).

    Foque em:
    1. Custos totais e por nó.
    2. Sequential Scans (Seq Scan) em tabelas grandes vs Index Scans.
    3. Filtros não seletivos.
    4. Nested Loops pesados ou Hash Joins com uso de disco (spills).
    5. Sorts Externos (Disk merge).
    6. Erros de estimativa de cardinalidade (rows=X vs actual rows=Y).
    
    Forneça conselhos acionáveis.
    Se você sugerir um índice, forneça a sintaxe SQL válida.
    Se a query puder ser reescrita (ex: mudando IN para EXISTS, removendo funções em colunas indexadas), sugira isso.
    
    Seja profissional, direto e didático para desenvolvedores.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [
        {
          role: "user",
          parts: [{ text: `Analise este plano EXPLAIN do PostgreSQL:\n\n${explainText}` }],
        },
      ],
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: ANALYSIS_SCHEMA,
        temperature: 0.2, 
      },
    });

    const text = response.text;
    if (!text) {
      throw new Error("Nenhuma resposta recebida da IA.");
    }

    return JSON.parse(text) as ExplainAnalysis;
  } catch (error) {
    console.error("Error analyzing explain plan:", error);
    throw error;
  }
};
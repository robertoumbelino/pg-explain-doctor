export interface ExplainAnalysis {
  summary: string;
  issues: string[];
  insights: string[];
  index_recommendations: string[];
  query_suggestions: string[];
}

export interface HistoryItem {
  id: string;
  timestamp: number;
  querySnippet: string;
  analysis: ExplainAnalysis;
}

export type Theme = 'light' | 'dark';

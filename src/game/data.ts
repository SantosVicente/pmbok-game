import type { CategoryId, CategoryMeta, GameItem } from "./types";

export const HINT_BANK: Record<CategoryId, { title: string; clues: string[] }> =
  {
    stakeholders: {
      title: "Partes Interessadas",
      clues: [
        "O foco aqui é entender quem tem interesse no projeto.",
        "Procure por termos relacionados a pessoas, grupos ou organizações.",
        "Pergunta-guia: quais itens descrevem quem é afetado ou tem poder?",
      ],
    },
    governance: {
      title: "Governança",
      clues: [
        "Aqui o tema é controle, regras e autoridade.",
        "Procure por palavras que indiquem direção, monitoramento ou conformidade.",
        "Pergunta-guia: quais itens falam sobre como o projeto é dirigido e monitorado?",
      ],
    },
    schedule: {
      title: "Cronograma",
      clues: [
        "Tudo aqui gira em torno de sequenciamento e tempo.",
        "Palavras-chave: rede, marcos, ciclos e caminho critico.",
        "Pergunta-guia: quais itens ajudam a prever datas?",
      ],
    },
    risk: {
      title: "Riscos",
      clues: [
        "A ideia central e identificar ameacas e respostas.",
        "Procure itens com analise de probabilidade e impacto.",
        "Pergunta-guia: o que mede incerteza e plano de contingencia?",
      ],
    },
  };

export const COLORS = {
  purple: {
    bg: "rgba(139,92,246,0.18)",
    border: "#8b5cf6",
    text: "#c4b5fd",
    solid: "#8b5cf6",
  },
  green: {
    bg: "rgba(34,197,94,0.15)",
    border: "#22c55e",
    text: "#86efac",
    solid: "#22c55e",
  },
  yellow: {
    bg: "rgba(234,179,8,0.15)",
    border: "#eab308",
    text: "#fde047",
    solid: "#eab308",
  },
  red: {
    bg: "rgba(239,68,68,0.15)",
    border: "#ef4444",
    text: "#fca5a5",
    solid: "#ef4444",
  },
} as const;

export const CATEGORY_META: CategoryMeta[] = [
  {
    id: "stakeholders",
    label: "Partes Interessadas",
    color: "purple",
    emoji: "🤝",
  },
  {
    id: "governance",
    label: "Gerenciamento da Governança",
    color: "green",
    emoji: "🛡️",
  },
  {
    id: "schedule",
    label: "Gerenciamento do Cronograma",
    color: "yellow",
    emoji: "⏱️",
  },
  { id: "risk", label: "Gerenciamento de Riscos", color: "red", emoji: "⚠️" },
];

export const ALL_ITEMS: GameItem[] = [
  // Partes Interessadas (Stakeholders)
  { id: 1, text: "Engajamento", category: "stakeholders" },
  { id: 2, text: "Expectativas", category: "stakeholders" },
  { id: 3, text: "Investimento", category: "stakeholders" },
  { id: 4, text: "Patrocinador", category: "stakeholders" },

  // Governança (O que será entregue)
  { id: 5, text: "Autoridade", category: "governance" },
  { id: 6, text: "Requisitos", category: "governance" },
  { id: 7, text: "Políticas", category: "governance" },
  { id: 8, text: "Auditoria", category: "governance" },

  // Cronograma (O tempo)
  { id: 9, text: "Prazos", category: "schedule" },
  { id: 10, text: "Sprint", category: "schedule" },
  { id: 11, text: "Tarefas", category: "schedule" },
  { id: 12, text: "Datas", category: "schedule" },

  // Riscos (Incertezas e Respostas)
  { id: 13, text: "Ameaças", category: "risk" },
  { id: 14, text: "Oportunidades", category: "risk" },
  { id: 15, text: "Forças", category: "risk" },
  { id: 16, text: "Fraquezas", category: "risk" },
];

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

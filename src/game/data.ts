import type { CategoryId, CategoryMeta, GameItem } from "./types";

export const HINT_BANK: Record<CategoryId, { title: string; clues: string[] }> =
  {
    integration: {
      title: "Integração",
      clues: [
        "Pense nos artefatos que conectam o projeto de ponta a ponta.",
        "Inclui governança geral: abertura, plano consolidado e mudanças.",
        "Pergunta-guia: o que mantém todas as áreas alinhadas?",
      ],
    },
    scope: {
      title: "Escopo",
      clues: [
        "A ideia central é identificar o que será entregue e seus limites.",
        "Procure termos ligados a requisitos e decomposicao de trabalho.",
        "Pergunta-guia: quais itens descrevem entregas e limites?",
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
    id: "integration",
    label: "Gerenciamento da Integração",
    color: "purple",
    emoji: "🔗",
  },
  {
    id: "scope",
    label: "Gerenciamento do Escopo",
    color: "green",
    emoji: "📐",
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
  // Integração (O que une o projeto)
  { id: 1, text: "Autorização", category: "integration" },
  { id: 2, text: "Mudanças", category: "integration" },
  { id: 3, text: "Encerramento", category: "integration" },
  { id: 4, text: "Visão Geral", category: "integration" },

  // Escopo (O que será entregue)
  { id: 5, text: "Decomposição", category: "scope" },
  { id: 6, text: "Entregas", category: "scope" },
  { id: 7, text: "Requisitos", category: "scope" },
  { id: 8, text: "Limites", category: "scope" },

  // Cronograma (O tempo)
  { id: 9, text: "Prazos", category: "schedule" },
  { id: 10, text: "Marcos", category: "schedule" },
  { id: 11, text: "Datas", category: "schedule" },
  { id: 12, text: "Atividades", category: "schedule" },

  // Riscos (Incertezas e Respostas)
  { id: 13, text: "Ameaças", category: "risk" },
  { id: 14, text: "Oportunidades", category: "risk" },
  { id: 15, text: "Incertezas", category: "risk" },
  { id: 16, text: "Contingência", category: "risk" },
];

export function shuffle<T>(arr: readonly T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

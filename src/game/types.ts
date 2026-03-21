export type CategoryId = "integration" | "scope" | "schedule" | "risk";

export type CategoryColor = "purple" | "green" | "yellow" | "red";

export type CategoryMeta = {
  id: CategoryId;
  label: string;
  color: CategoryColor;
  emoji: string;
};

export type GameItem = {
  id: number;
  text: string;
  category: CategoryId;
};

export type Particle = {
  x: number;
  y: number;
  r: number;
  dx: number;
  dy: number;
  alpha: number;
};

export type HintEntry = {
  id: string;
  title: string;
  detail: string;
};

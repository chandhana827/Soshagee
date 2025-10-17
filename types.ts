
export enum ReactionType {
  HEART = 'HEART',
  LIGHTBULB = 'LIGHTBULB',
  SAD = 'SAD',
}

export type Reactions = Record<ReactionType, number>;

export interface Confession {
  id: number;
  text: string;
  aiThoughts: string;
  reactions: Reactions;
}

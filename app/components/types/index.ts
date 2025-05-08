export type CardSize = 'small' | 'medium' | 'large';
export type CardType = 'about' | 'experience' | 'skills' | 'projects' | 'contact';

export interface CardData {
  id: string;
  type: CardType;
  title: string;
  size: CardSize;
  content: {
    short: React.ReactNode;
    expanded: React.ReactNode;
  };
  expanded: boolean;
}

export interface Position {
  row: number;
  col: number;
  rowSpan: number;
  colSpan: number;
}
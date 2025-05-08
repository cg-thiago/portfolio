export type CardSize = 'small' | 'medium' | 'large';

export interface CardData {
  id: string;
  title: string;
  description?: string;
  size: CardSize;
  image?: string;
  link?: string;
  type?: string;
  expanded?: boolean;
  content?: {
    short: React.ReactNode;
    expanded: React.ReactNode;
  };
} 
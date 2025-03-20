export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';

export type Category = {
  id: number;
  title: string;
  slug: string;
};

export type Answer = {
  id: number;
  text: string;
  correct: boolean;
};

export type Question = {
  id: number;
  text: string;
  answers: Answer[];
  category: Category;
};
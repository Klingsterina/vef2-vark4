export type UiState = 'initial' | 'loading' | 'error' | 'data' | 'empty';

export type Category = {
  id: number;
  title: string;
  slug: string;
  questions: Question[];
};

export type Answer = {
  id: number;
  questionId: number;
  body: string;
  correct: boolean;
};

export type Question = {
  id: number;
  body: string;
  answers: Answer[];
  categorySlug: string;
};

export type AnswerPostBody = {
  body: string;
  correct: boolean;
};

export type QuestionPostBody = {
  body: string;
  categorySlug: string;
  answers: AnswerPostBody[];
};

export type CategoryPostBody = {
  title: string;
};
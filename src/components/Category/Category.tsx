'use client';

import { QuestionsApi } from '@/api';
import { Category as TCategory, UiState } from '@/types';
import { JSX, useEffect, useState } from 'react';
import { Question } from '../Question/Question';

export function Category({ slug }: { slug: string }): JSX.Element {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [category, setCategory] = useState<TCategory | null>(null);

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');
      const api = new QuestionsApi();
      const response: TCategory | null = await api.getCategory(slug);
      console.log("response", response);

      if (!response) {
        setUiState('error');
      } else if (response.questions.length === 0) {
        setUiState('empty');
      } else {
        setUiState('data');
        setCategory(response);
      }
    }
    fetchData();
  }, [slug]);

  switch (uiState) {
    case 'loading':
      return <p>Sæki gögn...</p>;
    case 'error':
      return <p>404: Villa við að sækja gögn</p>;
    case 'empty':
      return <p>Engin gögn fundust</p>;
    case 'data':
      console.log(category);
      return (
        <ol className='question-list'>
          {category && category.questions.map((question) => (
            <Question key={question.id} question={question} />
          ))}
        </ol>
      );
    case 'initial':
      return <p>Þú hefur ekki valið flokk</p>;
  }
}
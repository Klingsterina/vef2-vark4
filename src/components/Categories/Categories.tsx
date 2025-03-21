'use client';

import { QuestionsApi } from '@/api';
import { Category, UiState } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import ErrorComponent from '../Error/ErrorComponent';

// type Props = {
//   title: string;
//   tag?: string;
//   popular?: boolean;
// };

export default function Categories() {
  const [uiState, setUiState] = useState<UiState>('initial');
  const [categories, setCategories] = useState<Category[] | null>(
    null,
  );

  useEffect(() => {
    async function fetchData() {
      setUiState('loading');

      const api = new QuestionsApi();
      const categoriesResponse = await api.getCategories();

      if (!categoriesResponse) {
        setUiState('error');
      } else if(categoriesResponse.length === 0) {
        setUiState('empty');
      } else {
        setUiState('data');
        setCategories(categoriesResponse);
      }
    }
    fetchData();
  }, []);

  console.log(categories);

  return (
    <div className={styles.container}>
      {uiState === 'loading' && <p>Sæki flokka</p>}
      {uiState === 'error' && <ErrorComponent />}
      {uiState === 'data' && (
        <ul>
          {categories?.map((category: Category, index: number) => (
            <li className={styles.flokkar} key={index}>
              <Link className={styles.Link} href={`/categories/${category.slug}`}>{category.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
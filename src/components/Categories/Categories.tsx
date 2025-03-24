'use client';

import { QuestionsApi } from '@/api';
import { Category, UiState } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import ErrorComponent from '../Error/ErrorComponent';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faCircleMinus } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

config.autoAddCss = false;
library.add(faCircleMinus);

export default function Categories({ showDeleteIcons }: { showDeleteIcons: boolean }) {
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

  async function handleDeleteCategory(categorySlug: string) {
    const agreed = confirm('Ertu viss um að þú viljir eyða þessum flokki?');

    if (!agreed) return;
    const api = new QuestionsApi();
    const success = await api.deleteCategory(categorySlug);
  
    if (success) {
      setCategories(prev =>
        prev?.filter(category => category.slug !== categorySlug) || null
      );
    } else {
      alert('Tókst ekki að eyða flokknum.');
    }
  }
  

  return (
    <div style={{ marginBottom: '20px'}}>
      {uiState === 'loading' && <p style={{paddingBottom:"10px"}}>Sæki flokka....</p>}
      {uiState === 'error' && <ErrorComponent />}
      {uiState === 'data' && (
        <ul>
          {categories?.map((category: Category, index: number) => (
            <li className={styles.flokkar} key={index}>
              {showDeleteIcons && (
                <FontAwesomeIcon
                  icon={['fas', 'circle-minus']}
                  className={styles.delete}
                  onClick={() => handleDeleteCategory(category.slug)}
                />
              )}
              <Link className={styles.link} href={`/categories/${category.slug}`}>{category.title}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
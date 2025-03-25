'use client';

import { QuestionsApi } from '@/api';
import { Category, UiState } from '@/types';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './Categories.module.css';
import ErrorComponent from '../Error/ErrorComponent';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faCircleMinus, faPencil } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

config.autoAddCss = false;
library.add(faCircleMinus);
library.add(faPencil);

export default function Categories({ showDeleteIcons, showPatchIcon }: { showDeleteIcons: boolean, showPatchIcon: boolean }) {
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

  async function handlePatchCategories(categorySlug: string) {
    const newTitle = prompt('Sláðu inn nýjan titil á flokkinn');
    if (!newTitle) return;
    if (newTitle.length > 20) {
      alert('Titill má að hámarki vera 20 stafir!');
      return;
    }
    const api = new QuestionsApi();
    const success = await api.patchCategory(categorySlug, newTitle);

    if (success) {
      const newSlug = newTitle.toLowerCase().replace(/ /g, '-');
      setCategories(prev =>
        prev?.map(category =>
          category.slug === categorySlug
            ? { ...category, title: newTitle, slug: newSlug }
            : category
        ) || null
      );
    } else {
      alert('Tókst ekki að breyta flokknum.');
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
              {showPatchIcon && (
                <FontAwesomeIcon 
                  icon={['fas', 'pencil']}
                  className={styles.pen}
                  onClick={() => handlePatchCategories(category.slug)}
                />
              )}
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
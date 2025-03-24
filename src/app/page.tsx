'use client';

import styles from "./page.module.css";
import Categories from "@/components/Categories/Categories";
import Link from 'next/link';
import { config, library } from '@fortawesome/fontawesome-svg-core';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';

config.autoAddCss = false;
library.add(faTrashCan);

export default function Home() {
  const [showDeleteIcons, setShowDeleteIcons] = useState(false);

  return (
    <div className={styles.container} style={{ position: 'relative' }}>
      <h1>Flokkar</h1>
      <FontAwesomeIcon
        className={styles.trash}
        icon={['fas', 'trash-can']}
        onClick={() => setShowDeleteIcons(prev => !prev)}
        style={{ cursor: 'pointer' }}
      />
      <Categories showDeleteIcons={showDeleteIcons} />
      <Link className={styles.tilbaka} href="/addCategory">Bæta við flokk</Link>
    </div>
  );
}

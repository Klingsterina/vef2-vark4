import Link from "next/link";

import styles from './Navigation.module.css'

export default function Navigation() {
  return (
    <div className={styles.links}>
        <Link className={styles.tilbaka} href="/">Forsíða</Link>
    </div>
  );
}
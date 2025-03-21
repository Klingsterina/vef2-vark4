
import styles from "./page.module.css";
import Categories from "@/components/Categories/Categories";
import Link from 'next/link';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>Flokkar</h1>
      <Categories/>
      <Link className={styles.tilbaka} href="/addCategory">Bæta við flokk</Link>
    </div>
  );
}
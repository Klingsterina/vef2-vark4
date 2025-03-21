
import styles from "./page.module.css";
import Navigation from "@/components/Navigation/Navigation";
import Categories from "@/components/Categories/Categories";

export default function Home() {
  return (
    <div className={styles.page}>
      <Navigation />
      <h1>Forsíða</h1>
      <Categories title="Allir flokkar"/>
    </div>
  );
}
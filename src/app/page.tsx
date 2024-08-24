"use client";
import styles from "./page.module.css";
import { useRouter } from "next/navigation";
// import styles from "../styles/Home.module.css";
export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <h1>Code Notebook</h1>
      <p>Keep all your coding notes in one place.</p>
      <button
        className={styles.startButton}
        onClick={() => router.push("/notes")}
      >
        Get Started
      </button>
    </div>
  );
}

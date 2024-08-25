"use client";
import Link from "next/link";
import styles from "@/styles/HomePage.module.css";
import { useRouter } from "next/navigation";
// import styles from "../styles/Home.module.css";
export default function Home() {
  const router = useRouter();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Your Digital Home for Code Notes</h1>
        <p>
          Organize, edit, and manage your coding notes with ease. Never lose
          track of your brilliant ideas again!
        </p>
        <Link href="/notes" className={styles.getStartedButton}>
          Get Started
        </Link>
      </header>

      <section className={styles.features}>
        <h2>Why Choose Code Notebook?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <h3>Create Notes</h3>
            <p>
              Quickly jot down your thoughts and code snippets with our
              intuitive editor.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Code Samples</h3>
            <p>
              Include formatted code samples in your notes with syntax
              highlighting.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Easy Navigation</h3>
            <p>
              Find and manage your notes effortlessly with powerful search and
              organization tools.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Cloud Sync</h3>
            <p>
              Access your notes from anywhere with seamless cloud
              synchronization.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Secure Storage</h3>
            <p>
              Keep your code snippets and notes safe with our robust security
              measures.
            </p>
          </div>
          <div className={styles.featureItem}>
            <h3>Collaboration</h3>
            <p>
              Share your notes and collaborate with team members in real-time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

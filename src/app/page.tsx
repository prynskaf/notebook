"use client";
import Link from "next/link";
import styles from "@/styles/HomePage.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";

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
          <span> Get Started</span>
          <Image
            src="/right-arrow.png"
            alt="right-arrow.png"
            width={20}
            height={20}
          />
        </Link>
      </header>

      <section className={styles.features}>
        <h2>Why Choose Code Notebook?</h2>
        <div className={styles.featureGrid}>
          <div className={styles.featureItem}>
            <Image
              src="/pencil.png"
              width={40}
              height={40}
              alt=" pencil logo"
              className={styles.featuresIcon}
            />
            <h3>Create Notes</h3>
            <p>
              Quickly jot down your thoughts and code snippets with our
              intuitive editor.
            </p>
          </div>
          <div className={styles.featureItem}>
            <Image
              src="/code.png"
              width={50}
              height={50}
              alt=" code logo"
              className={styles.featuresIcon}
            />
            <h3>Code Samples</h3>
            <p>
              Include formatted code samples in your notes with syntax
              highlighting.
            </p>
          </div>
          <div className={styles.featureItem}>
            <Image
              src="/magnifying-glass.png"
              width={45}
              height={45}
              alt=" magnifying-glass logo"
              className={styles.featuresIcon}
            />
            <h3>Easy Navigation</h3>
            <p>
              Find and manage your notes effortlessly with powerful search and
              organization tools.
            </p>
          </div>
          <div className={styles.featureItem}>
            <Image
              src="/cloud.png"
              width={45}
              height={45}
              alt=" cloud logo"
              className={styles.featuresIcon}
            />
            <h3>Cloud Sync</h3>
            <p>
              Access your notes from anywhere with seamless cloud
              synchronization.
            </p>
          </div>
          <div className={styles.featureItem}>
            <Image
              src="/padlock.png"
              width={45}
              height={45}
              alt="padlock logo"
              className={styles.featuresIcon}
            />
            <h3>Secure Storage</h3>
            <p>
              Keep your code snippets and notes safe with our robust security
              measures.
            </p>
          </div>
          <div className={styles.featureItem}>
            <Image
              src="/nodes.png"
              width={45}
              height={45}
              alt="node logo"
              className={styles.featuresIcon}
            />
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

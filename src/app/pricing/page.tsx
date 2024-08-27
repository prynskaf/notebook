import React from "react";
import styles from "@/styles/PricingPage.module.css";
import { FaEdit, FaFolderOpen, FaCloud } from "react-icons/fa";

const PricingPage = () => {
  return (
    <div className={styles.pricingPage}>
      <section className={styles.featuresSection}>
        <h2>Features</h2>
        <div className={styles.featuresGrid}>
          <div className={styles.feature}>
            <FaEdit className={styles.icon} />
            <div>
              <h3>Rich Text Editing</h3>
              <p>
                Create and edit your notes with a powerful rich text editor,
                supporting syntax highlighting for various programming
                languages.
              </p>
            </div>
          </div>
          <div className={styles.feature}>
            <FaFolderOpen className={styles.icon} />
            <div>
              <h3>Organized Storage</h3>
              <p>
                Keep your notes organized with folders, tags, and a powerful
                search function to quickly find what you need.
              </p>
            </div>
          </div>
          <div className={styles.feature}>
            <FaCloud className={styles.icon} />
            <div>
              <h3>Cloud Sync</h3>
              <p>
                Access your notes from anywhere with automatic cloud
                synchronization across all your devices.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.pricingSection}>
        <h2>Choose Your Plan</h2>
        <div className={styles.pricingGrid}>
          <div className={styles.pricingCard}>
            <h3>Basic</h3>
            <p className={styles.price}>$0/month</p>
            <ul className={styles.featuresList}>
              <li>Up to 100 notes</li>
              <li>Basic text editing</li>
              <li>5GB storage</li>
            </ul>
            <button className={styles.ctaButton}>Get Started</button>
          </div>
          <div className={styles.pricingCard}>
            <h3>Pro</h3>
            <p className={styles.price}>$9.99/month</p>
            <ul className={styles.featuresList}>
              <li>Unlimited notes</li>
              <li>Advanced rich text editing</li>
              <li>50GB storage</li>
              <li>Priority support</li>
            </ul>
            <button className={styles.ctaButton}>Upgrade to Pro</button>
          </div>
          <div className={styles.pricingCard}>
            <h3>Team</h3>
            <p className={styles.price}>$24.99/month</p>
            <ul className={styles.featuresList}>
              <li>Everything in Pro</li>
              <li>Collaboration features</li>
              <li>100GB storage</li>
              <li>Admin controls</li>
            </ul>
            <button className={styles.ctaButton}>Start Team Plan</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;

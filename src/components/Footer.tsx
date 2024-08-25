import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Code Notebook. All rights reserved.</p>
      <div className={styles.socialLinks}>
        <Link href="https://twitter.com">
          <img src="/icons/twitter.svg" alt="Twitter" />
        </Link>
        <Link href="https://github.com">
          <img src="/icons/github.svg" alt="GitHub" />
        </Link>
        <Link href="https://linkedin.com">
          <img src="/icons/linkedin.svg" alt="LinkedIn" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

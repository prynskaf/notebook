import React from "react";
import styles from "./Footer.module.css";
import Link from "next/link";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Code Notebook. All rights reserved.</p>
      <div className={styles.socialLinks}>
        <Link href="https://twitter.com">
          <Image src="/twitter.png" width={5} height={5} alt="Twitter" />
        </Link>
        <Link href="https://github.com">
          <Image src="/github.png" width={5} height={5} alt="GitHub" />
        </Link>
        <Link href="https://linkedin.com">
          <Image src="/linkedin.png" width={5} height={5} alt="LinkedIn" />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

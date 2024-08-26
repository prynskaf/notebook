import React from "react";
import styles from "@/styles/Footer.module.css";
import Link from "next/link";
import Image from "next/image";
import { FaLinkedin, FaGithub, FaTwitter } from "react-icons/fa";
const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>© 2024 Code Notebook. All rights reserved.</p>
      <div className={styles.socialLinks}>
        <Link href="https://twitter.com">
          <FaTwitter style={{ color: "white" }} />
        </Link>
        <Link href="https://github.com">
          <FaGithub style={{ color: "white" }} />
        </Link>
        <Link href="https://linkedin.com">
          <FaLinkedin style={{ color: "white" }} />
        </Link>
      </div>
    </footer>
  );
};

export default Footer;

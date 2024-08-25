"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useUser, UserButton, useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import styles from "./Navbar.module.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();
  const { signOut } = useClerk();
  const router = useRouter();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleSignOut = async () => {
    await signOut();
    router.push("/"); // Redirect to homepage after sign out
  };

  // Function to register the user using Axios
  const registerUser = async (userData: { email: string; name: string }) => {
    try {
      const response = await axios.post("/api/user", userData);
      console.log("User registered successfully:", response.data);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  useEffect(() => {
    if (isSignedIn && user) {
      registerUser({
        email: user.primaryEmailAddress?.emailAddress || "",
        name: `${user.firstName || ""} ${user.lastName || ""}`,
      });
    }
  }, [isSignedIn, user]);

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>
        <Link href="/">Code Notebook</Link>
      </div>
      <ul className={`${styles.navLinks} ${menuOpen ? styles.navOpen : ""}`}>
        <li>
          <Link href="/" onClick={toggleMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link href="/notes" onClick={toggleMenu}>
            Notes
          </Link>
        </li>
        <li>
          <Link href="/pricing" onClick={toggleMenu}>
            Pricing
          </Link>
        </li>
        <li>
          <Link href="/contact" onClick={toggleMenu}>
            Contact Us
          </Link>
        </li>
        {!isSignedIn ? (
          <>
            <li>
              <Link
                href="/sign-in"
                className={styles.loginButton}
                onClick={toggleMenu}
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                href="/sign-up"
                className={styles.signUpButton}
                onClick={toggleMenu}
              >
                Sign Up
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <UserButton />
            </li>
            <li>
              <button onClick={handleSignOut} className={styles.logoutButton}>
                Sign Out
              </button>
            </li>
          </>
        )}
      </ul>
      <div className={styles.hamburger} onClick={toggleMenu}>
        <div
          className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`}
        ></div>
        <div
          className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`}
        ></div>
        <div
          className={`${styles.bar} ${menuOpen ? styles.barOpen : ""}`}
        ></div>
      </div>
    </nav>
  );
};

export default Navbar;

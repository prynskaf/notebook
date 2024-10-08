import type { Metadata } from "next";
import "./globals.css";
import ClientProviders from "./ClientProviders";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import styles from "@/app/layout.module.css";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.wrapper}>
          <ClientProviders>
            <Navbar />
            <main className={styles.content}>{children}</main>
            <Toaster position="bottom-left" richColors />
            <Footer />
          </ClientProviders>
        </div>
      </body>
    </html>
  );
}

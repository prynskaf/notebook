// src/app/notes/page.tsx
"use client";
import { useEffect } from "react";
import Link from "next/link";
import useNotesStore from "@/store/useStore"; // Adjust import to your store's location
import styles from "@/styles/NotesPage.module.css";

const NotesPage = () => {
  // Fetch notes and the loading state from the Zustand store
  const { notes, loading, fetchNotes } = useNotesStore((state) => ({
    notes: state.notes,
    loading: state.loading,
    fetchNotes: state.fetchNotes,
  }));

  // Fetch notes when the component is mounted
  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  // Get only the top 3 recent notes
  const recentNotes = notes.slice(0, 3);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Notes Management</h1>
        <p>Organize, edit, and view your coding notes with ease</p>
        <Link href="/notes/create" className={styles.addNoteButton}>
          + Add New Note
        </Link>
      </header>

      <section className={styles.recentNotes}>
        <h2>Recent Notes</h2>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.notesGrid}>
            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div key={note._id} className={styles.noteCard}>
                  <h3>{note.title}</h3>
                  <p>{note.content}</p>
                  <div className={styles.noteFooter}>
                    <span>{new Date(note.createdAt).toLocaleDateString()}</span>
                    <Link
                      href={`/notes/${note._id}`}
                      className={styles.viewButton}
                    >
                      View
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <p>No notes available.</p>
            )}
          </div>
        )}
        <Link href="/notes/all" className={styles.viewAllNotesButton}>
          View All Notes &gt;
        </Link>
      </section>
    </div>
  );
};

export default NotesPage;

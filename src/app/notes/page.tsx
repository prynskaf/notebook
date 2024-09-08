"use client";
import { useEffect } from "react";
import Link from "next/link";
import useNotesStore from "@/store/useStore";
import styles from "@/styles/NotesPage.module.css";
import { FaPlus } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";
import LoadingSpinner from "@/components/LoadingSpinner";
import TimeAgo from "react-timeago";
import DOMPurify from 'dompurify';

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

  // Sort notes by creation date in descending order and get the top 3 recent notes
  const recentNotes = notes
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3);

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1>Notes Management</h1>
        <p>Organize, edit, and view your coding notes with ease</p>
        <Link href="/notes/create" className={styles.addNoteButton}>
          <FaPlus />
          <span>Add New Note</span>
        </Link>
      </header>

      <section className={styles.recentNotes}>
        <h2>Recent Notes</h2>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <div className={styles.notesGrid}>
            {recentNotes.length > 0 ? (
              recentNotes.map((note) => (
                <div key={note._id} className={styles.noteCard}>
                  <h1 dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.title) }} />
                  <p dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content.substring(0, 100)) }} />
                  <div className={styles.noteFooter}>
                    <span>
                      <TimeAgo date={note.createdAt} />
                    </span>
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
          <span>View All Notes</span>
          <IoIosArrowForward style={{ fontSize: "1.5rem" }} />
        </Link>
      </section>
    </div>
  );
};

export default NotesPage;

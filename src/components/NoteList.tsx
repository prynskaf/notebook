import React, { useEffect } from "react";
import useNotesStore from "@/store/useStore";
import styles from "@/styles/NoteList.module.css";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { IoChevronBack } from "react-icons/io5";
import LoadingSpinner from "@/components/LoadingSpinner";
import TimeAgo from "react-timeago";
import DOMPurify from 'dompurify';

const NoteList: React.FC = () => {
  const { notes, loading, fetchNotes, deleteNote } = useNotesStore();

  const router = useRouter();

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleViewClick = (id: string) => {
    router.push(`/notes/${id}`);
    console.log(`View note with id: ${id}`);
    // Implement view functionality
  };

  const handleEditClick = (id: string) => {
    console.log(`Edit note with id: ${id}`);
    router.push(`/notes/edit/${id}`);
    // Implement edit functionality
  };

  const handleDeleteClick = async (id: string) => {
    const loadingToastId = toast.loading("Deleting...");
    try {
      await deleteNote(id);
      toast.dismiss(loadingToastId);
      toast.success("Note deleted successfully!");
    } catch (error) {
      console.error("Error deleting note:", error);
      toast.dismiss(loadingToastId);
      toast.error("An error occurred while deleting the note.");
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Sort notes by creation date in descending order
  const sortedNotes = notes
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  return (
    <div className={styles.noteListContainer}>
      <h1>All Notes</h1>
      <p>A comprehensive list of all your coding notes and snippets</p>
      <div className={styles.noteGrid}>
        {sortedNotes.map((note) => (
          <div key={note._id} className={styles.noteCard}>
            <h2
              className={styles.noteTitle}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.title) }}
            />
            <div
              className={styles.noteContent}
              dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(note.content.substring(0, 100)) }}
            />
            <div className={styles.flex}>
              <p className={styles.noteDate}>
                <TimeAgo date={note.createdAt} />
              </p>
              <div className={styles.noteActions}>
                <button
                  className={styles.viewButton}
                  onClick={() => handleViewClick(note._id)}
                >
                  View
                </button>
                <button
                  className={styles.editButton}
                  onClick={() => handleEditClick(note._id)}
                >
                  Edit
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => handleDeleteClick(note._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className={styles.backButton}
        onClick={() => router.push("/notes")}
      >
        <IoChevronBack style={{ fontSize: "1.5rem" }} />
        <span>Back to Management Note</span>
      </button>
    </div>
  );
};

export default NoteList;

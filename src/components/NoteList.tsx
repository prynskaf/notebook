import React, { useEffect, useState } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const notesPerPage = 5; // Adjust this number as needed

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleViewClick = (id: string) => {
    router.push(`/notes/${id}`);
  };

  const handleEditClick = (id: string) => {
    router.push(`/notes/edit/${id}`);
  };

  const handleDeleteClick = async (id: string) => {
    const loadingToastId = toast.loading("Deleting...");
    try {
      await deleteNote(id);
      toast.dismiss(loadingToastId);
      toast.success("Note deleted successfully!");
    } catch (error) {
      toast.dismiss(loadingToastId);
      toast.error("An error occurred while deleting the note.");
    }
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  // Sort notes by creation date before paginating
  const sortedNotes = notes
    .slice()
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

  // Pagination calculations on sorted notes
  const indexOfLastNote = currentPage * notesPerPage;
  const indexOfFirstNote = indexOfLastNote - notesPerPage;
  const currentNotes = sortedNotes.slice(indexOfFirstNote, indexOfLastNote);

  // Total number of pages
  const totalPages = Math.ceil(notes.length / notesPerPage);

  return (
    <div className={styles.noteListContainer}>
      <h1>All Notes</h1>
      <p>A comprehensive list of all your coding notes and snippets</p>
      <div className={styles.noteGrid}>
        {currentNotes.map((note) => (
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
      {/* Pagination buttons */}
      <div className={styles.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            className={`${styles.circleBtn} ${
              currentPage === index + 1 ? styles.active : ""
            }`}
            onClick={() => handlePageClick(index + 1)}
          >
            {index + 1}
          </button>
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

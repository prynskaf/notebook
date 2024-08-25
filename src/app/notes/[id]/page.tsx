"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useNotesStore from "@/store/useStore";
import { Note } from "@/store/noteTypes";
import styles from "@/styles/NoteView.module.css";

const NoteView = () => {
  const { id } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const { notes } = useNotesStore();

  useEffect(() => {
    if (id) {
      const fetchedNote = notes.find((note) => note._id === id);

      if (fetchedNote) {
        setNote(fetchedNote);
      } else {
        console.error("Note not found");
        alert("Note not found.");
        router.push("/notes");
      }
    }
  }, [id, notes, router]);

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.noteViewContainer}>
      <h1 className={styles.title}>{note.title}</h1>
      <p className={styles.content}>{note.content}</p>
      {note.codeSample && (
        <div className={styles.codeSnippet}>
          <h2 className={styles.snippetTitle}>Code Snippet:</h2>
          <div className={styles.codeBlockContainer}>
            <pre className={styles.codeBlock}>
              <code>{note.codeSample}</code>
            </pre>
            <button
              className={styles.copyButton}
              onClick={() =>
                navigator.clipboard.writeText(note.codeSample || "")
              }
            >
              <i className="fas fa-copy">Copy</i>
            </button>
          </div>
        </div>
      )}
      <button
        className={styles.backButton}
        onClick={() => router.push("/notes")}
      >
        &larr; Back to Management Note
      </button>
    </div>
  );
};

export default NoteView;

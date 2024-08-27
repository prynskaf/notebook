"use client";
import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import useNotesStore, { Note } from "@/store/useStore";
import styles from "@/styles/NoteView.module.css";
import { IoChevronBack } from "react-icons/io5";
import { MdContentCopy } from "react-icons/md";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import TimeAgo from "react-timeago";

const NoteView = () => {
  const { id } = useParams();
  const router = useRouter();
  const [note, setNote] = useState<Note | null>(null);
  const { notes } = useNotesStore();

  useEffect(() => {
    if (id) {
      const fetchedNote = notes.find((note) => note._id === id); // Using _id to fetch
      if (fetchedNote) {
        setNote(fetchedNote);
      } else {
        console.error("Note not found");

        toast.error("Note not found. Redirecting to all notes...");
        router.push("/notes");
      }
    }
  }, [id, notes, router]);

  if (!note) {
    return <LoadingSpinner />;
  }

  return (
    <div className={styles.noteViewContainer}>
      <h1 className={styles.title}>{note.title}</h1>
      <p className={styles.content}>{note.content}</p>
      {note.codeSample && (
        <div className={styles.codeSnippet}>
          <h2 className={styles.snippetTitle}>Code Snippet:</h2>

          <div className={styles.codeBlockContainer}>
            <button
              className={styles.copyButton}
              onClick={() => {
                toast.success("Code copied successfully!");
                navigator.clipboard.writeText(note.codeSample || "");
              }}
            >
              <MdContentCopy />
            </button>
            <pre className={styles.codeBlock}>
              <code>{note.codeSample}</code>
            </pre>
          </div>
        </div>
      )}
      <p className={styles.noteDate}>
        <TimeAgo date={note.createdAt} />
      </p>
      <button
        className={styles.backButton}
        onClick={() => router.push("/notes/all")}
      >
        <IoChevronBack style={{ fontSize: "1.5rem" }} />
        <span>Back to All Notes</span>
      </button>
    </div>
  );
};

export default NoteView;

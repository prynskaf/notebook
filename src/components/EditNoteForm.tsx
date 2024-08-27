"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useNotesStore from "@/store/useStore";
import styles from "@/styles/EditNoteForm.module.css";
import { toast } from "sonner";

const EditNoteForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { notes, fetchNotes, editNote } = useNotesStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSample, setCodeSample] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Fetch notes if not already fetched
    if (notes.length === 0) {
      fetchNotes();
    }
  }, [fetchNotes, notes.length]);

  useEffect(() => {
    if (id && notes.length > 0) {
      const noteId = Array.isArray(id) ? id[0] : id;
      const noteToEdit = notes.find((note) => note._id === noteId); // Make sure to use _id if that's what you have
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        setCodeSample(noteToEdit.codeSample);
      } else {
        console.error("Note not found");
        router.push("/notes");
      }
    }
  }, [id, notes, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToastId = toast.loading("Creating...");

    try {
      const noteId = Array.isArray(id) ? id[0] : id;
      await editNote(noteId, {
        title,
        content,
        codeSample,
      });
      toast.dismiss(loadingToastId);
      toast.success("Note was successfully posted");
      router.push("/notes/all");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.dismiss(loadingToastId);
      toast.error("An error occurred while posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1>Edit Note</h1>
      <p>Update your coding insights, tips, and snippets</p>
      <div className={styles.formGroup}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="content">Content:</label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
        />
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="codeSample">Code Snippet:</label>
        <textarea
          id="codeSample"
          value={codeSample}
          onChange={(e) => setCodeSample(e.target.value)}
        />
      </div>
      <div className={styles.buttons}>
        <button type="submit" className={styles.saveButton} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push("/notes/all")}
        >
          Back to Notes
        </button>
      </div>
    </form>
  );
};

export default EditNoteForm;

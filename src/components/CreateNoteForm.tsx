import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useNotesStore from "@/store/useStore";
import styles from "@/styles/CreateNoteForm.module.css";
import { toast } from "sonner";

const CreateNoteForm: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSample, setCodeSample] = useState("");
  const [loading, setLoading] = useState(false);

  const { addNote } = useNotesStore();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loadingToastId = toast.loading("Creating...");

    try {
      await addNote({
        title,
        content,
        codeSample,
        createdAt: new Date().toISOString(),
      });
      router.push("/notes");
      toast.dismiss(loadingToastId);
      toast.success("Note was successfully posted");
    } catch (error) {
      console.error("Error creating note:", error);
      toast.dismiss(loadingToastId);
      toast.error("An error occurred while posting.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formContainer}>
      <h1>Create a New Note</h1>
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
          {loading ? "Saving..." : "Save Note"}
        </button>
        <button
          type="button"
          className={styles.backButton}
          onClick={() => router.push("/notes")}
        >
          Back to Notes
        </button>
      </div>
    </form>
  );
};

export default CreateNoteForm;

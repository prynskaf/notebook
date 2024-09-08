"use client";
import React, { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import useNotesStore, { Note } from "@/store/useStore";
import styles from "@/styles/EditNoteForm.module.css";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import LoadingSpinner from "@/components/LoadingSpinner";

// Dynamically import Monaco Editor
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const EditNoteForm: React.FC = () => {
  const { id } = useParams();
  const router = useRouter();
  const { notes, fetchNotes, editNote } = useNotesStore();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSample, setCodeSample] = useState("");
  const [language, setLanguage] = useState("javascript");
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
      const noteToEdit = notes.find((note) => note._id === noteId);
      if (noteToEdit) {
        setTitle(noteToEdit.title);
        setContent(noteToEdit.content);
        setCodeSample(noteToEdit.codeSample);
        setLanguage(noteToEdit.language || "javascript"); // Ensure language is set
      } else {
        console.error("Note not found");
        router.push("/notes");
      }
    }
  }, [id, notes, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const loadingToastId = toast.loading("Saving...");

    try {
      const noteId = Array.isArray(id) ? id[0] : id;
      await editNote(noteId, {
        title,
        content,
        codeSample,
        language,
      });
      toast.dismiss(loadingToastId);
      toast.success("Note updated successfully");
      router.push("/notes/all");
    } catch (error) {
      console.error("Error updating note:", error);
      toast.dismiss(loadingToastId);
      toast.error("An error occurred while updating the note.");
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
        <TinyMCEEditor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          value={title}
          onEditorChange={(content) => setTitle(content)}
          init={{
            height: 150,
            menubar: false,
            plugins: "link image code",
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="content">Content:</label>
        <TinyMCEEditor
          apiKey={process.env.NEXT_PUBLIC_TINYMCE_API_KEY}
          value={content}
          onEditorChange={(content) => setContent(content)}
          init={{
            height: 300,
            menubar: false,
            plugins: "link image code",
            toolbar:
              "undo redo | formatselect | bold italic backcolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | removeformat",
            content_style:
              "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
          }}
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="language">Code Language:</label>
        <select
          id="language"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className={styles.languageSelect}
        >
          <option value="javascript">JavaScript</option>
          <option value="typescript">TypeScript</option>
          <option value="css">CSS</option>
          <option value="html">HTML</option>
          <option value="json">JSON</option>
          <option value="javascriptreact">React (JavaScript)</option>
          <option value="typescriptreact">React (TypeScript)</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="codeSample">Code Snippet:</label>
        <div className={styles.monacoEditorContainer}>
          <MonacoEditor
            height="300px"
            language={language}
            value={codeSample}
            onChange={(value) => setCodeSample(value || "")}
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              lineNumbers: "on",
              scrollBeyondLastLine: false,
            }}
            loading={<LoadingSpinner />}
          />
        </div>
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

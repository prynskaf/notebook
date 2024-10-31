'use client'
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs"; 
import useNotesStore from "@/store/useStore";
import styles from "@/styles/CreateNoteForm.module.css";
import { toast } from "sonner";
import dynamic from "next/dynamic";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";

// Dynamically import Monaco Editor
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

const CreateNoteForm: React.FC = () => {
  const { isSignedIn } = useUser();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSample, setCodeSample] = useState("");
  const [language, setLanguage] = useState("javascript");
  const [loading, setLoading] = useState(false);

  const { addNote } = useNotesStore();
  const router = useRouter();

  useEffect(() => {
    // Redirect to sign-in if not authenticated
    if (!isSignedIn) {
      router.push("/sign-in");
    }
  }, [isSignedIn, router]);

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

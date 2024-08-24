"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useStore from "../store/useStore";

const CreateNoteForm = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [codeSample, setCodeSample] = useState("");
  const { addNote } = useStore();
  const router = useRouter();

  const handleSave = () => {
    const newNote = {
      id: Date.now(),
      title,
      content,
      codeSample,
    };
    addNote(newNote);
    router.push("/notes");
  };

  return (
    <div>
      <h1>Create Note</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <textarea
        placeholder="Code Sample"
        value={codeSample}
        onChange={(e) => setCodeSample(e.target.value)}
      />
      <button onClick={handleSave}>Save Note</button>
    </div>
  );
};

export default CreateNoteForm;

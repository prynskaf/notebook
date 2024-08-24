"use client";
import { useRouter } from "next/navigation";
import useStore from "../../../store/useStore";
import { useState, useEffect } from "react";
import { Note } from "../../../store/noteTypes";

const NotePage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  const { notes, updateNote } = useStore();
  const [note, setNote] = useState<Note | undefined>(undefined);

  useEffect(() => {
    const currentNote = notes.find((note) => note.id === Number(id));
    if (currentNote) {
      setNote(currentNote);
    }
  }, [id, notes]);

  const handleSave = () => {
    if (note) {
      updateNote(note);
      router.push("/notes/all");
    }
  };

  if (!note) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Edit Note</h1>
      <input
        type="text"
        value={note.title}
        onChange={(e) =>
          setNote({
            ...note,
            title: e.target.value,
          })
        }
      />
      <textarea
        value={note.content}
        onChange={(e) =>
          setNote({
            ...note,
            content: e.target.value,
          })
        }
      />
      <textarea
        value={note.codeSample}
        onChange={(e) =>
          setNote({
            ...note,
            codeSample: e.target.value,
          })
        }
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default NotePage;

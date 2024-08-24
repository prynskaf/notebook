import { FC } from "react";
import useStore from "../store/useStore";
import NoteItem from "./NoteItem";
import { Note } from "../store/noteTypes"; // Import the Note type

const NoteList: FC = () => {
  const { notes, deleteNote } = useStore();

  const handleCopy = (note: Note) => {
    navigator.clipboard.writeText(
      `Title: ${note.title}\nContent: ${note.content}\nCode: ${note.codeSample}`
    );
    alert("Note copied to clipboard!");
  };

  return (
    <ul>
      {notes.map((note) => (
        <NoteItem
          key={note.id}
          note={note}
          onDelete={deleteNote}
          onCopy={handleCopy}
        />
      ))}
    </ul>
  );
};

export default NoteList;

"use client";
import { FC } from "react";
import { useRouter } from "next/navigation";
import { Note } from "../store/noteTypes";

interface NoteItemProps {
  note: Note;
  onDelete: (id: number) => void;
  onCopy: (note: Note) => void;
}

const NoteItem: FC<NoteItemProps> = ({ note, onDelete, onCopy }) => {
  const router = useRouter();

  const handleEdit = () => {
    router.push(`/notes/${note.id}`);
  };

  return (
    <li>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <pre>{note.codeSample}</pre>
      <button onClick={() => onCopy(note)}>Copy</button>
      <button onClick={() => onDelete(note.id)}>Delete</button>
      <button onClick={handleEdit}>Edit</button>
    </li>
  );
};

export default NoteItem;

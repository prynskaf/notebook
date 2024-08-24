"use client";
import { useRouter } from "next/navigation";
import useStore from "../../store/useStore";

const NotesPage = () => {
  const router = useRouter();
  const { notes } = useStore();

  return (
    <div>
      <h1>Notes</h1>
      <button onClick={() => router.push("/notes/create")}>Add New Note</button>
      <h2>Recent Notes</h2>
      <ul>
        {notes.slice(0, 5).map((note) => (
          <li key={note.id}>{note.title}</li>
        ))}
      </ul>
      <button onClick={() => router.push("/notes/all")}>See All Notes</button>
    </div>
  );
};

export default NotesPage;

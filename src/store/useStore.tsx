import create from "zustand";
import { Note } from "@/types";

interface StoreState {
  notes: Note[];
  addNote: (note: Note) => void;
  updateNote: (updatedNote: Note) => void;
  deleteNote: (id: string) => void;
}

const useStore = create<StoreState>((set) => ({
  notes: [],
  addNote: (note) => set((state) => ({ notes: [...state.notes, note] })),
  updateNote: (updatedNote) =>
    set((state) => ({
      notes: state.notes.map((note) =>
        note.id === updatedNote.id ? updatedNote : note
      ),
    })),
  deleteNote: (id) =>
    set((state) => ({
      notes: state.notes.filter((note) => note.id !== id),
    })),
}));

export default useStore;

import { create } from "zustand";
import axios from "axios";

export interface Note {
  id: string; // You can remove this if you're solely relying on _id
  _id: string;
  title: string;
  content: string;
  codeSample: string;
  createdAt: string;
}

export interface NewNote {
  title: string;
  content: string;
  codeSample: string;
  createdAt: string;
}

interface NotesStore {
  notes: Note[];
  loading: boolean;
  fetchNotes: () => void;
  fetchNoteById: (id: string) => Promise<Note | undefined>;
  addNote: (note: NewNote) => void;
  editNote: (id: string, updatedNote: Partial<Note>) => void;
  deleteNote: (id: string) => void;
}

const useNotesStore = create<NotesStore>((set) => ({
  notes: [],
  loading: false,

  fetchNotes: async () => {
    set({ loading: true });
    try {
      const response = await axios.get("/api/notes");
      set({
        notes: response.data.map((note: Note) => ({
          ...note,
          id: note._id, // Map _id to id
        })),
      });
    } catch (error) {
      console.error("Error fetching notes:", error);
    } finally {
      set({ loading: false });
    }
  },

  fetchNoteById: async (id: string) => {
    set({ loading: true });
    try {
      const response = await axios.get(`/api/notes/${id}`);
      return { ...response.data, id: response.data._id }; // Map _id to id
    } catch (error) {
      console.error("Error fetching note:", error);
      return undefined;
    } finally {
      set({ loading: false });
    }
  },

  addNote: async (note: NewNote) => {
    set({ loading: true });
    try {
      const response = await axios.post("/api/notes", note);
      set((state) => ({
        notes: [...state.notes, { ...response.data, id: response.data._id }],
      }));
    } catch (error) {
      console.error("Error adding note:", error);
    } finally {
      set({ loading: false });
    }
  },

  editNote: async (id, updatedNote) => {
    set({ loading: true });
    try {
      const response = await axios.put(`/api/notes/${id}`, updatedNote);
      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === id ? { ...response.data, id: response.data._id } : note
        ),
      }));
    } catch (error) {
      console.error("Error editing note:", error);
    } finally {
      set({ loading: false });
    }
  },

  deleteNote: async (id) => {
    set({ loading: true });
    try {
      await axios.delete(`/api/notes/${id}`);
      set((state) => ({
        notes: state.notes.filter((note) => note._id !== id),
      }));
    } catch (error) {
      console.error("Error deleting note:", error);
    } finally {
      set({ loading: false });
    }
  },
}));

export default useNotesStore;

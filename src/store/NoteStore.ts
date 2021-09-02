import { defineStore } from "pinia";
import { Note } from "../models/Note";

const saveState = (items: unknown[]) => {
  localStorage.setItem("DBAPP_NOTES", JSON.stringify(items));
};

const loadState = () => {
  const items = localStorage.getItem("DBAPP_NOTES");
  return items ? JSON.parse(items) : null;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useNotesStore = defineStore("note", {
  state: () => ({
    notes: (loadState() || []) as Note[],
  }),
  actions: {
    getNote(id: string) {
      return this.notes.find((n) => n.id === id);
    },
    addNote(title: string, text?: string) {
      this.notes.push(new Note(title, text));
      saveState(this.notes);
    },
    patchNote(id: string, changes: Partial<Note>) {
      const note = this.getNote(id);
      Object.assign(note, changes);
      saveState(this.notes);
    },
    deleteNote(id: string){
      this.notes = this.notes.filter(n => n.id !== id);
      saveState(this.notes);
    }
  },
});

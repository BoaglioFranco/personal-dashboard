import { defineStore } from "pinia";
import { Bookmark } from "../models/Bookmark";

const saveState = (items: unknown[]) => {
  localStorage.setItem("DBAPP_BOOKMARKS", JSON.stringify(items));
};

const loadState = () => {
  const items = localStorage.getItem("DBAPP_BOOKMARKS");
  return items ? JSON.parse(items, (key, value)=>{
    return key == 'url' ? new URL(value) : value;
  }) : null;
};



// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useBookmarksStore = defineStore("bookmark", {
  state: () => ({
    bookmarks: (loadState() || []) as Bookmark[],
  }),
  actions: {
    getBookmark(id: string) {
      return this.bookmarks.find((n) => n.id === id);
    },
    addBookmark(name: string, url: string) {
      this.bookmarks.push(new Bookmark(name, url));
      saveState(this.bookmarks);
    },
    updateBookmark(id: string, name: string, url: string) {
      const bookmark = this.getBookmark(id);
      Object.assign(bookmark, {name, url: new URL(url)});
      saveState(this.bookmarks);
    },
  },
});

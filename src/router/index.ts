import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Bookmarks from "../views/Bookmarks.vue";
import Notes from "../views/Notes.vue";
import Todos from "../views/Todos.vue";
import AddNote from "../views/AddNote.vue";
import AddTodo from "../views/AddTodo.vue";
import AddBookmark from "../views/AddBookmark.vue";
import ManageBookmarks from "../views/ManageBookmarks.vue";
import EditBookmark from "../views/EditBookmark.vue";

const routes: Array<RouteRecordRaw> = [
  { path: "/bookmarks", component: Bookmarks },
  { path: "/bookmarks/add", component: AddBookmark },
  {
    path: "/bookmarks/manage",
    component: ManageBookmarks,
    children: [{ path: ":id", component: EditBookmark }],
  },
  { path: "/todos", component: Todos },
  { path: "/todos/add", component: AddTodo },
  { path: "/todos/edit/:id", component: AddTodo },
  { path: "/notes", component: Notes },
  { path: "/notes/add", component: AddNote },
  { path: "/notes/edit/:id", component: AddNote },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;

import { defineStore } from "pinia";
import { Todo } from "../models/Todo";

const saveState = (items: unknown[]) => {
  localStorage.setItem("DBAPP_TODOS", JSON.stringify(items));
};

const loadState = () => {
  const items = localStorage.getItem("DBAPP_TODOS");
  return items ? JSON.parse(items) : null;
};

// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useTodosStore = defineStore("todo", {
  state: () => ({
    todos: (loadState() || []) as Todo[],
  }),
  actions: {
    toggleTodo(id: string) {
      const todo = this.todos.find((td) => id === td.id);
      if (todo) {
        todo.completed = !todo.completed;
        saveState(this.todos);
      }
    },
    addTodo(text: string) {
      this.todos.push(new Todo(text));
      saveState(this.todos);
    },
    deleteTodo(id: string) {
      this.todos = this.todos.filter((td) => td.id !== id);
      saveState(this.todos);
    },
    getTodo(id: string) {
      return this.todos.find((n) => n.id === id);
    },
    patchTodo(id: string, changes: Partial<Todo>) {
      const todo = this.getTodo(id);
      Object.assign(todo, changes);
      saveState(this.todos);
    },
  },
});

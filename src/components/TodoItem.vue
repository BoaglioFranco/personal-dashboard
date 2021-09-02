<template>
  <div class="todo-item" :class="{ completed: todo.completed }" @click="toggle()">
    <div class="check-box" >
      <i class="material-icons-outlined">check</i>
    </div>
    <p class="todo-text">{{todo.text}}</p>
    <div class="actions">
      <div class="btn todo-item-action" @click.stop="editTodo()">
        <i class="material-icons">edit</i>
      </div>
      <div class="btn todo-item-action" @click.stop="deleteTodo()">
        <i class="material-icons">delete</i>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Todo } from "../models/Todo";
import { mapStores } from "pinia";
import { useTodosStore } from "@/store/TodoStore";

export default defineComponent({
  props: {
    todo: {
      required: true,
      type: Object as PropType<Todo>,
    },
  },
  computed: {
    ...mapStores(useTodosStore)
  },
  methods: {
    toggle(){
      this.todoStore.toggleTodo(this.todo.id);
    },
    deleteTodo(){
      this.todoStore.deleteTodo(this.todo.id);
    },
    editTodo(){
      this.$router.push(`/todos/edit/${this.todo.id}`);
    }
  }
});
</script>

<style lang="scss" scoped>
.todo-item {
  display: flex;
  position: relative;
  align-items: center;
  background-color: rgba(black, 0.4);
  border-radius: 25px;
  padding: 0.6rem 0.8rem;
  margin-bottom: 1rem;

  cursor: pointer;

  &:hover{
    .actions{
      transform: scale(1);
      opacity: 1;
      visibility: visible;
    }

    .todo-text {
      color: white;
    }
    .check-box {
      background-color: rgba(white, 0.35);
      border-color: transparent;
    }
  }

  &.completed {
    .todo-text {
      color: rgba(white, 0.65);
    }
    .check-box {
      background-color: rgb(9, 218, 19);
      border-color: transparent;

      i {
        opacity: 1;
      }
    }
  }
}

.todo-text {
  color: rgba(white, 0.85);
}

.check-box {
  padding: 0.25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: 2px solid rgba(white, 0.35);
  margin-right: 1rem;

  i {
    font-size: 18px;
    opacity: 0;
  }
}

.todo-text,
.check-box {
  transition: all 0.1s;
}

.actions {
  position: absolute;
  right: 10px;
  background-color: rgba(72,72,82, .85);
  border-radius: 20px;
  transition: all .2s .4s;

  visibility: hidden;
  transform: scale(.8);
  opacity: 0;
}

.todo-item-action{
  background-color: transparent;
  padding: 8px 12px;
  border-radius: 20px;

  &:hover{
    background-color: rgb(50,50,53);
  }

  &:first-child{
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
  &:last-child{
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  i{
    font-size: 1.1rem;
  }
}
</style>

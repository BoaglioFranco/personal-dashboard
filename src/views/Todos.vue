<template>
  <div class="todos-wrapper">
    <div class="container">
      <transition-group name="todo-list">
        <TodoItem v-for="todo in todoStore.todos" :key="todo.id" :todo="todo" />
        <div class="btn-container" key="IamAButton">
          <router-link class="btn" to="/todos/add">
            <i class="material-icons-outlined">add</i> Add Todo
          </router-link>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import TodoItem from "../components/TodoItem.vue";
import { mapStores } from "pinia";
import { useTodosStore } from "@/store/TodoStore";

export default defineComponent({
  components: {
    TodoItem,
  },
  computed: {
    ...mapStores(useTodosStore),
  },
});
</script>

<style lang="scss" scoped>
.container {
  position: relative;
}

.todos-wrapper{
  height: 100%;
  overflow-y: auto;
}

.todo-list-leave-active {
  transition: all 0.2s;
  position: absolute;
  width: 100%;
}

.todo-list-leave-to {
  opacity: 0;
}

.todo-list-move {
  transition: transform 0.3s ease 0.2s;
}
</style>

<template>
  <div class="add-todo-wrapper container bg-white-blur">
    <h2 class="bold">{{ isEdit ? "Edit Todo" : "Add Todo" }}</h2>
    <form>
      <div class="form-field">
        <input
          class="textbox"
          type="text"
          placeholder="Note Title"
          v-model="text"
        />
        <p class="error" v-if="textErrors">{{ textErrors }}</p>
      </div>

      <div class="actions-container">
        <router-link to="/todos" class="back"> ❮ Go back</router-link>
        <button class="btn" @click.prevent="submit()">
          Add todo
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useTodosStore } from "@/store/TodoStore";

export default defineComponent({
  data() {
    return {
      text: "",
      textErrors: "",
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
    id() {
      return this.$route.params.id as string;
    },
    ...mapStores(useTodosStore),
  },
  mounted() {
    if (this.isEdit) {
      const todo = this.todoStore.getTodo(this.id);
      if (!todo) {
        this.$router.push("/todos");
        return;
      }
      this.text = todo.text;
    }
  },
  methods: {
    submit() {
      if (!this.text) {
        this.textErrors = "Text can't be empty";
      } else if (this.text.length < 3) {
        this.textErrors = "Text should be at least 3 characters";
      } else {
        this.isEdit
          ? this.todoStore.patchTodo(this.id, { text: this.text })
          : this.todoStore.addTodo(this.text);

        this.$router.push("/todos");
      }
    },
  },
});
</script>

<style lang="scss" scoped>
.add-todo-wrapper {
  padding: 2rem;
  max-height: 100%;
  overflow: auto;
  border-radius: 5px;
}

.back {
  color: rgba(black, 0.5);
  display: inline-block;
  font-size: 1.1rem;
  padding-bottom: 2px;

  &:hover {
    color: rgba(black, 0.7);
    border-bottom: 1px solid currentColor;
  }
}

.actions-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

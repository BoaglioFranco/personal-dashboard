<template>
  <div class="add-note-wrapper container bg-white-blur">
    <h2 class="bold">{{ isEdit ? "Edit Note" : "New Note" }}</h2>
    <form>
      <div class="form-field">
        <input
          class="textbox"
          type="text"
          placeholder="Note Title"
          v-model="title"
        />
        <p class="error" v-if="titleError">Please enter a title</p>
      </div>

      <div class="form-field">
        <textarea
          class="textarea"
          placeholder="Enter note text..."
          v-model="content"
          cols="30"
          rows="4"
          name="content"
        ></textarea>
      </div>

      <div class="actions-container">
        <router-link to="/notes" class="back"> ❮ Go back</router-link>
        <button class="btn btn-delete" v-if="isEdit" @click.prevent="deleteNote()">Delete Note</button>
        <button class="btn submit" type="submit" @click.prevent="submit()">
          {{ isEdit ? "Update" : "Add note" }}
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useNotesStore } from "@/store/NoteStore";

export default defineComponent({
  data() {
    return {
      title: "",
      titleError: false,
      content: "",
    };
  },
  computed: {
    isEdit() {
      return !!this.$route.params.id;
    },
    id(){
        return (this.$route.params.id as string);
    },
    ...mapStores(useNotesStore),
  },
  mounted() {
    if (this.isEdit) {
      const note = this.noteStore.getNote(this.id)
      if(!note){
          this.$router.push("/notes");
          return;
      }
      this.title = note.title;
      this.content = note.content;
    }
  },
  methods: {
    submit() {
      if(this.title.trim().length === 0){
        this.titleError = true;
        return;
      }
      if (!this.isEdit) {
        this.noteStore.addNote(this.title, this.content);
      } else {
        this.noteStore.patchNote(this.id ,{title: this.title, content: this.content})
      }
      this.$router.push("/notes");
    },
    deleteNote(){
      this.noteStore.deleteNote(this.id);
      this.$router.push("/notes");
    }
  },
});
</script>

<style lang="scss" scoped>
.add-note-wrapper {
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
  align-items: center;
}

.submit{
  margin-left: auto;
}

.btn-delete{
  margin-left: 1rem;
}
</style>

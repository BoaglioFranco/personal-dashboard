<template>
  <div class="notes-wrapper">
    <div class="container">
      <div class="notes-list">
        <NoteItem v-for="note in noteStore.notes" :key="note.id" :note="note" />
      </div>
      <div class="btn-container">
        <router-link class="btn" to="/notes/add">
          <i class="material-icons-outlined">add</i> Add note
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useNotesStore } from "@/store/NoteStore";
import NoteItem from "@/components/NoteItem.vue";

export default defineComponent({
  components: {
    NoteItem,
  },
  computed: {
    ...mapStores(useNotesStore),
  },
});
</script>

<style lang="scss" scoped>
.notes-wrapper {
  height: 100%;
  overflow-y: auto;
}

.btn {
  gap: 8px;
  i {
    margin-left: -2px;
  }
}
</style>

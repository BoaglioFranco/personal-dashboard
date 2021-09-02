<template>
  <div class="bookmarks-wrapper">
    <div class="container">
      <div class="bookmark-tiles-container">
        <BookmarkItem
          v-for="bookmark of bookmarkStore.bookmarks"
          :bookmark="bookmark"
          :key="bookmark.id"
        />
      </div>
      <div class="btn-container">
        <router-link class="btn" to="/bookmarks/add">
          <i class="material-icons-outlined">add</i> Add Bookmark
        </router-link>
        <router-link class="btn settings" to="/bookmarks/manage">
          <i class="material-icons">settings</i> Manage
        </router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import BookmarkItem from "@/components/BookmarkItem.vue";
import { mapStores } from "pinia";
import { useBookmarksStore } from "@/store/BookmarkStore";

export default defineComponent({
  components: {
    BookmarkItem,
  },
  computed: {
    ...mapStores(useBookmarksStore),
  },
});
</script>

<style lang="scss" scoped>
.bookmarks-wrapper {
  height: 100%;
  overflow-y: auto;
}

.bookmark-tiles-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  align-items: center;
}

.settings{
  padding: 11px 12px;
}

.settings i{
  margin-right: 8px;
  font-size: 21px;
  opacity: .9;
}

.btn-container{
  gap: 1rem;
}
</style>

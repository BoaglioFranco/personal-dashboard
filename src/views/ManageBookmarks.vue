<template>
  <div class="wrapper container">
    <aside class="sidebar">
      <h3 class="sidebar-heading">Your Bookmarks</h3>
      <div class="sidebar-items">
        <router-link
          v-for="bk of bookmarkStore.bookmarks"
          class="item"
          :to="'/bookmarks/manage/' + bk.id"
          :key="bk.id"
        >{{bk.name}}</router-link>
      </div>
    </aside>
    <div class="content bg-white-blur">
      <router-view :key="$route.fullPath"></router-view>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useBookmarksStore } from "@/store/BookmarkStore";

export default defineComponent({
  computed: {
    ...mapStores(useBookmarksStore),
  },
});
</script>

<style lang="scss" scoped>

a.router-link-active {
  color: rgba(white, .95)!important;
}

.wrapper {
  display: flex;
  height: 100%;
}

.content {
  flex-grow: 1;
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
}

.sidebar {
  background-color: rgba(black, 0.75);
  backdrop-filter: blur(8px);
  width: 220px;
  border-top-left-radius: 8px;
  border-bottom-left-radius: 8px;
  overflow: auto;
}

.sidebar-heading {
  color: rgba(white, 0.8);
  font-weight: 600;
  font-size: 20px;
  padding: 25px;
}

.sidebar-items {
  display: flex;
  flex-direction: column;

  .item {
    color: rgba(white, 0.78);
    padding: 5px 25px;

    &:hover{
      color: rgba(white, 0.88);
    }
  }
}

</style>

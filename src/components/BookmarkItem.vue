<template>
  <a class="bookmark-tile" :href="bookmark.url" target="_blank">
    <div class="icon-wrapper">
      <img :src="tileIcon" :alt="bookmark.name + 'logo'" />
    </div>
    <p class="tile-text">{{ bookmark.name }}</p>
  </a>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Bookmark } from "../models/Bookmark";

export default defineComponent({
  props: {
    bookmark: {
      required: true,
      type: Object as PropType<Bookmark>,
    },
  },
  computed: {
    tileIcon() {
      return this.bookmark.url.origin + "/favicon.ico";
    },
  },
});
</script>

<style lang="scss" scoped>
.bookmark-tile {
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
  gap: 12px;

  border-radius: 8px;
  height: 105px;
  width: 115px;
  padding: 10px;
  background-color: rgba(black, 0.52);
  cursor: pointer;
  transition: all 0.1s;

  & img {
    max-width: 32px;
  }

  &:hover {
    background-color: rgba(black, 0.65);
    backdrop-filter: blur(2px);
  }

  &:active {
    background-color: rgba(black, 0.7);
    transform: translateY(2px);
  }
}

.tile-text {
  color: rgba(white, 0.95);
  font-size: 0.9rem;

  overflow: hidden;
  white-space: nowrap;
  max-width: 100%;
  text-overflow: ellipsis;
}

.icon-wrapper {
  height: 32px;
  width: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

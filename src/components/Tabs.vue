<template>
  <div class="tabs">
    <router-link
      to="/bookmarks"
      class="tab bookmarks-tab"
      :class="{ 'router-link-active': subIsActive('/bookmarks') }"
    >
      <div class="tab-tile">
        <i class="material-icons-outlined">bookmarks</i>
      </div>
    </router-link>
    <router-link
      to="/todos"
      class="tab todos-tab"
      :class="{ 'router-link-active': subIsActive('/todos') }"
    >
      <div class="tab-tile">
        <i class="material-icons-outlined">check</i>
      </div>
    </router-link>
    <router-link
      to="/notes"
      class="tab notes-tab"
      :class="{ 'router-link-active': subIsActive('/notes') }"
    >
      <div class="tab-tile">
        <i class="material-icons-outlined">notes</i>
      </div>
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  methods: {
    subIsActive(input: string) {
      const paths = Array.isArray(input) ? input : [input];
      return paths.some((path) => {
        return this.$route.path.indexOf(path) === 0; // current path starts with this path string
      });
    },
  },
});
</script>

<style lang="scss" scoped>
.router-link-active {
}

.tabs {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.25);
  gap: 14px;
  border-radius: 12px;
  margin: 12px;
  margin-top: 50px;
}

.tab {
  position: relative;
  text-decoration: none;

  &.router-link-active {
    outline: none;
  }
}

.tab-tile {
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  transition: all 0.2s cubic-bezier(0, 0, 0, 2);
  // background-color: rgba(black, 0.1);

  &::before {
    content: "";
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 10px;
    transition: all 0.2s;
    opacity: 0.9;
  }

  &:hover::before {
    transform: scale(1.1);
    opacity: 1;
    // transition: all .2s;
  }
}

i {
  z-index: 1;
}

.bookmarks-tab .tab-tile::before {
  background: linear-gradient(45deg, #f8b5a5, #e2d2fd);
}
.todos-tab .tab-tile::before {
  background: linear-gradient(45deg, #a2ffff, #ffbdde);
}
.notes-tab .tab-tile::before {
  background: linear-gradient(45deg, #d2cdff, #5fffbc);
}

a:hover,
a:active,
a:visited {
  text-decoration: none;
  color: inherit;
}

.tab.router-link-active .tab-tile::before {
  border-radius: 50%;
  box-shadow: 0 7px 16px rgba(black, 0.2);
  opacity: 1;
  transform: scale(1.1);

  transition-delay: 0.15s;
}

.tab.router-link-active .tab-tile {
  transform: translateY(-50%);
  border-radius: 50%;
}

//underline shape

.tab::after {
  content: "";
  position: absolute;
  bottom: -10px;
  left: 0;
  right: 0;

  height: 3px;
  width: 50%;
  margin: auto;
  border-radius: 3px;
  background-color: rgba(white, 0.8);
  transition: all 0.2s;

  opacity: 0;
  transform: scaleX(0);
}

.tab.router-link-active::after {
  transition-delay: 0.15s;
  opacity: 1;
  transform: scaleX(1);
}
</style>

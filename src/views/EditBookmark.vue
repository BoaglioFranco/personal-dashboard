<template>
  <div class="bookmark-wrapper container ">
    <h2 class="bold">{{ originalName }}</h2>
    <form>
      <div class="form-field">
        <label>Name</label>
        <input
          class="textbox"
          type="text"
          placeholder="Note Title"
          v-model="name"
        />
        <p class="error" v-if="nameError">{{ nameError }}</p>
      </div>

      <div class="form-field">
        <label>URL</label>
        <input class="textbox" type="url" placeholder="URL" v-model="url" />
        <p class="error" v-if="urlError">{{ urlError }}</p>
      </div>

      <div class="actions-container">
        <router-link to="/bookmarks" class="btn">Cancel</router-link>
        <button class="btn" @click.prevent="submit()">
          Save
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapStores } from "pinia";
import { useBookmarksStore } from "@/store/BookmarkStore";

export default defineComponent({
  data() {
    return {
      originalName: "",
      name: "",
      url: "",
      nameError: "",
      urlError: "",
    };
  },
  computed: {
    ...mapStores(useBookmarksStore),
    id() {
      return this.$route.params.id as string;
    },
  },
  mounted() {
    const bk = this.bookmarkStore.getBookmark(this.id);
    if (!bk) {
      this.$router.push("/bookmarks/manage");
      return;
    }
    this.name = bk.name;
    this.originalName = bk.name;
    this.url = bk.url.toString();
  },
  methods: {
    checkUrl() {
      const horribleUrlRe = /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i;

      if (horribleUrlRe.test(this.url)) {
        return true;
      } else if (horribleUrlRe.test("http://" + this.url)) {
        this.url = "http://" + this.url;
        return true;
      }
      return false;
    },
    submit() {
      if (this.name.trim().length === 0) {
        this.nameError = "Name is required.";
        return;
      }
      if (!this.checkUrl()) {
        this.urlError = "Please enter a valid URL.";
        return;
      }


      this.bookmarkStore.updateBookmark(this.id, this.name, this.url);

      this.$router.push("/bookmarks/manage");
    },
  },
});
</script>

<style lang="scss" scoped>
.form-field,
h2 {
  margin-bottom: 2.5rem;
}

.bookmark-wrapper {
  height: 100%;
  overflow: auto;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 2rem;
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
  margin-top: auto;
}

form {
  flex: 1;
  display: flex;
  flex-direction: column;
}

.btn {
  padding: 10px 20px;
}
</style>

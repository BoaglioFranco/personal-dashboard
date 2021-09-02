<template>
  <router-link class="note-card" :to="`/notes/edit/${note.id}`">
    <div class="note-card-title">{{ note.title }}</div>
    <div class="note-card-content" v-if="note.content">{{ note.content }}</div>
  </router-link>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { PropType } from "vue";
import { Note } from "@/models/Note";

export default defineComponent({
  props: {
    note: {
      required: true,
      type: Object as PropType<Note>,
    },
  },
});
</script>

<style lang="scss" scoped>
.note-card{
    background-color: rgba(black, .5);
    color: rgba(white, .95)!important;
    padding: 25px;
    border-radius: 4px;
    cursor: pointer;
    transition: all .1s;
    display: block;
    margin-bottom: 1rem;

    &:hover{
        background-color: rgba(black, .6);
        backdrop-filter: blur(2px);
    }

    &-title{
        font-weight: 600;
        font-size: 20px;
    }

    &-content{
        margin-top: .5rem;
    }
}
</style>

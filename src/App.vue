<template>
  <div class="app-wrapper">
    <div class="btn change-bg-btn" v-if="!isBgLoading" @click="changeBg()">
      <i class="material-icons">refresh</i>
    </div>
    <transition-group name="bg">
    <img v-for="bg in arrayReversed" :src="bg" class="background" @load="onBgLoad($event)" :key="bg" />
    </transition-group>

    <div class="top-section">
      <h1>{{ time }}</h1>
      <h2>{{ date }}</h2>
    </div>
    <div class="content-section">
      <router-view v-slot="slotProps">
        <transition name="route">
          <component :is="slotProps.Component" />
        </transition>
      </router-view>
    </div>
    <div class="bottom-section">
      <Tabs />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Tabs from "./components/Tabs.vue";
import dateFormat from "dateformat";

export default defineComponent({
  components: {
    Tabs,
  },
  data() {
    return {
      dateTime: new Date(),
      bgs: ["https://source.unsplash.com/random/1920x1080"],
      isBgLoading: false,
    };
  },
  computed: {
    date(): string {
      return dateFormat(this.dateTime as Date, "d mmmm yyyy");
    },
    time(): string {
      return dateFormat(this.dateTime as Date, "H:MM");
    },
    arrayReversed(): string[]{ //reverse mutates original array
      return [...this.bgs].reverse();
    }
  },
  mounted() {
    setInterval(() => {
      this.dateTime = new Date();
    }, 1000);
  },
  methods: {
    async changeBg() {
      this.isBgLoading = true;
      const newBg = (
        await fetch("https://source.unsplash.com/random/1920x1080", {
          method: "HEAD",
        })
      ).url;

      this.bgs.push(newBg);
    },
    onBgLoad(event: Event){
      const src = (event.target as HTMLImageElement).src ;
      this.isBgLoading = false
      this.bgs = [src];
    }
  },
});
</script>

<style lang="scss">
.route-enter-from {
  opacity: 0;
}

.route-enter-active {
  transition: all 0.5s;
}

.route-enter-to {
  opacity: 1;
}

.route-leave-from {
  opacity: 1;
}
.router-leave-active {
  transition: all 0.35s;
}

.route-leave-to {
  opacity: 0;
}


.bg-leave-from {
  opacity: 1;
}

.bg-leave-active{
  transition: all .5s;
}
.bg-leave-to{
  opacity: 0;
}


.app-wrapper {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.background {
  position: fixed;
  z-index: -1;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.change-bg-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  opacity: 0.3;

  &:hover {
    opacity: 1;
    background-color: rgba(black, 0.4);
  }
}

.top-section {
  @media screen and (min-height: 960px) {
    margin-bottom: 5rem;
  }

  text-align: center;
  padding-top: 3rem;
  padding-bottom: 1.5rem;
  h1 {
    font-size: 120px;
    color: #f5f5f5;
    font-weight: bold;
    text-shadow: 0px 1px 10px rgba($color: #000000, $alpha: 0.12);
  }

  h2 {
    font-size: 28px;
    color: white;
    text-shadow: 0px 1px 4px rgba($color: #000000, $alpha: 0.1);
  }
}

.content-section {
  flex: 1;
  min-height: 0;
}

.bottom-section {
  display: flex;
  justify-content: center;
}
</style>

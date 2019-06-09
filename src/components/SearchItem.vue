<template>
  <transition name="router-animation" enter-active-class="animated slideInUp faster">
    <div class="bg-grey-darkest text-white flex mr-3 mb-3 h-28 rounded">
      <div class="ml-3 mt-3 w-32 rounded">
        <img v-bind:src="img" alt="icon">
      </div>
      <div class="w-75 my-3 ml-1">
        <div class="text-sm w-full h-13 relative">{{item.title}}</div>
        <div class="flex w-full">
          <div class="flex-1 mt-4">
            <div class="text-grey-light text-xs mt-1 mb-1">Author: {{item.author.name}}</div>
          </div>
          <button
            class="uppercase text-white bg-blue mr-2 h-9 w-9 px-1 rounded-full button-action"
            @click="play()"
          >
            <svg
              style="top: 1px; left: 2px; position: relative;"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="20px"
              height="20px"
              viewBox="0 0 20 20"
            >
              <path d="M4 4l12 6-12 6z"></path>
            </svg>
          </button>

          <button
            class="uppercase text-white bg-blue mr-3 h-9 w-9 px-1 rounded-full button-action"
            @click="$emit('onDownload', item.url, item.title)"
          >
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "search-item",
  props: ["item"],
  data() {
    return {};
  },
  methods: {
    play() {
      this.$router.push({
        name: "player",
        params: {
          url: "https://www.youtube.com" + this.item.url,
          title: this.item.title,
          router: "search"
        }
      });
    }
  },
  computed: {
    img() {
      return "https://img.youtube.com/vi/" + this.item.videoId + "/default.jpg";
    }
  }
};
</script>


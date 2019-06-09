<template>
  <transition name="router-animation" enter-active-class="animated slideInUp faster">
    <div class="bg-grey-darkest text-white flex mr-3 mb-3 h-28 rounded">
      <div class="ml-3 my-3 w-32 rounded">
        <img v-bind:src="hist.imgUrl" alt="icon">
      </div>
      <div class="w-75 my-3 ml-1">
        <div class="text-base w-full h-13 relative">{{hist.title}}</div>
        <div class="flex w-full">
          <div class="flex-1">
            <div class="text-grey text-xs mt-1">Author: {{hist.author}}</div>
            <div class="text-grey text-xs mt-1">Date: {{dateExec}}</div>
          </div>
          <button
            class="uppercase text-white bg-blue mr-2 h-9 w-9 px-1 rounded-full button-action"
            @click="play()"
          >
            <svg
              fill="currentColor"
              style="top: 1px; left: 1px; position: relative;"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 18 18"
            >
              <path d="M4 4l12 6-12 6z"></path>
            </svg>
          </button>

          <button
            class="uppercase text-white bg-blue mr-3 h-9 w-9 px-1 rounded-full button-action"
            @click="download()"
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
const options = {
  year: "numeric",
  month: "numeric",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric"
};

export default {
  name: "history-item",
  props: ["hist"],
  data() {
    return {};
  },
  computed: {
    dateExec() {
      const d = new Date(this.hist.dateExec);
      return d.toLocaleDateString("pl-PL", options);
    }
  },
  methods: {
    download() {
      this.$eventBus.$emit("onAddVideo", this.hist.videoUrl);

      this.flash(
        "Video <b>" + this.hist.title + "</b> has been added to download list",
        "warning",
        {
          timeout: 1000,
          icons: "warning"
        }
      );
    },
    play() {
      this.$router.push({
        name: "player",
        params: {
          url: this.hist.videoUrl,
          title: this.hist.title,
          router: "history"
        }
      });
    }
  }
};
</script>
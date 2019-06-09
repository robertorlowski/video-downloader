<template>
  <div class="bg-black text-white flex-1 ml-56 pl-6">
    <headerapp title="Download"></headerapp>
    <div class="flex-1 text-left mb-3">
      <label class="font-light mr-3">YouTube address:</label>
      <div class="w-full flex search-container text-center relative">
        <input
          ref="url"
          type="text"
          @keyup.enter="addVideoPlayList( $refs.url.value )"
          placeholder="https://www.youtube.com"
          class="bg-black text-grey-light w-full h-9 pl-8 border-b outline-none"
        >
        <div class="absolute pin-t py-2 px-1 text-grey-light">
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="18"
            height="18"
          >
            <path
              class="heroicon-ui"
              d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
            ></path>
          </svg>
        </div>
        <button
          class="uppercase text-white bg-blue h-8 w-9 ml-2 py-2 rounded mt-1 mr-10"
          @click="addVideoPlayList( $refs.url.value )"
        >
          <svg
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            width="16px"
            height="16px"
          >
            <path
              d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"
            ></path>
          </svg>
        </button>
      </div>
    </div>
    <div ref="downloadItems" class="flex flex-wrap pr-6"></div>
  </div>
</template>

<script>
import headerapp from "../components/Title.vue";
import DownloadItem from "../components/DownloadItem.vue";
import Vue from "vue";
import { getIdFromURL } from "vue-youtube-embed";
import ytpl from "ytpl";

export default {
  name: "download",
  components: {
    headerapp
  },
  data() {
    return {
      itemCount: 0
    };
  },
  mounted() {
    this.$appData.videoIds.forEach(element => {
      this.prepareVideo(element);
    });

    this.$eventBus.$on("onVideoAdded", url => {
      this.prepareVideo(url);
    });
  },
  methods: {
    story(url) {
      this.$router.push({
        name: "download-item",
        params: { url }
      });
    },

    addVideoPlayList(url) {
      const tmp = this;
      ytpl(url, function(err, playlist) {
        if (err) {
          tmp.addVideo(url);
        } else {
          playlist.items.forEach(item => {
            tmp.addVideo(item.url);
          });
        }
      });
    },

    addVideo(url) {
      this.$eventBus.$emit("onAddVideo", url);
    },

    prepareVideo(url) {
      this.itemCount++;
      const itemId = "DOWNLOAD_ITEM-" + this.itemCount;

      var DownloadItemClass = Vue.extend(DownloadItem);
      var instance = new DownloadItemClass({
        propsData: {
          url: url,
          itemId: itemId,
          destinanionFolder: this.$store.getters.destinanionFolder,
          autoDownload: this.$store.getters.autoDownload
        }
      });
      instance.$mount(); // pass nothing
      instance.$el.id = itemId;

      this.$refs.downloadItems.appendChild(instance.$el);
      instance.ref = getIdFromURL(url);
      instance.$on("deleteItem", itemId => {
        const itemElement = document.getElementById(itemId);
        if (itemElement === undefined) {
          return;
        }
        //this.$store.dispatch("removeVideo", url);
        this.$eventBus.$emit("onRemoveVideo", url);
        this.$refs.downloadItems.removeChild(itemElement);
      });

      instance.$on("playVideo", (url, title) => {
        this.$router.push({
          name: "player",
          params: { url: url, title: title, router: "download" }
        });
      });

      this.$refs.url.value = "";
    }
  }
};
</script>

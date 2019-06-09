import Vue from "vue";

const bus = new Vue({
  data: {
    videoIds: []
  }
});

bus.$on("onAddVideo", url => {
  if (url === "" || url == undefined) {
    return;
  }
  bus.videoIds.push(url);
  bus.$emit("onVideoAdded", url);
});

bus.$on("onRemoveVideo", videoId => {
  for (var i = bus.videoIds.length; i--; ) {
    if (bus.videoIds[i] === videoId) {
      bus.videoIds.splice(i, 1);
      return;
    }
  }
});

export default {
  install(Vue) {
    Object.defineProperties(Vue.prototype, {
      $eventBus: {
        get: function() {
          return bus;
        }
      },
      $appData: {
        get: function() {
          return bus;
        }
      }
    });
  }
};

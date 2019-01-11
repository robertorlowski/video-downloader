import Vue from 'vue';

const bus = new Vue({
  data :{
    videoIds: []
  }
});

bus.$on("onAddVideo", (url) => {
  bus.videoIds.push(url);
  console.log(url);
});

bus.$on("onRemoveVideo", (videoId) => {
   for (var i = bus.videoIds.length; i--;) {
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
        get: function () {
          return bus
        }
      },
      $appData: {
        get: function () {
          return bus;
        }
      }
    })
  }
}

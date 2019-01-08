<template>
  <div class="bg-black text-white flex-1 ml-56 pl-6">
    <headerapp title="YouTube search"></headerapp>
    <loading :active.sync="isLoading" :opacity="0.1" color=white></loading>    
    <div class="flex-1 text-left mb-3">
      <label class="font-light mr-3">YouTube search:</label>
      <div class="w-full flex search-container text-center relative">      
        <input ref="search" @keyup.enter="search( $refs.search.value )" type="text"  class="bg-black text-grey-light w-full h-9 pl-8 border-b outline-none ">
        <div class="absolute pin-t py-2 px-1 text-grey-light">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
            <path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
        </div>        
        <button class="uppercase text-white bg-blue h-9 w-10 ml-3 py-2 rounded mr-10" @click="search( $refs.search.value )">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18px" height="18px">
            <path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
        </button>         
      </div>
    </div>
    <div class="flex flex-wrap pr-6">  
      <search-item v-for="item in items" :key="item.videoId" :item="item" v-on:onDownload="onDownload"></search-item>            
    </div>
  </div>
</template>

<script>
import headerapp from '../components/Title.vue';
import SearchItem from '../components/SearchItem.vue';   
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';
import { ipcRenderer } from "electron"; 

export default {
  name: "search",
  components: {
      headerapp,
      SearchItem,
      Loading
  },
  data() {
    return {
      isLoading: false,      
      items: []
    }
  },
  methods: {
    search(_search) {
      console.log(_search);
      if (_search.trim() == "") {
        this.items = [];
        return;
      }

      this.isLoading = true;
      try {
        this.items = ipcRenderer.sendSync("yt-search", _search);
      } finally {
        this.isLoading = false;
      }
    },

    onDownload(url, title) {
      console.log(url);
      this.$store.dispatch("addVideo", "https://www.youtube.com" + url);
      this.flash('Video <b>'+ title +'</b> has been added to download list',
        'alert-warning', {
            timeout: 1000,
            displayIcons: true,
            icons: 'warning'
      });   

      for (var i = this.items.length; i--;) {
        console.log(this.items[i].url);
        if (this.items[i].url === url) {
          console.log("remove");
          this.items.splice(i, 1);
          return;
        }
      }     
    }, 
    

  }
}
</script>

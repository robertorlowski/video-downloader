<template>
  <div class="bg-black text-white flex-1 ml-56 pl-6">
    <headerapp title="YouTube downloader"></headerapp>

    <div class="flex-1 text-left">
      <label class="font-light mr-3">YouTube address:</label>
      <div class="w-full flex search-container text-center pt-1 relative">      
        <input ref="url" type="text" placeholder="https://www.youtube.com" class="bg-black text-grey-light w-full p-2 pl-8 border-b">
        <div class="absolute pin-t py-3 px-1 text-grey-light">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
            <path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"></path>
          </svg>
        </div>
        <button class="uppercase text-white bg-blue px-3 ml-4 py-2 rounded mr-6" @click="addVideoPlayList( $refs.url.value )">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="20" height="20">
            <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z"/>
          </svg>
        </button>         
      </div>
    </div>
    
    <div ref="downloadItems" class="flex-wrap w-full pt-2 pr-6">               
    </div>
    
    <!--
    <div class="discover-banner max-w-full text-white px-8 rounded-bl-lg pt-12 mb-10" @click="story('https://www.youtube.com/watch?v=kBE_gZkNyQU&t=6s')">
      <div class="uppercase mb-4">The Basics</div>
      <h1 class="font-normal mb-4">Create Persone Project</h1>
      <p class="w-64 leading-normal text-grey-lighter">With these apps, creativity has no boundaries.</p>
    </div>

    <div class="flex mb-10">
      <div class="w-1/2 mr-4 bg-grey-darkest rounded-lg flex px-8 py-6" @click="story('Get Focused, Fast')">
        <div class="flex-1">
            <div class="uppercase text-grey-light text-xs mb-1">Featured App</div>
            <h1 class="font-normal text-2xl mb-4">Get Focused, Fast</h1>
            <p class="text-grey-light text-xs leading-normal">OmniFocus transforms . zxczxc</p>
        </div>
        <div class="text-right">
          <img src="../assets/discover2.jpg" alt="image" class="rounded-full w-40">

        </div>
      </div>

      <div class="w-1/2 ml-4 bg-grey-darkest rounded-lg px-8 py-6" @click="story('Apps That Look Great in Dark Mode')">
          <div class="uppercase text-grey-light text-xs mb-1">Collection</div>
          <h1 class="font-normal text-2xl mb-4">Apps That Look Great in Dark Mode</h1>
          <p class="text-grey-light text-xs leading-normal mb-4">Dark is the new black.</p>
          <img src="../assets/icons_darkmode.png" alt="icons">
        </div>
    </div>

    <div class="border-b border-grey-darker mb-10"></div>

    <div class="apps-games-we-love">
      <div class="flex justify-between">
        <h2 class="font-normal mb-8">Apps and Games We Love Right Now</h2>
        <a href="#" class="text-blue no-underline">See All</a>
      </div>

      <div class="flex flex-wrap mb-4">
        <div class="w-1/2 flex" @click="product('QuarkXPress 2018 Pro')">
          <div class="w-24">
            <img src="../assets/icon_quark.png" alt="icon">
          </div>
          <div class="pl-6 flex-1 pr-6">
            <div class="mb-1">QuarkXPress 2018 Pro</div>
            <div class="text-grey text-xs mb-6">Love Print, Live Digital</div>
            <div class="mb-8">
              <span class="bg-white text-blue rounded-full px-3 py-1 text-xs font-bold">
                $399.99
              </span>
            </div>
            <div class="border-b border-grey-darker mb-10"></div>
          </div>
        </div>

        <div class="w-1/2 flex" @click="product('QuarkXPress 2018 Pro')">
          <div class="w-24">
            <img src="../assets/icon_quark.png" alt="icon">
          </div>
          <div class="pl-6 flex-1 pr-6">
            <div class="mb-1">QuarkXPress 2018 Pro</div>
            <div class="text-grey text-xs mb-6">Love Print, Live Digital</div>
            <div class="mb-8">
              <span class="bg-white text-blue rounded-full px-3 py-1 text-xs font-bold">
                $399.99
              </span>
            </div>
            <div class="border-b border-grey-darker mb-10"></div>
          </div>
        </div>

        <div class="w-1/2 flex" @click="product('QuarkXPress 2018 Pro')">
          <div class="w-24">
            <img src="../assets/icon_quark.png" alt="icon">
          </div>
          <div class="pl-6 flex-1 pr-6">
            <div class="mb-1">QuarkXPress 2018 Pro</div>
            <div class="text-grey text-xs mb-6">Love Print, Live Digital</div>
            <div class="mb-8">
              <span class="bg-white text-blue rounded-full px-3 py-1 text-xs font-bold">
                $399.99
              </span>
            </div>
            <div class="border-b border-grey-darker mb-10"></div>
          </div>
        </div>

        <div class="w-1/2 flex" @click="product('QuarkXPress 2018 Pro')">
          <div class="w-24">
            <img src="../assets/icon_quark.png" alt="icon">
          </div>
          <div class="pl-6 flex-1 pr-6">
            <div class="mb-1">QuarkXPress 2018 Pro</div>
            <div class="text-grey text-xs mb-6">Love Print, Live Digital</div>
            <div class="mb-8">
              <span class="bg-white text-blue rounded-full px-3 py-1 text-xs font-bold">
                $399.99
              </span>
            </div>
            <div class="border-b border-grey-darker mb-10"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="border-b border-grey-darker mb-10"></div>
    -->
  </div>
</template>

<script>
import headerapp from '../components/Title.vue';
import DownloadItem from '../components/DownloadItem.vue';
import Vue from "vue";
import { getIdFromURL } from 'vue-youtube-embed'
import ytpl from "ytpl";
      

export default {
  name: "main-view",
  components: {
      headerapp
  },
  data() {
    return {
      itemCount: 0
    }
  },
  methods: {
    story(url) {
      this.$router.push({
        name: 'download-item',
        params: { url }
      })
    },

    addVideoPlayList(url){
      const tmp = this;
      ytpl(url, function(err, playlist) {
        if(err) {
          tmp.addVideo(url)      
        } else {
          playlist.items.forEach(item => {
            tmp.addVideo(item.url);      
          });          
        }
      });

    },
    addVideo(url){

      this.itemCount++;
      const itemId = 'DOWNLOAD_ITEM-' + this.itemCount;

      var DownloadItemClass = Vue.extend(DownloadItem);
      var instance = new DownloadItemClass({
          propsData: { 
            url: url, 
            itemId: itemId,
            destinanionFolder: this.$store.getters.destinanionFolder,
            autoDownload: this.$store.getters.autoDownload
          }
      });      
      instance.$mount() // pass nothing
      instance.$el.id = itemId;
     
      this.$refs.downloadItems.appendChild(instance.$el)
      instance.ref = getIdFromURL(url);
      instance.$on('deleteItem', (itemId) => {
        const itemElement = document.getElementById(itemId);
        if ( itemElement === undefined) {
          return;
        }
        this.$refs.downloadItems.removeChild(itemElement);
      });
      instance.$on('playVideo', (url, title) => {
        console.log(url);
        this.$router.push({
          name: 'player',
          params: { url: url, title: title }
        });     
      });

      this.$refs.url.value = "";
    }
  }
};
</script>

<template>
  <transition name="router-animation" enter-active-class="animated slideInUp faster">
    <div class="bg-grey-darkest text-white flex mr-3 mb-3 h-28 rounded">
      <loading :active.sync="isLoading" :opacity="0.1" color=white></loading>
      <div class="ml-3 mt-3 w-32 rounded">
        <img v-bind:src="thumbnailUrl"  alt="icon">
      </div>
      <div class="w-75 mt-3 ml-1 pr-2">
        <div class="text-base w-full h-10 relative">{{title}}</div>              
        <div class="flex w-full">
          <div class="shadow w-full bg-grey-light text-grey-darkest ">
            <div class="bg-orange text-s leading-none" v-bind:style="{ width: progress + '%' }">_</div>
          </div>
        </div>        
        <div class="flex w-full pt-1">
          <div class="flex-1">
            <div class="text-grey-light text-xs mt-1 mb-1">Author: {{author}}</div>
        
            <div v-if="size" class="text-grey-light text-xs">Size: {{size}}</div>
          </div>
          <button class="uppercase text-white bg-blue mr-2 h-10 w-10 px-1 rounded-full" @click="play()">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="16px"
              height="16px"
              viewBox="0 0 18 18"
            >
              <path d="M4 4l12 6-12 6z"></path>
            </svg>
          </button>

          <button class="uppercase text-white bg-blue mr-2 h-10 w-10 px-1 rounded-full" @click="del()">
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18">
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
            </svg>
          </button>

          <button class="uppercase text-white bg-blue h-10 w-10 px-1 rounded-full" @click="download()" v-if="!isDownloading">
            <svg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              width="18px"
              height="18px"
              viewBox="0 0 20 20"
            >
            <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"></path>
            </svg>                
          </button>
          
          <button class="uppercase text-white bg-blue h-10 w-10 px-1 rounded-full" @click="cancel()" v-if="isDownloading">
            <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 20 20">
              <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
            </svg>
          </button>
        </div>
      </div>        
    </div>
  </transition>
</template>

<script>
  
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import Utils from '../Utils';
  import { ipcRenderer } from "electron";

  const ytdl = require('ytdl-core');
  var video;
  var writer;

  export default {
    name: "download-item",
    props: ['url','itemId','destinanionFolder','autoDownload'],
    components: {
      Loading
    },
    data() {
      return {
          progress :0,
          thumbnailUrl: "",
          title: " ",
          author:" ",
          size:"",
          isLoading: true,
          isDownloading: false
      }
    },
    mounted() {
      this.isLoading = true;
      ytdl.getInfo(this.url, (err, info) => {
          this.isLoading = false;
          if (err) 
            throw err;

          this.thumbnailUrl = info.thumbnail_url;
          this.title = info.title;          
          this.author = info.author.name;     
            
          if (this.autoDownload) {
            this.download();
          }  
      });
    },

    methods: {      
      play() {
        this.$emit('playVideo',  this.url, this.title);   
                
      },
      
      del() {
        this.cancel();
        this.$emit('deleteItem',  this.itemId);               
      },

      cancel() {
        if ( video !== undefined ) {
          video.unpipe(writer);
          video.destroy();       
        }
        this.progress = 0;      
        this.isDownloading = false;  
      },

      download() {
        const path = require('path');
        const fs   = require('fs');
        const self = this;

        const output = path.resolve(
                this.destinanionFolder.toString().replace('\\','\\\\'), 
                Utils.slugify(this.title.toString()) + '.mp4'
        );

        ytdl.getInfo(this.url, (err, info) => {
          if (err) 
            throw err;

          video = ytdl.downloadFromInfo(info,{ 
            filter: (format) => 
              format.container === 'mp4'
          });
          
          writer = fs.createWriteStream(output);
          video.pipe(writer);
          
          this.isDownloading = true;
          
          video.on('progress', (chunkLength, downloaded, total) => {
            this.size = ((total /1000000).toFixed(0)).toString() +" MB";
            const percent = downloaded / total;
            this.progress = (percent * 100).toFixed(0);
          });
          
          video.on('end', () => {
            this.isDownloading = false;
            this.addHistory(this.url, this.title, this.thumbnailUrl);      
            ipcRenderer.send("downloaded", this.title);  
            self.$emit('deleteItem',  this.itemId);         
          });
        });   
      },

      addHistory( url, title, thumbnailUrl ){
      
        const hist = {  
          videoUrl: url,
          imgUrl:thumbnailUrl,
          title,
          dateExec: new Date()
        };
        this.$emit('addHistory',  hist);      
      }
    }
    
  }
</script>
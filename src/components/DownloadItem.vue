<template>
  <transition name="router-animation" enter-active-class="animated slideInUp faster">
    <div class="bg-black text-white flex-1 h-40 w-full mr-6">
      <loading :active.sync="isLoading" :opacity="0.1" color=white></loading>
      <div class="flex h-36">
        <div class=" w-full bg-grey-darkest rounded-lg flex px-4 py-3">
          <div class="text-right mr-5 w-40 h-24 rounded">
            <img v-bind:src="thumbnailUrl" class="bg-grey-darkest w-40 rounded">
          </div>

          <div class="flex-1">
              <h1 class="font-normal text-lg mb-1">{{title}}</h1>
              
              <div class="text-grey-light text-xs mt-1 mb-1">Author: {{author}}</div>

              <div class="w-full pt-1  text-center">
                <div class="shadow w-full bg-grey-light text-grey-darkest ">
                <div class="bg-orange text-xs leading-none" v-bind:style="{ width: progress + '%' }">_</div>
                </div>
              </div>

              <div class="flex w-full mb-2 mt-1">
                <div class="text-grey-light text-xs w-28">Progress: {{progress}} %</div>
                <div v-if="size" class="text-grey-light text-xs">Size: {{size}}</div>
              </div>

              <button class="uppercase text-white bg-blue mr-3 px-4 py-2 rounded" @click="play()">
                <svg fill="currentColor" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 20 20">
                <path d="M4 4l12 6-12 6z"/>
                </svg>
                <span class="align-text-top">Play</span>
              </button>
              <button class="uppercase text-white bg-blue mr-3 px-4 py-2 rounded" @click="del()">
                <svg fill="currentColor" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 18 18">
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg>
                <span class="align-text-top">Delete</span>
              </button>
              <button class="uppercase text-white bg-blue mr-3 px-4 py-2 rounded" @click="download()" v-if="!isDownloading">
                <svg fill="currentColor" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 20 20">
                  <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                </svg>
                <span class="align-text-top">Download</span>
              </button>
              <button class="uppercase text-white bg-blue mr-3 px-4 py-2 rounded" @click="cancel()" v-if="isDownloading">
                <svg fill="currentColor" class="mr-2" xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 20 20">
                  <path d="M10 8.586L2.929 1.515 1.515 2.929 8.586 10l-7.071 7.071 1.414 1.414L10 11.414l7.071 7.071 1.414-1.414L11.414 10l7.071-7.071-1.414-1.414L10 8.586z"/>
                </svg>
                <span class="align-text-top">Cancel</span>
              </button>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  
  import Loading from 'vue-loading-overlay';
  import 'vue-loading-overlay/dist/vue-loading.css';
  import Utils from '../Utils';

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
          //console.log(info);
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
          
        const output = path.resolve(
                this.destinanionFolder.toString().replace('\\','\\\\'), 
                //this.title.toString().replace(':','').replace('.','').replace('|','').replace('\\','').replace('&','') +'.mp4');                  
                Utils.slugify(this.title.toString()) + '.mp4'
        );
        //console.log(output);

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
            //console.log(`${(percent * 100).toFixed(0)}% downloaded`);
          });
          
          video.on('end', () => {
            this.isDownloading = false;
            this.addHistory(this.url, this.title, this.thumbnailUrl);            
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
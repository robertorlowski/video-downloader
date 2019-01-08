<template>
  <transition name="router-animation" enter-active-class="animated slideInUp faster">
    <div class="ml-56 text-white pt-10 px-4">
      <div class="flex flex-wrap mb-2">
          <div class="w-full flex items-center">
            <div class="w-14">
              <button class="bg-black text-grey-light p-1 flex items-center justify-center rounded-full" @click="back">
                <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" width="37px" height="37px" viewBox="0 0 20 20">
                <path d="M0 10a10 10 0 1 1 20 0 10 10 0 0 1-20 0zm2 0a8 8 0 1 0 16 0 8 8 0 0 0-16 0zm8-2h5v4h-5v3l-5-5 5-5v3z"/></svg>
              </button>            
            </div>
            <h1 class="font-normal text-2xl mb-1">{{title}}</h1>
          </div>
        </div>
        <youtube :video-id="videoId" ref="youtube" player-width="940px" player-height="540px" :player-vars="{autoplay: 1}"></youtube>
    </div>
  </transition>
</template>

<script>
  import { getIdFromURL } from 'vue-youtube-embed'

  export default {
    props: ['url','title','router'],
    computed: {
      videoId: function() {
        return getIdFromURL(this.url);
      }
    },
    methods: {
      back(){
        this.$router.push({name: this.router})
      }
    }
  }
</script>


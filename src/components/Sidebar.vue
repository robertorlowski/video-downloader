
<template>
  <!--<button id="close" class="clickable"  @click="closeApp">Close</button>-->
  <div class="w-56 bg-grey-darkest text-white border-r border-backblack fixed min-h-screen pt-3" style="-webkit-app-region: drag">
    <div class="w-full flex-1 pl-3">
        <button class="clickable select-none" @click="close">
          <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 512 512">
            <path fill="rgb(237,125,103)" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1          C393,504.1,504.1,393,504.1,256z"/>
            <path fill="#000000" d="M285,256l72.5-84.2c7.9-9.2,6.9-23-2.3-31c-9.2-7.9-23-6.9-30.9,2.3L256,222.4l-68.2-79.2    c-7.9-9.2-21.8-10.2-31-2.3c-9.2,7.9-10.2,21.8-2.3,31L227,256l-72.5,84.2c-7.9,9.2-6.9,23,2.3,31c4.1,3.6,9.2,5.3,14.3,5.3    c6.2,0,12.3-2.6,16.6-7.6l68.2-79.2l68.2,79.2c4.3,5,10.5,7.6,16.6,7.6c5.1,0,10.2-1.7,14.3-5.3c9.2-7.9,10.2-21.8,2.3-31L285,256    z"/>
          </svg>
        </button>            

        <button class="clickable ml-1 select-none" @click="hide">
            <svg xmlns="http://www.w3.org/2000/svg" width="18px" height="18px" viewBox="0 0 512 512">
            <path fill="#f2d024" d="M504.1,256C504.1,119,393,7.9,256,7.9C119,7.9,7.9,119,7.9,256C7.9,393,119,504.1,256,504.1          C393,504.1,504.1,393,504.1,256z"/>
            </svg>        
        </button>            
    </div>
    
    <div class="sidebar-icons clickable pt-6">    
      <router-link to="/" class="sidebar-icon flex items-center px-4 py-2 text-grey cursor-pointer hover:bg-grey-darker no-underline ">
        <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 20 20">
          <path d="M0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm6 0v12h8V4H6zM2 5v2h2V5H2zm0 4v2h2V9H2zm0 4v2h2v-2H2zm14-8v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zM8 7l5 3-5 3V7z"/>
        </svg>
        <div class="text-white">YouTube</div>
      </router-link>

      <router-link to="/settings" class="sidebar-icon flex items-center px-4 py-2 text-grey cursor-pointer hover:bg-grey-darker no-underline">
        <svg fill="currentColor" class="mr-3" width="24px" height="24px" viewBox="0 0 24 24">
          <path d="M 9.6679688 2 L 9.1757812 4.5234375 C 8.3550224 4.8338012 7.5961042 5.2674041 6.9296875 5.8144531 L 4.5058594 4.9785156 L 2.1738281 9.0214844 L 4.1132812 10.707031 C 4.0445153 11.128986 4 11.558619 4 12 C 4 12.441381 4.0445153 12.871014 4.1132812 13.292969 L 2.1738281 14.978516 L 4.5058594 19.021484 L 6.9296875 18.185547 C 7.5961042 18.732596 8.3550224 19.166199 9.1757812 19.476562 L 9.6679688 22 L 14.332031 22 L 14.824219 19.476562 C 15.644978 19.166199 16.403896 18.732596 17.070312 18.185547 L 19.494141 19.021484 L 21.826172 14.978516 L 19.886719 13.292969 C 19.955485 12.871014 20 12.441381 20 12 C 20 11.558619 19.955485 11.128986 19.886719 10.707031 L 21.826172 9.0214844 L 19.494141 4.9785156 L 17.070312 5.8144531 C 16.403896 5.2674041 15.644978 4.8338012 14.824219 4.5234375 L 14.332031 2 L 9.6679688 2 z M 12 8 C 14.209 8 16 9.791 16 12 C 16 14.209 14.209 16 12 16 C 9.791 16 8 14.209 8 12 C 8 9.791 9.791 8 12 8 z"/>
        </svg>
        <div class="text-white">Settings</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ipcRenderer } from "electron";

export default {
  methods: {
    close: function() {
      ipcRenderer.send("close-app");
    },
    hide: function() {
      ipcRenderer.send("hide-app");
    }
  } 
};
</script>


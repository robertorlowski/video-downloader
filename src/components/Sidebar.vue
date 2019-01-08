
<template>
  <!--<button id="close" class="clickable"  @click="closeApp">Close</button>-->
  <div class="w-56 bg-grey-darkest text-white border-r border-backblack fixed min-h-screen pt-3" style="-webkit-app-region: drag">
    <div class="w-full flex-1 pl-4 pt-1">
        <button class="clickable select-none text-white bg-red-light rounded-full button-window" @click="close">          
          <svg width="12px" height="12px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M1175 1321l146-146q10-10 10-23t-10-23l-233-233 233-233q10-10 10-23t-10-23l-146-146q-10-10-23-10t-23 10l-233 233-233-233q-10-10-23-10t-23 10l-146 146q-10 10-10 23t10 23l233 233-233 233q-10 10-10 23t10 23l146 146q10 10 23 10t23-10l233-233 233 233q10 10 23 10t23-10zm617-1033v1216q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-1216q0-66 47-113t113-47h1472q66 0 113 47t47 113z"/>
          </svg>
        </button>            

        <button class="clickable select-none ml-1 text-white bg-blue-dark rounded-full button-window" @click="hide">          
          <svg width="12px" height="12px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
            <path fill="currentColor" d="M1792 1312v192q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-192q0-66 47-113t113-47h1472q66 0 113 47t47 113z"/>
          </svg>
        </button>            
    </div>
    
    <div class="sidebar-icons clickable pt-6">    

      <router-link to="/" class="sidebar-icon flex items-center px-4 py-2 text-grey cursor-pointer hover:bg-grey-darker no-underline">
          <svg width="24px" class="mr-3" height="24px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M1216 832q0-185-131.5-316.5t-316.5-131.5-316.5 131.5-131.5 316.5 131.5 316.5 316.5 131.5 316.5-131.5 131.5-316.5zm512 832q0 52-38 90t-90 38q-54 0-90-38l-343-342q-179 124-399 124-143 0-273.5-55.5t-225-150-150-225-55.5-273.5 55.5-273.5 150-225 225-150 273.5-55.5 273.5 55.5 225 150 150 225 55.5 273.5q0 220-124 399l343 343q37 37 37 90z"/>
          </svg>
        <div class="text-white">Search</div>
      </router-link>

      <router-link to="/download" class="sidebar-icon flex items-center px-4 py-2 text-grey cursor-pointer hover:bg-grey-darker no-underline ">
        <svg class="mr-3" width="24px" height="24px" viewBox="0 0 20 20">
          <path fill="currentColor" d="M0 4c0-1.1.9-2 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm6 0v12h8V4H6zM2 5v2h2V5H2zm0 4v2h2V9H2zm0 4v2h2v-2H2zm14-8v2h2V5h-2zm0 4v2h2V9h-2zm0 4v2h2v-2h-2zM8 7l5 3-5 3V7z"/>
        </svg>
        <div class="text-white flex">YouTube 
        </div>
        <div class="bg-red-light text-white  rounded ml-1 pl-1 pr-2 pb-1  " v-if="videoCount>0">
          <i><small>{{videoCount}}</small></i>
        </div>
      </router-link>

      <router-link to="/history" class="sidebar-icon flex items-center px-4 py-2 text-grey cursor-pointer hover:bg-grey-darker no-underline">
          <svg width="24px" class="mr-3" height="24px" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
          <path fill="currentColor" d="M1664 896q0 156-61 298t-164 245-245 164-298 61q-172 0-327-72.5t-264-204.5q-7-10-6.5-22.5t8.5-20.5l137-138q10-9 25-9 16 2 23 12 73 95 179 147t225 52q104 0 198.5-40.5t163.5-109.5 109.5-163.5 40.5-198.5-40.5-198.5-109.5-163.5-163.5-109.5-198.5-40.5q-98 0-188 35.5t-160 101.5l137 138q31 30 14 69-17 40-59 40h-448q-26 0-45-19t-19-45v-448q0-42 40-59 39-17 69 14l130 129q107-101 244.5-156.5t284.5-55.5q156 0 298 61t245 164 164 245 61 298zm-640-288v448q0 14-9 23t-23 9h-320q-14 0-23-9t-9-23v-64q0-14 9-23t23-9h224v-352q0-14 9-23t23-9h64q14 0 23 9t9 23z"/>
          </svg>
        <div class="text-white">History</div>
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
  },
  computed: {
    videoCount() {
      return this.$store.getters.videoCount;
    }
  } 
};
</script>


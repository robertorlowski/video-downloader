<template>
  <div class="bg-black text-white flex-1 ml-56 pl-6">
    <headerapp></headerapp>
    <div class="flex-1 w-full text-left">
      <label class="font-light mr-3">Destination foder for video files:</label>
      <div class="flex search-container text-center pt-1 relative">      
        <input type="text" v-model="destFolder" placeholder="c:\download" class="bg-black text-grey-light w-full p-2 pl-8 border-b">
        <div class="absolute pin-t py-3 px-1 text-grey-light">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
            <path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"/>
          </svg>
        </div>
        <button class="uppercase text-white bg-blue px-3 ml-4 py-2 rounded mr-6" @click="chooseFolder()">
          <svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" width="18" height="18">
            <path d="M0 4c0-1.1.9-2 2-2h7l2 2h7a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z"/>
          </svg>
        </button>        
      </div>
      <div class="mb-2 pt-3">                
          <label class="font-light mr-3">Auto download video files:</label>
          <div class="form-switch inline-block align-middle">
              <input type="checkbox" v-model="autoDownload" name="1" id="1" class="form-switch-checkbox" />
              <label class="form-switch-label" for="1"></label>
          </div>
          <label class="text-xs text-grey-dark" for="1">{{ `${ autoDownload ? '(on)' : '(off)' }` }}</label>
      </div>
    </div>
  </div>
</template>

<script>
import headerapp from '../components/Title.vue';
import { ipcRenderer } from "electron";

export default {
  components: {
      headerapp
  },
  methods:{
    chooseFolder: function() {
      ipcRenderer.send("choose-folder");
    }     
  },
  computed: {
    destFolder: {
        get () {
          return this.$store.getters.destinanionFolder;
        },
        set (value) {
           this.$store.dispatch("updateDestinanionFolder", value);
        }
    },
    autoDownload: {
        get () {
          return this.$store.getters.autoDownload;
        },
        set (value) {
           this.$store.dispatch("updateAutoDownload", value);
        }
    }

  }    
  
};
</script>

<template>
  <div class="bg-black text-white flex-1 ml-56 pl-6">
    <headerapp title="History"></headerapp>
    <div class="flex flex-wrap pr-6">  
      <history-item v-for="hist in history" :key="hist.dateExec" :hist="hist" ></history-item>            
    </div>
  </div>
</template>

<script>
import headerapp from '../components/Title.vue';
import HistoryItem from '../components/HistoryItem.vue';    
import { ipcRenderer } from "electron";

export default {
  name: "history",
  components: {
      headerapp,
      HistoryItem
  },
  data() {
    return {
    }
  },
  computed: {
    history: {
        get () {
          return ipcRenderer.sendSync("history-get");
        }
    }
  }
};
</script>

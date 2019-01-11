import Vue from "vue";
import Vuex from "vuex";
import { createPersistedState, createSharedMutations } from "vuex-electron";
import database from "./api/database";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      destinationFolder: "",
      autoDownload: false
    }
  },

  mutations: {
    updateDestinanionFolder(state, destinationFolder) {
      state.settings.destinationFolder = destinationFolder;
    },
    
    updateAutoDownload(state, autoDownload) {
      state.settings.autoDownload = autoDownload;           
    },
    
    updateSettings(state, sss) {
      state.settings = sss;
    },

    closeDatabase() {
    },
  },

  getters: {
        
    destinanionFolder: state => {
      return state.settings.destinationFolder;
    },
    autoDownload: state => {
      return state.settings.autoDownload;
    },
    settings: state => {
      return state.settings;
    }
  },

  actions: {
    updateDestinanionFolder(store, destinationFolder) {
      store.commit("updateDestinanionFolder", destinationFolder);
    },

    updateAutoDownload(store, autoDownload) {
      store.commit("updateAutoDownload", autoDownload);
    },

    initDatabase(store, path){
      database.initDatabase(path, () => {
        database.settings((settings)=>{
          if ( settings.destinationFolder == undefined ) {
            settings.destinationFolder = path;
          }
          store.commit("updateSettings", settings);
        });  
      });
    },
    
    closeDatabase(store) {
      database.updateSettings(store.getters.settings);
      database.closeDatabase(()=>{
        store.commit("closeDatabase");
      });      
    }
  },

  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== "production"
});

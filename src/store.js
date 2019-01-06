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
    },
    history: [],
    videoIds: []
  },

  mutations: {
    initialize(state) {
      state.videoIds = [];
    },

    updateDestinanionFolder(state, destinationFolder) {
      state.settings.destinationFolder = destinationFolder;
    },
    
    updateAutoDownload(state, autoDownload) {
      state.settings.autoDownload = autoDownload;           
    },
    
    updateSettings(state, sss) {
      state.settings = sss;
    },

    updateHistory(state, history) {
      state.history = history;
    },

    addHistory(state, hist) {
      state.history.unshift(hist);
     },

    closeDatabase() {

    },

    addVideo(state, videoId) {
      state.videoIds.push(videoId);
    },

    removeVideo(state, videoId) {
      for (var i = state.videoIds.length; i--;) {
        if (state.videoIds[i] === videoId) {
          state.videoIds.splice(i, 1);
          return;
        }
      }      
    }
  },

  getters: {
        
    destinanionFolder: state => {
      return state.settings.destinationFolder;
    },
    autoDownload: state => {
      return state.settings.autoDownload;
    },
    history: state => {
      return state.history;
    },

    settings: state => {
      return state.settings;
    },

    videoCount: state => {
      return state.videoIds.length;
    },
    videoLastAdded: state => {
      if ( state.videoIds.length == 0 ) {
        return null;
      } 
      return state.videoIds[state.videoIds.length-1];
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
      store.commit("initialize");
      database.initDatabase(path, () => {
        database.settings((settings)=>{
          if ( settings.destinationFolder == undefined ) {
            settings.destinationFolder = path;
          }
          store.commit("updateSettings", settings);
        });  

        database.history((history)=>{
          store.commit("updateHistory", history);
        });
      });
    },
    
    closeDatabase(store) {
      database.updateSettings(store.getters.settings);
      database.updateHistory(store.getters.history);
      database.closeDatabase(()=>{
        store.commit("closeDatabase");
      });      
    },

    addHistory(store, hist) {
      store.commit("addHistory", hist);
    },

    addVideo(store, videoId) {
      store.commit("addVideo", videoId);
    },

    removeVideo(store, videoId) {
      store.commit("removeVideo", videoId);
    }

  },

  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== "production"
});

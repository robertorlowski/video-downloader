import Vue from "vue";
import Vuex from "vuex";
import { createPersistedState, createSharedMutations } from "vuex-electron"
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    settings: {
      destinationFolder:"",
      autoDownload: false
    }
  },
  mutations: {
    updateDestinanionFolder (state, destFolder) {
      state.settings.destinationFolder = destFolder
    },
    updateAutoDownload (state, autoDownload) {
      state.settings.autoDownload = autoDownload
    }

  },
  
  getters: {
    destinanionFolder: state => {
      return state.settings.destinationFolder;
    },
    autoDownload: state => {
      return state.settings.autoDownload;
    }    
  },

  actions: {
    updateDestinanionFolder(store, destFolder) {
      store.commit("updateDestinanionFolder", destFolder);
    },
    updateAutoDownload(store, autoDownload) {
      store.commit("updateAutoDownload", autoDownload);
    }

  },

  plugins: [createPersistedState(), createSharedMutations()],
  strict: process.env.NODE_ENV !== "production"
});

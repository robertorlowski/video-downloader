/* jshint node: true */
"use strict";
import path  from "path";
import fs  from "fs";
import loki from "lokijs";

export default {
    database:null,
    defaultSettings: {
        destinationFolder: "",
        autoDownload: false
    }
  ,

  initDatabase(pathData, callback) {
    const configFilePath = path.join(pathData, "data.json");

    this.database = new loki(configFilePath, {
      autosave: true
    });

    if (!fs.existsSync(configFilePath)) {
      this._prepareCollection('settings'); 
      this._prepareCollection('history'); 
    }

    this.database.loadDatabase(null, (err) =>{
      if (err) {
        throw err;
      }
      callback()  
    });
  },

  closeDatabase(callback) {
    var self = this;

    this.database.saveDatabase(function(err) {
      if (err) {
        throw err;
      }
      self.database.close(() => {
        callback();
      });
    });    
  },

  _prepareCollection(collection) {
    this.database.addCollection(collection);
    this.database.saveDatabase(function(err) {
      if (err) {
        throw err;
      }
    });
  },

  settings(callback) {
    var result = null;
    var settings = this.database.getCollection("settings");
  
    if (settings != null && settings != undefined) {
      if (settings.data.length >0) {
        result = settings.data[0];
      }  
    } 

    if (result == null || result == undefined ) {
        result = this.defaultSettings;
    }

    callback(result);
  },

  updateSettings(data) {
    var settings = this.database.getCollection("settings");   

    if (settings == null && settings == undefined) {
        this._prepareCollection('settings');
        settings = this.database.getCollection("settings");  
    }

    settings.clear();
    settings.insert({
        destinationFolder: data.destinationFolder,
        autoDownload: data.autoDownload
    });
    settings.flushChanges();
  },

  history(callback) {
    var history = this.database.getCollection("history");
  
    if (history != null && history != undefined) {     
      callback(history.chain()
        .sort(function(obj1, obj2) {
                if (obj1.dateExec === obj2.dateExec) return 0;
                if (obj1.dateExec > obj2.dateExec) return -1;
                if (obj1.dateExec < obj2.dateExec) return 1;
              })
        .limit(100)
        .data());
    } else {
      callback([]);
    }
  },

  historyAdd(hist, callback) {
    var history = this.database.getCollection("history");   

    if (history == null && history == undefined) {
        this._prepareCollection('history');
        history = this.database.getCollection("history");  
    }

    history.insert({
      videoUrl: hist.videoUrl,
      imgUrl: hist.imgUrl,
      title: hist.title,
      dateExec: hist.dateExec
    });

    history.flushChanges();

    callback(null);
  },

  historyClear(callback) {
    var history = this.database.getCollection("history");   

    if (history == null && history == undefined) {
        this._prepareCollection('history');
        history = this.database.getCollection("history");  
    }

    history.clear();
    history.flushChanges();

    callback(null);
  }  
};

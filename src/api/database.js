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
  }
  
};

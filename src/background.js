"use strict";

import {
  app,
  protocol,
  BrowserWindow,
  Tray,
  Menu,
  nativeImage,
  ipcMain,
  dialog,
  remote
} from "electron";

import {
  createProtocol,
  installVueDevtools
} from "vue-cli-plugin-electron-builder/lib";

import store from "./store";


const isDevelopment = process.env.NODE_ENV !== "production";
process.env.FLUENTFFMPEG_COV = false;

const path = require('path');

const iconFile = path.join(__static, 'assets/app.png');
const trayIcon = nativeImage.createFromPath(iconFile);
/*
if (
  process.env.NODE_ENV === 'development' ||
  process.env.DEBUG_PROD === 'true'
) {
  require('electron-debug')();

  const p = path.join(__dirname, '..', 'src', 'node_modules');
  require('module').globalPaths.push(p);
}
*/

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let tray;

// Standard scheme must be registered before the app is ready
protocol.registerStandardSchemes(["app"], { secure: true });

function createWindow() {

  // Create the browser window.
  win = new BrowserWindow({
    width: 1200,
    height: 750,
    titleBarStyle: "hiddenInset",
    frame: false,
    icon: iconFile,
    webPreferences: {webSecurity: false}
  })
 
  win.setOpacity(0.98);

  if (isDevelopment) {
    // Load the url of the dev server if in development mode
    win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
      
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadFile("index.html");
  }

  //win.webContents.openDevTools();
  
  win.on("minimize", function(event) {
    event.preventDefault();
    hideApp();
  });

  win.on("close", function(event) {
    if (!app.isQuiting) {
      event.preventDefault();
      hideApp();
    }

    return false;
  });

  win.setMenu(null);

  createTray();

  store.dispatch("initDatabase", (app || remote.app).getPath('userData'));
}
  
const handleError = (title, error) => {
  console.log(title);
  console.log(error);
}

process.on('uncaughtException', error => {
  handleError('Unhandled Error', error);
});

process.on('unhandledRejection', error => {
  handleError('Unhandled Promise Rejection', error);
});   

function createTray() {

  tray = new Tray(trayIcon);
  tray.setToolTip('Video Downloader.')
  tray.setTitle('Video Downloader.')
  
  tray.on("click", () => {
    hideApp();
  });

  var contextMenu = Menu.buildFromTemplate([
    {
      label: "Show downloader",
      click: function() {
        win.show();
      }
    },
    {
      label: "Quit",
      click: function() {
        closeApp();
      }
    }
  ]);

  tray.setToolTip("Video downloader");
  tray.setContextMenu(contextMenu);
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    closeApp();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow();
  }
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    await installVueDevtools();
  }
  createWindow();
});


// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        closeApp();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      closeApp();
    });
  }
}

function closeApp() {
  console.log("close database");
  store.subscribe((mutation)=>{
    if (mutation.type ==='closeDatabase') {
      console.log("close app");
      app.isQuiting = true;
      app.quit();
      if (tray) {
        tray.destroy();
      }    
    }  
  });
  
  store.dispatch("closeDatabase");
}

function hideApp() {
  if ( win.isVisible() ) {
    win.hide()
    tray.displayBalloon({title:'Video Downloader.', content: 'Video Downloader.'});
  } else {
    win.show();
  }
}

ipcMain.on('close-app', function() {
  closeApp();
});

ipcMain.on('hide-app', function() {
  hideApp();
});

ipcMain.on('choose-folder', function() {
  dialog.showOpenDialog({
    title:"Select a folder for video files",
    properties: ["openDirectory"]
  }, (folderPaths) => {
      // folderPaths is an array that contains all the selected paths
      if(folderPaths === undefined){
          console.log("No destination folder selected");
          return;
      }else{
        store.dispatch("updateDestinanionFolder", folderPaths);
      }
  });
});

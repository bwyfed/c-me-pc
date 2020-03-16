const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { resolve } = require('path');

let win;
app.on('ready', () => {
  win = new BrowserWindow({
    width: 1080,
    height: 568,
    webPreferences: {
      nodeIntegration: true
    }
  });
  if (isDev) {
    win.loadURL('http://localhost:8080/');
  } else {
    win.loadFile(resolve(__dirname, '../renderer/pages/main/index.html'));
  }
});

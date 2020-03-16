const { app, BrowserWindow } = require('electron');
const isDev = require('electron-is-dev');
const { resolve } = require('path');
const AppWindow = require('./common/AppWindow');

let mainWindow;
app.on('ready', () => {
  const mainWindowConfig = {
    width: 1440,
    height: 768
  };
  const urlLocation = isDev
    ? 'http://localhost:8080/'
    : `file://${resolve(__dirname, '../renderer/pages/main/index.html')}`;
  // const urlTest = `file://${resolve(
  //   __dirname,
  //   '../renderer/pages/main/index.html'
  // )}`;
  mainWindow = new AppWindow(mainWindowConfig, urlLocation);
  mainWindow.on('closed', () => {
    mainWindow = null; // 回收变量
  });
  // if (isDev) {
  //   win.loadURL('http://localhost:8080/');
  // } else {
  //   win.loadFile(resolve(__dirname, '../renderer/pages/main/index.html'));
  // }
});

const { resolve } = require('path');
const AppWindow = require('../common/AppWindow');
const isDev = require('electron-is-dev');

let mainWindow;
function create() {
  const mainWindowConfig = {
    width: 1024,
    height: 768
  };
  const urlLocation = isDev
    ? 'http://localhost:8080/'
    : `file://${resolve(__dirname, '../../renderer/pages/main/index.html')}`;
  // const urlTest = `file://${resolve(
  //   __dirname,
  //   '../../renderer/pages/main/index.html'
  // )}`;
  mainWindow = new AppWindow(mainWindowConfig, urlLocation);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

module.exports = { create };

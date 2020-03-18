const { resolve } = require('path');
import AppWindow from '../common/AppWindow';
const isDev = require('electron-is-dev');

function create() {
  let mainWindow;
  const mainWindowConfig = {
    width: 1024,
    height: 768
  };
  // const urlLocation = isDev
  //   ? 'http://localhost:8080/'
  //   : `file://${resolve(__dirname, '../../renderer/pages/main/index.html')}`;
  // const urlTest = `file://${resolve(
  //   __dirname,
  //   '../../renderer/pages/main/index.html'
  // )}`;
  mainWindow = new AppWindow(mainWindowConfig, '', 'index.html', '#/about');
  return mainWindow;
}

export { create };

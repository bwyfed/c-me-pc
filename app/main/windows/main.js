const { resolve } = require('path');
const AppWindow = require('../common/AppWindow');

let mainWindow;
function create() {
  const mainWindowConfig = {
    width: 1024,
    height: 768
  };
  // const urlLocation = isDev
  //   ? 'http://localhost:8080/'
  //   : `file://${resolve(__dirname, '../renderer/pages/main/index.html')}`;
  const urlTest = `file://${resolve(
    __dirname,
    '../../renderer/pages/main/index.html'
  )}`;
  mainWindow = new AppWindow(mainWindowConfig, urlTest);
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

module.exports = { create };

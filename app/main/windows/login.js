const { resolve } = require('path');
const AppWindow = require('../common/AppWindow');

let loginWindow;
function create() {
  const loginWindowConfig = {
    width: 800,
    height: 600
  };
  // const urlLocation = isDev
  //   ? 'http://localhost:8080/'
  //   : `file://${resolve(__dirname, '../renderer/pages/main/index.html')}`;
  const urlTest = `file://${resolve(
    __dirname,
    '../../renderer/pages/login/index.html'
  )}`;
  loginWindow = new AppWindow(loginWindowConfig, urlTest);
  loginWindow.on('closed', () => {
    loginWindow = null;
  });
}

module.exports = { create };

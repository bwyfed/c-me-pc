const { resolve } = require('path');
import AppWindow from '../common/AppWindow';

function create() {
  let loginWindow;
  const loginWindowConfig = {
    width: 800,
    height: 600
  };
  // const urlLocation = isDev
  //   ? 'http://localhost:8080/'
  //   : `file://${resolve(__dirname, '../renderer/pages/main/index.html')}`;
  // const urlTest = `file://${resolve(
  //   __dirname,
  //   '../../renderer/pages/login/index.html'
  // )}`;
  loginWindow = new AppWindow(
    loginWindowConfig,
    'subpage',
    'subpage.html',
    '#/about2'
  );
  return loginWindow;
}

export { create };

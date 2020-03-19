// 主进程入口
'use strict';

import { app, protocol, BrowserWindow } from 'electron';
import {
  createProtocol
  /* installVueDevtools */
} from 'vue-cli-plugin-electron-builder/lib';
const isDevelopment = process.env.NODE_ENV !== 'production';
console.log('main process....');
console.log(isDevelopment);
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win;
let secondWin;
let createAppProtocol = false;

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: 'app', privileges: { secure: true, standard: true } }
]);

function createWindow(winVar, winConfig, devPath, prodPath, route) {
  const baseConfig = {
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    show: false,
    backgroundColor: 'efefef'
  };
  const finalConfig = { ...baseConfig, ...winConfig };
  // Create the browser window.
  winVar = new BrowserWindow(finalConfig);

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    console.log(
      'process.env.WEBPACK_DEV_SERVER_URL',
      process.env.WEBPACK_DEV_SERVER_URL
    );
    // Load the url of the dev server if in development mode
    console.log(process.env.WEBPACK_DEV_SERVER_URL + devPath + route);
    winVar.loadURL(process.env.WEBPACK_DEV_SERVER_URL + devPath + route);
    if (!process.env.IS_TEST) winVar.webContents.openDevTools();
  } else {
    console.log('build.....');
    if (!createAppProtocol) {
      createProtocol('app');
      createAppProtocol = true;
    }
    // Load the index.html when not in development
    winVar.loadURL(`app://./${prodPath}${route}`);
  }
  winVar.once('ready-to-show', () => {
    winVar.show();
  });
  winVar.on('closed', () => {
    winVar = null;
  });
}

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
const mainWindowConfig = {
  width: 1024,
  height: 768
};
const loginWindowConfig = {
  width: 800,
  height: 600
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', async () => {
  if (isDevelopment && !process.env.IS_TEST) {
    // Install Vue Devtools
    // Devtools extensions are broken in Electron 6.0.0 and greater
    // See https://github.com/nklayman/vue-cli-plugin-electron-builder/issues/378 for more info
    // Electron will not launch with Devtools extensions installed on Windows 10 with dark mode
    // If you are not using Windows 10 dark mode, you may uncomment these lines
    // In addition, if the linked issue is closed, you can upgrade electron and uncomment these lines
    try {
      await installVueDevtools();
    } catch (e) {
      console.error('Vue Devtools failed to install:', e.toString());
    }
  }
  createWindow(win, mainWindowConfig, '', 'index.html', '#/about');
  createWindow(
    secondWin,
    loginWindowConfig,
    'subpage',
    'subpage.html',
    '#/about2'
  );
});
app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (win === null) {
    createWindow(win, mainWindowConfig, '', 'index.html', '#/about');
  }
  if (secondWin === null) {
    createWindow(
      secondWin,
      loginWindowConfig,
      'subpage',
      'subpage.html',
      '#/about2'
    );
  }
});

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === 'win32') {
    process.on('message', data => {
      if (data === 'graceful-exit') {
        app.quit();
      }
    });
  } else {
    process.on('SIGTERM', () => {
      app.quit();
    });
  }
}

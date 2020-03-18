const { app, protocol } = require('electron');
import {
  createProtocol
  // installVueDevtools
} from 'vue-cli-plugin-electron-builder/lib';
const { create: createMainWindow } = require('./windows/main');
const { create: createLoginWindow } = require('./windows/login');

const isDevelopment = process.env.NODE_ENV !== 'production';

let mainWindow;
let loginWindow;

protocol.registerSchemesAsPrivileged([
  { scheme: 'cme', privileges: { secure: true, standard: true } }
]);
// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    mainWindow = createMainWindow();
  }
  if (loginWindow === null) {
    loginWindow = createLoginWindow();
  }
});

app.on('ready', async () => {
  // if (isDevelopment && !process.env.IS_TEST) {
  //   try {
  //     await installVueDevtools();
  //   } catch (e) {
  //     console.error('Vue Devtools failed to install:', e.toString());
  //   }
  // }
  mainWindow = createMainWindow();
  loginWindow = createLoginWindow();
  mainWindow.on('closed', () => {
    mainWindow = null;
  });
  loginWindow.on('closed', () => {
    loginWindow = null;
  });
});
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

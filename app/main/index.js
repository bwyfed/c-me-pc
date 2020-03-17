const { app } = require('electron');
const { create: createMainWindow } = require('./windows/main');
const { create: createLoginWindow } = require('./windows/login');

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('ready', () => {
  createMainWindow();
});

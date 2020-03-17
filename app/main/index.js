const { app } = require('electron');
const { create: createMainWindow } = require('./windows/main');
const { create: createLoginWindow } = require('./windows/login');

app.on('ready', () => {
  createMainWindow();
});

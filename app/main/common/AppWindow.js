const { BrowserWindow } = require('electron');

class AppWindow extends BrowserWindow {
  constructor(config, urlLocation) {
    const baseConfig = {
      width: 800,
      height: 600,
      webPreferences: {
        nodeIntegration: true
      },
      show: false,
      backgroundColor: 'efefef'
    };
    const finalConfig = { ...baseConfig, ...config };
    super(finalConfig);
    this.loadURL(urlLocation);
    this.once('ready-to-show', () => {
      this.show();
    });
  }
}

module.exports = AppWindow;

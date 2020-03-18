import { BrowserWindow } from 'electron';
import { createProtocol } from 'vue-cli-plugin-electron-builder/lib';

class AppWindow extends BrowserWindow {
  constructor(config, devPath, prodPath, route) {
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
    this.devPath = devPath;
    this.prodPath = prodPath;
    this.route = route;
    if (process.env.WEBPACK_DEV_SERVER_URL) {
      // Load the url of the dev server if in development mode
      const devUrl =
        process.env.WEBPACK_DEV_SERVER_URL + this.devPath + this.route;
      console.log('devUrl', devUrl);
      this.loadURL(devUrl);
      if (!process.env.IS_TEST) this.webContents.openDevTools();
    } else {
      if (!AppWindow.createAppProtocol) {
        createProtocol('cme');
        AppWindow.createAppProtocol = true;
      }
      // Load the index.html when not in development
      const prodUrl = `app://./${prodPath}${route}`;
      console.log('prodUrl', prodUrl);
      this.loadURL(prodUrl);
    }
    this.once('ready-to-show', () => {
      this.show();
    });
  }
}

AppWindow.createAppProtocol = false;

export default AppWindow;

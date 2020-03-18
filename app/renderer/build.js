const fs = require('fs-extra');
const dest = '../../release';
fs.removeSync(dest);
fs.moveSync('./release', dest);
fs.removeSync('./dist');

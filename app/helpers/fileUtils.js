// helpers/fileUtils.js
const fs = require('fs');
const path = require('path');

function getLatestModifiedDate(dirPath) {
  let latest = 0;

  function checkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      const stats = fs.statSync(fullPath);

      if (stats.isDirectory()) {
        checkDir(fullPath);
      } else {
        if (stats.mtimeMs > latest) {
          latest = stats.mtimeMs;
        }
      }
    }
  }

  checkDir(dirPath);
  return new Date(latest);
}

module.exports = { getLatestModifiedDate };

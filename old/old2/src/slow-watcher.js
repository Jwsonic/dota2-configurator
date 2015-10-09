import fs from 'fs';
import path from 'path';

const checkTimeout = 100;

export function slowWatch(filePath, callback) {
  fs.watch(filePath, (event, fName) => {
    let fullPath = path.resolve(filePath, fName);

    if (event === 'rename') {

      try {
        let oldSize = fs.statSync(fullPath).size;

        let checkFile = () => {
          let newSize = fs.statSync(fullPath).size;

          if (newSize > oldSize) {
            console.log(`Still writing. Old size: ${oldSize}, new size: ${newSize}`);
            oldSize = newSize;
            setTimeout(checkFile, checkTimeout);
          } else {
            console.log('File is fully written!');
            callback(fullPath);
          }
        };

        setTimeout(checkFile, checkTimeout);
      } catch (e) {}

    }
  });
}

import {findHeroInFile}from './condump.js';
import {slowWatch} from './slow-watcher.js';
import path from 'path';
// import fs from 'fs';
import notifier from 'node-notifier';

const dotaPath = path.resolve('/', 'Program Files (x86)', 'Steam', 'steamapps', 'common', 'dota 2 beta', 'game', 'dota');
const reCondumpFile = /condump\d\d\d\.txt$/;


slowWatch(path.resolve('temp'), (fPath) => {

  if (reCondumpFile.test(fPath)) {

    findHeroInFile(fPath)
      .then(heroName => {
        let message = `You picked: ${heroName}!`;

        notifier.notify({
          'title': 'Hero Picked!',
          message
        });

        console.log(message);
      })
      .catch(err => {
        notifier.notify({
          'title': 'Error!',
          'message': err
        });

        console.error(err);
      });

  }
});
//
//
// fs.watch(dotaPath, (event, fName) => {
//   // console.log(event, fPath);
//   if (event === 'rename' && reCondumpFile.test(fName)) {
//     let fPath = path.join(dotaPath, fName);
//
//     findHeroWhenFileIsWritten(fPath)
//       .then(heroName => {
//         let message = `You picked: ${heroName}!`;
//
//         notifier.notify({
//           'title': 'Hero Picked!',
//           message
//         });
//
//         console.log(message);
//       })
//       .catch(err => {
//         notifier.notify({
//           'title': 'Error!',
//           'message': err
//         });
//
//         console.error(err);
//       })
//       .finally(() => fs.unlink(fPath));
//   }
// });

notifier.notify({
  'title': 'Up and running!',
  'message': 'Now watching for hero data!'
});

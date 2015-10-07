import {findHeroInFile} from './condump.js';
import {slowWatch} from './slow-watcher.js';
import path from 'path';
import fs from 'fs';
import notifier from 'node-notifier';
import dotaWatcher from './dotaWatcher.js';

const dotaPath = path.resolve('/', 'Program Files (x86)', 'Steam', 'steamapps', 'common', 'dota 2 beta', 'game', 'dota');
const reCondumpFile = /condump\d\d\d\.txt$/;

dotaWatcher.on('start', () => notifier.notify({
  'title': 'Dota is running!',
  'message': 'Now watching for hero data!'
}));

dotaWatcher.on('stop', () => console.log('Dota was closed'));

let s = fs.createReadStream(path.resolve(dotaPath, 'console.log'), {
  flags: 'r',
  encoding: 'utf8',
  autoClose: false
});

s.on('data', chunk => console.log(chunk.length));

// slowWatch(path.resolve('temp'), (fPath) => {
//
//   if (reCondumpFile.test(fPath)) {
//
//     findHeroInFile(fPath)
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
//       });
//
//   }
// });
//

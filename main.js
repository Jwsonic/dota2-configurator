import {findHeroInFile} from './condump.js';
import chokidar from 'chokidar';
import path from 'path';
import fs from 'fs';

const dotaPath = path.resolve('/', 'Program Files (x86)', 'Steam', 'steamapps', 'common', 'dota 2 beta', 'game', 'dota');
const reCondumpFile = /condump\d\d\d\.txt$/;

fs.watch(dotaPath, (event, fPath) => {
  if (event === 'rename' && reCondumpFile.test(fPath)) {
    console.log(`Processing: ${fPath}`);
    findHeroInFile(path.join(dotaPath, fPath))
      .then(heroName => console.log(`You picked: ${heroName}!`))
      .catch(err => console.error(err));
  }
});

console.log('Now watching for heroes!');

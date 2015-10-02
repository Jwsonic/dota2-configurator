import {findHeroInFile} from './condump.js';
import chokidar from 'chokidar';

let watcher = chokidar.watch();

watcher.on('add', path => {
  findHeroInFile(path)
    .then(heroName => console.log(`You picked: ${heroName}!`))
    .catch(err => console.error(err));
});

console.log('Now watching for heroes!');

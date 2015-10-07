import {exec} from 'child_process';
import EventEmitter from 'events';
import {Promise} from 'rsvp';

const TIMEOUT_CHECK = 500;
let dotaRunning = false;

let DotaWatcher = new EventEmitter();

function getProcNames() {
  return new Promise((resolve, reject) => {
    if (process.platform === 'win32') {
      exec('tasklist', {
        encoding: 'utf8'
      }, (err, stdout, stderr) => {
        if (stdout) {
          resolve(stdout.split(/\r?\n/));
        } else {
          reject(err);
        }
      });
    }
  });
}

function watchDota() {
  getProcNames()
    .then(procNames => {
      let dotaProcs = procNames.filter(name => name.startsWith('dota2'));
      let newDotaRunning = dotaProcs.length > 0;

      if (newDotaRunning !== dotaRunning) {
        if (newDotaRunning) {
          DotaWatcher.emit('start');
        } else {
          DotaWatcher.emit('stop');
        }

        dotaRunning = newDotaRunning;
      }

      setTimeout(watchDota, TIMEOUT_CHECK);
    });
}

watchDota();

export default DotaWatcher;

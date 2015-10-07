import {execSync} from 'child_process';
import EventEmitter from 'events';

const TIMEOUT_CHECK = 500;
let dotaRunning = false;

let dotaWatcher = new EventEmitter();

function checkIfDotaIsRunning() {
  let dotaProcs = getProcNames().filter(name => name.startsWith('dota2'));
  let newDotaRunning = dotaProcs.length > 0;

  if (newDotaRunning !== dotaRunning) {
    if(newDotaRunning) {
      dotaWatcher.emit('start');
    } else {
      dotaWatcher.emit('stop');
    }

    dotaRunning = newDotaRunning;
  }

  setTimeout(checkIfDotaIsRunning, TIMEOUT_CHECK);
}

checkIfDotaIsRunning();

function getProcNames() {

  if(process.platform === 'win32') {
    let procData = execSync('tasklist', {encoding: 'utf8'});

    if(procData) {
      return procData.split(/\r?\n/);
    }
  }

  return [];
}


export default dotaWatcher;

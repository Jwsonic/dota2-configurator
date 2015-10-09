// import {execSync} from 'child_process';
import EventEmitter from 'events';

// const TIMEOUT_CHECK = 500;

// function checkIfDotaIsRunning() {
//   let dotaProcs = getProcNames().filter(name => name.startsWith('dota2'));
//   let newDotaRunning = dotaProcs.length > 0;
//
//   if (newDotaRunning !== dotaRunning) {
//     if(newDotaRunning) {
//       dotaWatcher.emit('start');
//     } else {
//       dotaWatcher.emit('stop');
//     }
//
//     dotaRunning = newDotaRunning;
//   }
//
//   setTimeout(checkIfDotaIsRunning, TIMEOUT_CHECK);
// }

// function getProcNames() {
//   if(process.platform === 'win32') {
//     let procData = execSync('tasklist', {encoding: 'utf8'});
//
//     if(procData) {
//       return procData.split(/\r?\n/);
//     }
//   }
//
//   return [];
// }

export default class DotaWatcher extends EventEmitter {
  constructor () {
    // let dotaRunning = false;
    //
    // function checkIfDotaIsRunning(watcher) {
    //   let dotaProcs = getProcNames().filter(name => name.startsWith('dota2'));
    //   let newDotaRunning = dotaProcs.length > 0;
    //
    //   if (newDotaRunning !== dotaRunning) {
    //     if(newDotaRunning) {
    //       watcher.emit('start');
    //     } else {
    //       watcher.emit('stop');
    //     }
    //
    //     dotaRunning = newDotaRunning;
    //   }
    //
    //   setTimeout(checkIfDotaIsRunning, TIMEOUT_CHECK);
    // }
    //
    // checkIfDotaIsRunning(this);
  }
}

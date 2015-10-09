import {exec} from 'child_process';
import EventEmitter from 'events';
import {Promise} from 'rsvp';
import {consolePath} from './vars.js';
import fs from 'fs';
import {stat, readFile} from '../fs.js';

const TIMEOUT_CHECK = 500;
const gameInit = `C:Gamerules: entering state 'DOTA_GAMERULES_STATE_INIT'`;
const gameEnd = 'Game: "Dota 2"\r\nMap: "<empty>"';
const rePlayerTeam = /Game event "player_team", Tick \d+:\r\n- "userid" = "(\d+)"/;

let dotaRunning = null;
let lastHero = null;
let lastGameNum = null;

let DotaWatcher = new EventEmitter();

function isDotaRunning() {
  return new Promise((resolve, reject) => {
    if (process.platform === 'win32') {
      exec('tasklist', {
        encoding: 'utf8'
      }, (err, stdout, stderr) => {
        if (stdout) {
          let dotaProcs = stdout.split(/\r?\n/).filter(name => name.startsWith('dota2'));
          resolve(dotaProcs.length > 0);
        } else {
          reject(err);
        }
      });
    }
  });
}

/**
  Takes console dump file data and processes it for hero pick information
  @param {string} consoleData - String data read from a condump file
  @return (string) - A string that is the hero name if it's found or null otherwise
*/
export function findHero(consoleData) {
  //If the condump contains multiple games, make sure we get the most recent one
  let parts = consoleData.split(gameInit);
  let gameNum = parts.length - 1;
  let gameData = parts[gameNum];

  //The last game in the console is over
  if (gameData.indexOf(gameEnd) > -1) {
    //TODO: might not need this
  }

  //Look for the userId
  let userIds = rePlayerTeam.exec(gameData);

  if (userIds) {
    //player_team events for players connecting before you don't seem to show up, therefore the first player id match is your id
    let userId = userIds[1];

    //Build a regex specifically for our userId
    let reHeroPick = new RegExp(`Game event "dota_player_pick_hero", Tick \\d+:\r\n- "player" = "${userId}"\r\n- "heroindex" = "\\d+"\r\n- "hero" = "npc_dota_hero_([a-z_]+)"`);

    //Look for the hero picks
    let heroPick = reHeroPick.exec(gameData);

    if (heroPick) {
      return {hero: heroPick[1], gameNum};
    }

    return null;
  }
}

function watchDota() {
  isDotaRunning()
    .then(newDotaRunning => {
      if (newDotaRunning !== dotaRunning) {
        if (newDotaRunning) {
          DotaWatcher.emit('start');
        } else {
          DotaWatcher.emit('stop');
        }

        dotaRunning = newDotaRunning;
      }

      return readFile(consolePath);
    })
    .then(data => {
      if (data && data.length > 0) {
        let heroData = findHero(data);

        if (heroData) {
          let {hero, gameNum} = heroData;

          if(gameNum !== lastGameNum) {
            DotaWatcher.emit('heroPick', hero);

            lastGameNum = gameNum;
          }
        }
      }
    })
    // .catch(err => console.error(err))
    .finally(() => setTimeout(watchDota, TIMEOUT_CHECK));
}

watchDota();

export default DotaWatcher;

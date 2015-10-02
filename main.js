import fs from 'fs';
import path from 'path';
import os from 'os';
import {Promise} from 'es6-promise';

const gameInit = 'C:Gamerules: entering state \'DOTA_GAMERULES_STATE_INIT\'';
const rePlayerTeam = /Game event "player_team", Tick \d+:\r\n- "userid" = "(\d+)"/;

/**
  Takes a console dump file and processes it for hero pick information
  @param {string} fName - The console dump file to open
  @return (Promise) - A promise that will resolve the name of the hero that was picked
*/
function processConDump(fName) {
  return new Promise((resolve, reject) => {
    let data = fs.readFileSync(fName, 'utf8');

    //If the condump contains multiple games, make sure we get the most recent one
    let parts = data.split(gameInit);
    let gameData = parts[parts.length - 1];

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
        resolve(heroPick[1]);
        return;
      }
    }

    reject('No hero selection found!');
  });
}

// for (let i = 0; i < 4; i++) {
//   processConDump(path.join('sample-condumps', `condump00${i}.txt`))
//     .then(hero => console.log(`You picked ${hero}!`))
//     .catch(reason => console.log(reason));
// }

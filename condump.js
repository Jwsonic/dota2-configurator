import fs from 'fs';
import path from 'path';
import os from 'os';
import {Promise} from 'es6-promise';

const gameInit = 'C:Gamerules: entering state \'DOTA_GAMERULES_STATE_INIT\'';
const rePlayerTeam = /Game event "player_team", Tick \d+:\r\n- "userid" = "(\d+)"/;

export default class Condump {

  /**
    Takes a console dump file name, reads in the data, and processes it for hero pick information
    @param {string} fName - The console dump file to open
    @return (Promise) - A promise that will resolve the name of the hero that was picked
  */
  findHeroInFile(fName) {
    return new Promise((resolve, reject) => {
      try {
        let data = fs.readFileSync(fName, 'utf8');
        let heroName = findHero(data);

        if (heroName) {
          resolve(heroName);
        } else {
          reject('No hero selection found!');
        }
      } catch (e) {
        reject(e);
      }
    });
  }

  /**
    Takes console dump file data and processes it for hero pick information
    @param {string} conDumpData - String data read from a condump file
    @return (string) - A string that is the hero name if it's found or null otherwise
  */
  findHero(conDumpData) {
    //If the condump contains multiple games, make sure we get the most recent one
    let parts = conDumpData.split(gameInit);
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
        return heroPick[1];
      }

      return null;
    }
  }
}

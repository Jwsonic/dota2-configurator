let Console = {

  /**
    Takes console dump file data and processes it for hero pick information
    @param {string} consoleData - String data read from a condump file
    @return (string) - A string that is the hero name if it's found or null otherwise
  */
  parseGames(consoleData) {
    //Split the console file into game data chunks
    return consoleData.split(gameInit).map((gameData, gameNum) => {
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
      }

      return {hero: 'None', gameNum};
    });
  }
};

export default Console;

import {consolePath, autoexecPath} from './vars.js';
import pFs from '../fs.js';

const reConfigSection = /\/{3}dota2-configurator start[A-z0-9_\n\r\-\s\/!]+\/{3}dota2-configurator end/;

const dotaConfig =
`///dota2-configurator start
///DO NOT CHANGE THESE SETTINGS!
log_flags console -consoleonly
cl_net_showevents 1
hideconsole
///dota2-configurator end`;

let DotaConfig = {
  setUpAutoExec() {
    return pFs.fileExists(autoexecPath)
      .then(exists => exists ? pFs.readFile(autoexecPath) : '')
      .then(configData => pFs.writeFile(autoexecPath, `${configData.replace(reConfigSection, '')}${dotaConfig}`));
  }
};

export default DotaConfig;

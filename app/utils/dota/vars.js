import path from 'path';

//In the future this will be cross platform. For now it's windows only.

export const dotaPath = path.resolve('/', 'Program Files (x86)', 'Steam', 'steamapps', 'common', 'dota 2 beta', 'game', 'dota');
export const consolePath = path.resolve(dotaPath, 'console.log');
export let autoexecPath = path.resolve(dotaPath, 'cfg', 'autoexec.cfg');

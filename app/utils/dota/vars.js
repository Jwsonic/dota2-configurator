import path from 'path';

//In the future this will be cross platform. For now it's windows only.

export const dotaPath = path.join('/', 'Program Files (x86)', 'Steam', 'steamapps', 'common', 'dota 2 beta', 'game', 'dota');
export const consoleFilePath = path.join(dotaPath, 'console.log');

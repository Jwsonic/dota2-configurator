// Here is the starting point for code of your own application.
// All stuff below is just to show you how it works. You can delete all of it.

// Modules which you authored in this project are intended to be
// imported through new ES6 syntax.
import os from 'os';
// import { greet } from './hello_world/hello_world.js';

// Node.js modules and those from npm
// are required the same way as always.

// Holy crap! This is browser window with HTML and stuff, but I can read
// here files like it is node.js! Welcome to Electron world :)

// window.env contains data from config/env_XXX.json file.
var envName = `${window.env.name} stuff`;

document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('greet').innerHTML = 'nah';
    document.getElementById('platform-info').innerHTML = os.platform();
    document.getElementById('env-name').innerHTML = envName;
});

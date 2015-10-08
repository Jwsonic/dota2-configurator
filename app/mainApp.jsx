import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import debug from './utils/debug';
import './app.css';
import DotaWatcher from './utils/dota/dotaWatcher';
import notifier from 'node-notifier';
import path from 'path';
import del from 'del';
import {dotaPath, consoleFilePath} from './utils/dota/vars.js';

var dd = debug('mainApp');

DotaWatcher.on('start', () => notifier.notify({
  'title': 'Dota is Running!',
  'message': 'Watching for hero picks!'
}));

DotaWatcher.on('heroPick', hero => notifier.notify({
  'title': `You picked ${hero}!`,
  'message': 'Loading config files!'
}));

DotaWatcher.on('stop', () => {
  console.log('Dota stopped running!');
  del([consoleFilePath], {force: true}).then(paths => console.log('Finished deleting console.log'));
});

ReactDOM.render(<AppContainer />, document.getElementById('react-root'));

import React from 'react';
import ReactDOM from 'react-dom';
import AppContainer from './containers/AppContainer';
import debug from './utils/debug';
import './app.css';
import DotaWatcher from './utils/watcher';
import notifier from 'node-notifier';

var dd = debug('mainApp');

DotaWatcher.on('start', () => notifier.notify({
  'title': 'Dota is Running!',
  'message': 'Watching for heroes!'
}));

DotaWatcher.on('stop', () => console.log('Dota stopped running!'));

ReactDOM.render(<AppContainer />, document.getElementById('react-root'));

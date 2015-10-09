import React from 'react';
import {render} from 'react-dom';
import notifier from 'node-notifier';
import del from 'del';
import AppContainer from './containers/AppContainer.jsx';
import DotaWatcher from './utils/dota/dotaWatcher.js';
import DotaConfig from './utils/dota/config.js';

DotaConfig.setUpAutoExec().then(() => console.log('Autoexec is set up!'));

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
  del([consolePath], {force: true}).then(paths => console.log('Finished deleting console.log'));
});

render(<AppContainer />, document.getElementById('react-root'));

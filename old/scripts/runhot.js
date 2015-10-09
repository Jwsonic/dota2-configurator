var exec = require('child_process').exec;

exec('electron .', {
  env: {
    'HOT': 1,
    'NODE_ENV': 'development'
  }
});

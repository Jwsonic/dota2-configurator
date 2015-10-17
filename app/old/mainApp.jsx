import React from 'react';
import ReactDom from 'react-dom';
import {Promise} from 'rsvp';
import { createStore } from 'redux';
import notifier from 'node-notifier';
import { connect } from 'react-redux';
import del from 'del';

notifier.notify({
  'title': 'My notification',
  'message': 'Hello, there!'
});

ReactDom.render(<div>Hello</div>, document.getElementById('react-root'));

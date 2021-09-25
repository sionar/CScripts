import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import configureStore from '../../store/store'
import Root from './root';

import './../../../static/css/main.css';
import './../../../static/css/header.css';
import './../../../static/css/user_profile.css';
import './../../../static/css/modal_upload_json.css';
import './../../../static/css/modal_login.css';
import './../../../static/css/modal_register.css';
import './../../../static/css/modal_recover.css';
import './../../../static/css/modal_delete_script.css';
import './../../../static/css/script_index.css';
import './../../../static/css/script_detail.css';
import './../../../static/css/script_navbar.css';
import './../../../static/css/script_list.css';
import './../../../static/css/script_night.css';
import './../../../static/css/script_create.css';
import './../../../static/css/script_create_char_select.css';

document.addEventListener('DOMContentLoaded', () => {
  const appDiv = document.getElementById('app');
  let store;
  let storage = window.localStorage;
  if (storage.getItem('token')) {
    const preloadedState = { 
      entities: {},
      auth: {
        username: storage.getItem('username'),
        token: storage.getItem('token'),
        is_guest: storage.getItem('is_guest') === 'true'
      },
      errors: {},
      ui: {}
    };
    store = configureStore(preloadedState);
    delete window.currentUser;
  }
  else {
    const initialStage = { 
      entities: {},
      auth: {
        username: null,
        token: null,
        is_guest: null
      },
      errors: {},
      ui: {}
    };
    store = configureStore();
  };
  window.getState = store.getState;
  ReactDOM.render( <Root store={store} />, appDiv );
});

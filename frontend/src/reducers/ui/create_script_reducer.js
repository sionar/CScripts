import { 
  SET_UI_CREATE_SCRIPT_INITIAL,
  SET_UI_CREATE_SCRIPT_TITLE,
  SET_UI_CREATE_SCRIPT_DESCRIPTION,
  SET_UI_CREATE_SCRIPT_AUTHOR,
  SET_UI_CREATE_SCRIPT_OWNER,
  SET_UI_CREATE_SCRIPT_TYPE,
  SET_UI_CREATE_SCRIPT_VISIBLE,
  SET_SCRIPT,
  CLEAR_CREATE_SCRIPT
  } from '../../actions/script_create_actions';
import { RECEIVE_SCRIPT } from '../../actions/script_actions';
import { RECEIVE_AUTH, ADD_AUTH_USER, LOGOUT_AUTH } from '../../actions/auth_actions';

export default (
  state = {
    title: '',
    description: '',
    author: '',
    script_type: 'Normal',
    owner: null,
    visible: true
  }, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  let script, owner;
  switch (action.type) {
    case SET_UI_CREATE_SCRIPT_INITIAL:
      nextState.title = '';
      nextState.description = '',
      nextState.author = '',
      nextState.script_type = 'Normal',
      nextState.visible = true
      return nextState;
    case SET_UI_CREATE_SCRIPT_TITLE:
      nextState.title = action.title;
      return nextState;
    case SET_UI_CREATE_SCRIPT_DESCRIPTION:
      nextState.description = action.description;
      return nextState;
    case SET_UI_CREATE_SCRIPT_AUTHOR:
      nextState.author = action.author;
      return nextState;
    case SET_UI_CREATE_SCRIPT_OWNER:
      nextState.owner = action.owner;
      return nextState;
    case SET_UI_CREATE_SCRIPT_TYPE:
      nextState.script_type = action.scriptType;
      return nextState;
    case SET_UI_CREATE_SCRIPT_VISIBLE:
      nextState.visible = action.visible;
      return nextState;
    case RECEIVE_AUTH:
      nextState.owner = action.user;
      return nextState;
    case ADD_AUTH_USER:
      nextState.owner = action.user;
      return nextState;
    case LOGOUT_AUTH:
      nextState.owner = null;
      return nextState;
    case RECEIVE_SCRIPT:
      script = action.data;
      owner = script.owner == null ? null : script.owner.username;
      nextState = {
        title: script.title,
        description: script.description,
        author: script.author,
        script_type: script.script_type,
        owner: owner,
        visible: script.visible
      };
      return nextState;
    case SET_SCRIPT:
      script = action.script;
      nextState = {
        title: script.title,
        description: script.description,
        author: script.author,
        script_type: script.script_type,
        owner: script.owner,
        visible: script.visible
      };
      return nextState;
    case CLEAR_CREATE_SCRIPT:
      nextState = {
        title: '',
        description: '',
        author: '',
        script_type: 'Normal',
        owner: null,
        visible: true 
      };
      return nextState;
    default:
      return state;
  };
};
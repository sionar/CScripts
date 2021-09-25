import { 
  SET_UI_LOADING_INDEX,  
  SET_UI_LOADING_DETAIL,  
  SET_UI_LOADING_CREATE,
  SET_UI_LOADING_POST_SCRIPT,
  SET_UI_LOADING_DELETE_SCRIPT,
  SET_UI_LOADING_LOGIN,
  SET_UI_LOADING_REGISTER,
  SET_UI_LOADING_RECOVER_SEND_EMAIL,
  SET_UI_LOADING_RECOVER_CHANGE_PASSWORD,
  SET_UI_LOADING_USER_SCRIPTS,
  SET_UI_LOADING_EXPORT_JSON
  } from '../../actions/ui_actions';

export default (
  state = {
    detail: true, 
    index: true, 
    create: true, 
    postScript: false, 
    deleteScript: false,
    login: false, 
    register: false,
    sendEmail: false,
    changePassword: false,
    userScripts: false,
    exportJson: false
  }, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case SET_UI_LOADING_INDEX:
      nextState.index = action.loading;
      return nextState;
    case SET_UI_LOADING_DETAIL:
      nextState.detail = action.loading;
      return nextState;
    case SET_UI_LOADING_CREATE:
      nextState.create = action.loading;
      return nextState;
    case SET_UI_LOADING_POST_SCRIPT:
      nextState.postScript = action.loading;
      return nextState;
    case SET_UI_LOADING_DELETE_SCRIPT:
      nextState.deleteScript = action.loading;
      return nextState;
    case SET_UI_LOADING_LOGIN:
      nextState.login = action.loading;
      return nextState;
    case SET_UI_LOADING_REGISTER:
      nextState.register = action.loading;
      return nextState; 
    case SET_UI_LOADING_RECOVER_SEND_EMAIL:
      nextState.sendEmail = action.loading;
      return nextState;
    case SET_UI_LOADING_RECOVER_CHANGE_PASSWORD:
      nextState.changePassword = action.loading;
      return nextState;
    case SET_UI_LOADING_USER_SCRIPTS:
      nextState.userScripts = action.loading;
      return nextState;
    case SET_UI_LOADING_EXPORT_JSON:
      nextState.exportJson = action.loading;
      return nextState;
    default:
      return state;
  };
};
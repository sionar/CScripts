import { combineReducers } from 'redux';
import createScriptReducer from './create_script_reducer';
import createVersionReducer from './create_version_reducer';
import createCharSelectTabReducer from './create_char_select_tab_reducer';
import createStatusReducer from './create_status_reducer';
import createNightOrderReducer from './create_night_order_reducer';
import deleteStatusReducer from './delete_status_reducer';

const createReducer = combineReducers({
  script: createScriptReducer,
  version: createVersionReducer,
  charSelectTab: createCharSelectTabReducer,
  createStatus: createStatusReducer,
  nightOrder: createNightOrderReducer,
  deleteStatus: deleteStatusReducer
});

export default createReducer;
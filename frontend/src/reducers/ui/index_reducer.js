import { RECEIVE_SCRIPTS } from '../../actions/script_actions';
import { SET_UI_INDEX_SCRIPTS, SET_UI_INDEX_SEARCH_TITLE, SET_UI_INDEX_SEARCH_TYPE } from '../../actions/ui_actions';

export default (state = {scripts: [], title:'', scriptType:'Any'}, action) => {
  Object.freeze(state);
  let nextState = Object.assign({}, state);
  switch (action.type) {
    case RECEIVE_SCRIPTS:
      nextState.scripts = action.data.map(script => script.id);
      return nextState;
    case SET_UI_INDEX_SCRIPTS:
      nextState.scripts = action.scripts.map(script => script);
      return nextState;
    case SET_UI_INDEX_SEARCH_TITLE:
      nextState.title = action.title;
      return nextState;
    case SET_UI_INDEX_SEARCH_TYPE:
      nextState.scriptType = action.scriptType;
      return nextState;
    default:
      return state;
  };
};